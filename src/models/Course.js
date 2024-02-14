const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Course = sequelize.define('modelName', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

module.exports = Course;