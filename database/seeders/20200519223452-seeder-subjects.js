'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Subjects', [
      { name: "Artes" },
      { name: "Biologia" },
      { name: "Ciência" },
      { name: "Educação Física" },
      { name: "Filosofia" },
      { name: "Física" },
      { name: "Geografia" },
      { name: "Geometria" },
      { name: "História" },
      { name: "Informática" },
      { name: "Língua Espanhola" },
      { name: "Língua Francesa" },
      { name: "Língua Inglesa" },
      { name: "Língua Portuguesa" },
      { name: "Literatura" },
      { name: "Matemática" },
      { name: "Música" },
      { name: "Química" },
      { name: "Redação" },
      { name: "Sociologia" },
      { name: "Teatro" }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subjects', null, {});
  }
};