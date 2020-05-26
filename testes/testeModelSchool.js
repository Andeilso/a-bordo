const { sequelize, School } = require('../models');

School.findAll({ where: { state: 'RJ', municipality: 'Rio de Janeiro' } }).then(
    data => {
        console.log(data.map( s => s.toJSON()));
        sequelize.close();
    }
)