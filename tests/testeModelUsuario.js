const { sequelize, User } = require('../models');

User.findAll().then(
    data => {
        console.log(data.map(u => u.toJSON()));
        sequelize.close();
    }
);