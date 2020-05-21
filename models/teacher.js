'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher',
    {
      userId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      timestamps: false,
    });
  Teacher.associate = function (models) {
    // associations can be defined here
  };
  return Teacher;
};