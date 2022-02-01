const { Sequelize, DataTypes, ValidationError } = require('sequelize');
function createPersonajeModel(connection) {
    const User = connection.define('Personaje', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        edad: {
            type: DataTypes.INTEGER,
        },
        peso: {
            type: DataTypes.INTEGER,
        },
        historia: {
            type: DataTypes.STRING
        }
    },{
        timestamps: false
    });
    return User;
}

module.exports = {
    createPersonajeModel
}