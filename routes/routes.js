const express = require('express');
const router = express.Router();
const teacherController = require('../backend/controllers/teacherController')
const studentController = require('../backend/controllers/studentController')

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/teacher', (req, res) => {
  res.render('teacher-login');
});



router.get('/edit/student/:id', teacherController.getStudentById);

router.get('/teacher/dashboard/:id',teacherController.getStudentById)

router.get('/student/result',(req,res)=>{
  res.render('student-result');
})


router.get('/add/student', teacherController.showAddStudentForm);

router.get('/api/teacher/students', teacherController.dashboard);
router.post('/add/student', teacherController.createStudent);
//router.delete('delete/student/:id',teacherController.deleteStudent);
router.post('/delete/student/:id', teacherController.deleteStudent);
router.post('/update/student/:id', teacherController.updateStudent);
router.post('/teacher/login', teacherController.login);
router.get('/logout', teacherController.logout);
router.delete('/delete/student/:id', teacherController.deleteStudent);
router.get('/delete/student/:id', teacherController.deleteStudent);


router.get('/student', studentController.showLoginForm);
router.post('/login', studentController.login);
router.get('/result/:id', studentController.showStudentResult);
router.get('/student-logout', studentController.logout);

module.exports = router;



