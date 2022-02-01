const { Sequelize, DataTypes } = require('sequelize');

function createPeliculapersonajeModel(connection, Pelicula, Personaje) {
    const Peliculapersonaje = connection.define('Peliculapersonaje', {
        PeliculaId: {
            type: DataTypes.INTEGER,
            references: {
                model: Pelicula,
                // This is the column name of the referenced model
                key: 'id'
            }
        },
        PersonajeId: {
            type: DataTypes.INTEGER,
            references: {
                // This is a reference to another model
                model: Personaje,
                // This is the column name of the referenced model
                key: 'id'
            }
        },
    }, {
        // Other model options go here
        modelName: 'peliculapersonaje',
        tableName: 'peliculapersonaje'
    });
    return Peliculapersonaje;
}

module.exports = {
    createPeliculapersonajeModel
}