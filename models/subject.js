'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject',
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true }
    },
    {
      timestamps: false,
    });
  Subject.associate = function (models) {
    // associations can be defined here
  };
  return Subject;
};