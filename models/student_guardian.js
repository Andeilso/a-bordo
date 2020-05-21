'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student_Guardian = sequelize.define('Student_Guardian',
    {
      studentId: { type: DataTypes.INTEGER, allowNull: false },
      guardianId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      timestamps: false,
    });
  Student_Guardian.associate = function (models) {
    // associations can be defined here
  };
  return Student_Guardian;
};