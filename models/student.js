'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student',
    {
      name: { type: DataTypes.STRING, allowNull: false/*, unique: true */ }
    },
    {
      timestamps: false,
    });
  Student.associate = function (models) {
    // associations can be defined here
  };
  return Student;
};