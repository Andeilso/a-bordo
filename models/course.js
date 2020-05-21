'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course',
    {
      teacherId: { type: DataTypes.INTEGER, allowNull: false },
      subjectId: { type: DataTypes.INTEGER, allowNull: false },
      classId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      timestamps: false,
    });
  Course.associate = function (models) {
    // associations can be defined here
  };
  return Course;
};