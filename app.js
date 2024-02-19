const express = require('express');
const Teacher = require('./models/teacher')
const bodyParser = require('body-parser');
const Student = require('./models/student')
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const sequelize = require('./backend/db');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap')));
app.set('view engine', 'ejs');
app.use('/backend', express.static(__dirname + '/backend'))

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routes = require('./routes/routes');
app.use('/', routes);

(async ()=>{
  try{
  //await sequelize.authenticate();
  //console.log('Tables synchronized running');
  await Teacher.sync()
  await Student.sync()
  //console.log('Tables synchronized successfully');
  const stuCount = await Student.count()
  const TeacherCount = await Teacher.count()
  console.log(`Student count: ${stuCount}`);
  console.log(`Teacher count: ${TeacherCount}`);

 

  if(stuCount == 0){
    console.log('Running student seeder');
    const studentSeeder = require('./seeders/20230826062917-student-seeding');
    await studentSeeder.up(sequelize.getQueryInterface(), sequelize, Student);
  }
  if(TeacherCount == 0){
    console.log('Running teacher seeder');
    const teacherSeeder = require('./seeders/20230826062933-teacher-seeding');
    await teacherSeeder.up(sequelize.getQueryInterface(), sequelize, Teacher);
  }
  console.log('Seeders executed or skipped successfully');
}

catch (error) {
  console.error('Error executing seeders or synchronizing:', error);
}
}
)()

// Teacher.sync({alter: true})
// Student.sync({alter: true})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
setTimeout(()=>console.log(`Application is running on port ${PORT}`), 1000);
setTimeout(()=>console.log(`Application is running on http://localhost:${PORT}/`), 1000);

