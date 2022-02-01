const { Sequelize, DataTypes, ValidationError } = require('sequelize');
function createPeliculaModel(connection) {
    const User = connection.define('Pelicula', {
        titulo: {
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
        fecha: {
            type: DataTypes.INTEGER,
        },
        calificacion: {
            type: DataTypes.INTEGER,
        }
    },{
        timestamps: false
    });
    return User;
}

module.exports = {
    createPeliculaModel
}