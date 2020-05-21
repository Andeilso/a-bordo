'use strict';
module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('School',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      passingGrade: { type: DataTypes.DECIMAL, allowNull: false },
      academicTerms: { type: DataTypes.INTEGER, allowNull: false },
      state: { type: DataTypes.STRING, allowNull: false },
      municipality: { type: DataTypes.STRING, allowNull: false }
    },
    {
      timestamps: false,
    });
  School.associate = function (models) {
    // associations can be defined here
  };
  return School;
};