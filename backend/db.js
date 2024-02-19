const { Sequelize }= require('sequelize')
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
});


connection.query(
  `CREATE DATABASE IF NOT EXISTS NodeAssignment`,
  function (err, results) {
    //console.log("Database creation running")
  }
);

connection.end();
//console.log("Sequlize config")

const sequelize = new Sequelize('NodeAssignment', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });
  //console.log("Sequlize config done")
  //console.log(sequelize)
  try{
    //console.log("Sequlize auth started")
    sequelize.authenticate();
    //console.log("Sequlize auth done")
    console.log("yes connected !!!")
  }
  catch(error){
    console.log("Something went wrong crying",error)
  }
  module.exports = sequelize;
