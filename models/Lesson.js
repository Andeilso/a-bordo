'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define('Lesson',
    {
      courseId: { type: DataTypes.INTEGER, allowNull: false },
      academicTerm: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.DATEONLY, allowNull: false },
      periods: { type: DataTypes.INTEGER, allowNull: false },
      observations: { type: DataTypes.TEXT }
    },
    {
      timestamps: false,
    });
  Lesson.associate = function (models) {
    // associations can be defined here
  };
  return Lesson;
};