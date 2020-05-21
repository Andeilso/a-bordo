'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance',
    {
      lessonId: { type: DataTypes.INTEGER, allowNull: false },
      studentId: { type: DataTypes.INTEGER, allowNull: false },
      mark: { type: DataTypes.STRING, allowNull: false },
      period: { type: DataTypes.STRING, allowNull: false }
    },
    {
      timestamps: false,
    });
  Attendance.associate = function (models) {
    // associations can be defined here
  };
  return Attendance;
};