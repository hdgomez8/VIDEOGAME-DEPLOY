// este archivo crea una instancia de un servidor Express, 
// configura middlewares para el manejo de datos y solicitudes HTTP, 
// define las rutas para la API y maneja los errores que puedan ocurrir 
// durante el procesamiento de las solicitudes.

//******************app.js******************
// Importa los módulos necesarios, como express, cookie-parser, 
// body-parser, morgan, y las rutas definidas en el archivo index.js.
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

// Requiere y ejecuta el archivo db.js,
require('./db.js');

// Crea una instancia de la aplicación Express y la asigna a la variable server.
const server = express();

// Define el nombre de la aplicación como 'API' mediante server.name.
server.name = 'API';

// Configura middlewares para el manejo de datos entrantes:

//  bodyParser.urlencoded y bodyParser.json para analizar 
//  los datos enviados en las solicitudes con un límite de 50 MB.
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

// cookieParser para analizar las cookies enviadas por el cliente.
server.use(cookieParser());

// morgan('dev') para registrar las solicitudes HTTP entrantes en la consola con un formato específico.
server.use(morgan('dev'));

// Establece cabeceras para permitir el acceso a la 
// API desde un dominio específico y configurar los métodos HTTP permitidos.
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://videogame-deploy-seven.vercel.app'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//Asigna las rutas definidas en el archivo index.js mediante server.use('/', routes).
server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
