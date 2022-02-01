const { Sequelize, DataTypes, ValidationError } = require('sequelize');
function createGeneroModel(connection) {
    const User = connection.define('Genero', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        timestamps: false
    });
    return User;
}

module.exports = {
    createGeneroModel
}