'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class',
    {
      schoolId: { type: DataTypes.INTEGER, allowNull: false },
      code: { type: DataTypes.STRING, allowNull: false },
      year: { type: DataTypes.STRING, allowNull: false },
      levelOfEducation: { type: DataTypes.STRING, allowNull: false },
      grade: { type: DataTypes.STRING, allowNull: false }
    },
    {
      timestamps: false,
    });
  Class.associate = function (models) {
    // associations can be defined here
  };
  return Class;
};