const Student = require('../../models/student')


let isStudentLoggedIn = false;


const showLoginForm = (req, res) => {
    res.render('student-login');
  };

  const login = async (req, res) => {
    const rollNumber = req.body.rollNumber;
    const dob = req.body.dob
  
    try {
      const student = await Student.findOne({ where: { rollNumber, dateOfBirth: dob } });
  
      if (!student) {
        return res.status(401).render('student-login', { errorMessage: 'Invalid credentials' });
      }
  
      isStudentLoggedIn = true; // Set the isStudentLoggedIn variable to true on successful login
  
      res.redirect(`/result/${student.id}`); // Redirect to student result page
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while logging in' });
    }
  };

  const showStudentResult = async (req, res) => {
    // Check if student is logged in
    if (!isStudentLoggedIn) {
      return res.redirect('/student'); // Redirect to student login if not logged in
    }
  
    const studentId = req.params.id;
  
    try {
      const student = await Student.findOne({ where: { id: studentId } });
      if (!student) {
        return res.status(404).send('Student not found');
      }
  
      res.render('student-result', { student });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching student result' });
    }
  };
  
  const logout = (req, res) => {
    isStudentLoggedIn = false; // Set isLoggedIn to false
    res.redirect('/student'); // Redirect to the teacher login page
  };
  module.exports = {showLoginForm, login, showStudentResult, logout}