const { DataTypes } = require('sequelize');
const sequelize = require('../backend/db')

const Teacher = sequelize.define('Teacher', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{tableName: 'teachers'});

module.exports = Teacher;
