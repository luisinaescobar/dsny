const Sequelize = require('sequelize');
//const { createProductModel } = require('./models/products');
//const { createPaymentModel } = require('./models/payments');
const { createUserModel } = require('./models/users');
const { createPeliculaModel } = require('./models/peliculas');
const { createPersonajeModel } = require('./models/personajes');
const { createGeneroModel } = require('./models/genero');
const { createPeliculapersonajeModel } = require('./models/peliculaspersonajes');
//const { createOrderModel } = require('./models/order');
//const { createStatusModel } = require('./models/status');
//const { createProductOrderModel } = require('./models/productorder');

const models = {};
let connectionS = '';
async function connect(host, port, username, password, database) {

  const connection = new Sequelize({
    host,
    port,
    username,
    password,
    database,
    dialect: 'mariadb'
  });

  models.User = createUserModel(connection);
  models.Pelicula = createPeliculaModel(connection);
  models.Personaje = createPersonajeModel(connection);
  models.Genero = createGeneroModel(connection);
  models.Peliculapersonaje = createPeliculapersonajeModel(connection);
  //associations
  /* models.Pelicula.hasMany(models.Personaje);
   models.Personaje.belongsTo(models.Pelicula);*/
  models.Personaje.belongsToMany(models.Pelicula, { through: models.Peliculapersonaje });

  //models.Pelicula.hasMany(models.Personaje);
  //models.Personaje.belongsTo(models.Pelicula)
  models.Pelicula.belongsToMany(models.Personaje, { through: models.Peliculapersonaje });

  models.Pelicula.hasMany(models.Genero)
  models.Genero.belongsTo(models.Pelicula)
  // models.Genero.hasMany(models.Pelicula);
  // models.Pelicula.belongsTo(models.Genero);
  // models.Genero.hasMany(models.Pelicula);


  //models.Pelicula.hasMany(models.Personaje);

  /*models.Product = createProductModel(connection);
  models.Payment = createPaymentModel(connection);
  models.Order = createOrderModel(connection);
  models.Status = createStatusModel(connection);
  models.Productorder = createProductOrderModel(connection, models.Product, models.Order);
  ///Associations
  models.User.hasMany(models.Order);
  models.Order.belongsTo(models.User);

  models.Payment.hasOne(models.Order);
  models.Order.belongsTo(models.Payment);

  models.Product.belongsToMany(models.Order, { through: models.Productorder });
  models.Order.belongsToMany(models.Product, { through: models.Productorder });

  models.Status.hasOne(models.Order);
  models.Order.belongsTo(models.Status);

  models.Status.sync();*/

  models.Personaje.sync();
  models.User.sync();
  models.Genero.sync();
  models.Pelicula.sync();
  /*models.Product.sync();
  models.Payment.sync();
  models.Order.sync();
  models.Productorder.sync();*/
  try {
    await connection.authenticate();
    await connection.sync();
    connectionS = connection;
    console.log('connection has been established successfully');
    return true;
  } catch (error) {
    console.error('unable to connect to the database: ', error);
    return false;
  }
}
function getConnection() {
  return connectionS;
}
function getModel(name) {
  console.log(models)
  if (models[name]) {
    return models[name];
  } else {
    // console.error('Model does not exist');
    return null
  }
}

module.exports = {
  connect, getModel, getConnection
};
