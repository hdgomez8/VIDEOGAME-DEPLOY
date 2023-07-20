// este archivo configura y exporta la conexión de la base de datos con Sequelize, 
// define los modelos de la base de datos y 
// establece las relaciones entre ellos, lo que permite interactuar con 
// la base de datos de manera sencilla a través de objetos de modelo en otros módulos del proyecto.

//******************db.js******************
// Requiere los módulos necesarios, como dotenv para cargar las 
// variables de entorno desde un archivo .env, Sequelize para crear la instancia de la base de datos, 
// fs para trabajar con el sistema de archivos y path para manejar rutas de archivos.
require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Variable de entorno
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT,DB_NAME,
} = process.env;

// Crea una instancia de Sequelize utilizando los datos de conexión proporcionados.
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// lo que establece una relación de muchos a muchos 
// entre ellos a través de una tabla intermedia llamada VideogameGenre.
Videogame.belongsToMany(Genre, { through: 'VideogameGenre' });
Genre.belongsToMany(Videogame, { through: 'VideogameGenre' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
