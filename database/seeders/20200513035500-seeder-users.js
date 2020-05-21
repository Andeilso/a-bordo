'use strict';
const bcrypt = require("bcrypt");
const salt = 10;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        forename: 'Paula',
        surname: 'de Pinho',
        email: 'paula@email.com',
        phone: '(11) 99999 - 9999',
        password: bcrypt.hashSync('1234', salt),
        picture: '/img/pauladepinho.jpg'
      },
      {
        forename: 'Patricia',
        surname: 'Felix',
        email: 'patricia@email.com',
        phone: '(11) 99999 - 9999',
        password: bcrypt.hashSync('1234', salt),
        picture: '/img/patriciafelix.jpg'
      },
      {
        forename: 'Andeilso',
        surname: 'Alves',
        email: 'andeilso@email.com',
        phone: '(11) 99999 - 9999',
        password: bcrypt.hashSync('1234', salt),
        picture: '/img/andeilsoalves.jpg'
      },
      {
        forename: 'João',
        surname: 'de Oliveira da Silva Santos',
        email: 'joao@email.com',
        phone: '(11) 99999 - 9999',
        password: bcrypt.hashSync('1234', salt),
        picture: '/img/joaodeoliveira.jpg'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
