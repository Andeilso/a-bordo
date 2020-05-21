'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Subjects', [
      { name: "artes" },
      { name: "biologia" },
      { name: "ciência" },
      { name: "educação física" },
      { name: "filosofia" },
      { name: "física" },
      { name: "geografia" },
      { name: "geometria" },
      { name: "história" },
      { name: "informática" },
      { name: "língua espanhola" },
      { name: "língua francesa" },
      { name: "língua inglesa" },
      { name: "língua portuguesa" },
      { name: "literatura" },
      { name: "matemática" },
      { name: "música" },
      { name: "química" },
      { name: "redação" },
      { name: "sociologia" },
      { name: "teatro" }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subjects', null, {});
  }
};