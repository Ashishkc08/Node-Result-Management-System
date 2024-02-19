const Student = require('../../models/student'); 
const Teacher = require('../../models/teacher'); 

let isLoggedIn = false;


const login = async (req, res) => {
  const username = req.body.username;
    const password = req.body.password;

  try {
    const teacher = await Teacher.findOne({ where: { username } });

    if (!teacher) {
      return res.status(401).render('teacher-login', { errorMessage: 'Invalid credentials' });
    }
    if (teacher.password !== password) {
      return res.status(401).render('teacher-login', { errorMessage: 'Invalid credentials' });
    }

    isLoggedIn = true;

    res.redirect('/api/teacher/students');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
};

const dashboard = async (req, res) => {
  if (!isLoggedIn) {
    return res.redirect('/teacher');
  }
  const data = await Student.findAll({})
  res.render('teacher-dashboard',{ students: data });
};


// const getAllStudents = async (req, res) => {
//   try {
//     const data = await Student.findAll({})
//     //res.status(200).json({data:data})
//     res.render('teacher-dashboard', { students: data });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching students.' });
//   }
// }

const getStudentById = async (req, res) => {
  if (!isLoggedIn) {
    return res.redirect('/teacher');
  }
  try {
    const data = await Student.findOne({
      where: {
        id: req.params.id
      }
    })
    //res.status(200).json({data:data})
    console.log(data);
    //res.render('teacher-dashboard', { students: data });
    if (!data) {
      return res.status(404).send('Student not found');
    }
    res.render('edit-student', { student: data });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching students.' });
  }
}




const createStudent = async (req, res) => {
  
  try {
    const name = req.body.name;
    const dateOfBirth = req.body.dateOfBirth;
    const rollNumber = req.body.rollNumber;
    const score = req.body.score;
    if (!name || !dateOfBirth || !rollNumber || !score) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const existingStudent = await Student.findOne({ where: { rollNumber } });
    if (existingStudent) {
      return res.render('add-student', { errorRollNumber: 'A student with the same roll number already exists.' });
    }

    const newStudent = await Student.create({
      name,
      dateOfBirth,
      rollNumber,
      score,
    });
    res.render('add-student', { message: 'Student added successfully.', student: newStudent, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the student.' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const deletedRows = await Student.destroy({
      where: {
        id: req.params.id
      }
    });
    if (deletedRows === 0) {
      return res.status(404).send('Student not found');
    }
    res.redirect('/api/teacher/students');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the student.' });
  }
};

const showAddStudentForm = (req, res) => {
  if (!isLoggedIn) {
    return res.redirect('/teacher');
  }
  res.render('add-student', { success: false });
};

const updateStudent = async (req, res) => {
  if (!isLoggedIn) {
    return res.redirect('/teacher/login');
  }
  try {
    const studentId = req.params.id;
    const updatedStudent = await Student.update(
      {
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        rollNumber: req.body.rollNumber,
        score: req.body.score
      },
      { where: { id: studentId } }
    );
    if (updatedStudent[0] === 0) {
      return res.status(404).send('Student not found');
    }
    res.redirect('/api/teacher/students');
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the student.' });
  }
};

const logout = (req, res) => {
  isLoggedIn = false;
  res.redirect('/teacher');
};

module.exports = {  getStudentById, createStudent, deleteStudent, updateStudent, login, dashboard, logout, showAddStudentForm};