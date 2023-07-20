//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// este código inicializa el servidor y sincroniza la base de datos con los modelos definidos, 
// asegurándose de que esté lista para manejar las peticiones entrantes. Además, 
// llena la base de datos con los géneros obtenidos, lo que facilita el funcionamiento de otras partes del proyecto.

//******************index.js******************
//IMPORTAMOS LOS MODULOS Y CONFIGURACIONES NECESARIAS INCLUYENDO EL MODELO
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getAllGenres } = require('./src/controllers/genresControllers');
const { Genre } = require('./src/db');
require ('dotenv').config();

//DEFINIMOS LA VARIABLE PORT PARA ESPECIFICAR EL NUMERO DE PUERTO DEL SERVIDOR
const {
  PORT
} = process.env;

// FUNCIÓN PARA LLENAR LA BASE DE DATOS CON LOS GÉNEROS
async function fillGenresDatabase() {
  try {
    const genres = await getAllGenres();
    await Genre.bulkCreate(genres);

    console.log('Base de datos de géneros llenada con éxito');
  } catch (error) {
    console.error('Error al llenar la base de datos de géneros:', error);
  }
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => 

//Llama a fillGenresDatabase para llenar la base de datos con los géneros.
fillGenresDatabase()).then(() => {

  // Inicia el servidor con server.listen(PORT), 
  // y muestra un mensaje en la consola indicando que el servidor está en funcionamiento.
  server.listen(PORT, () => {
    console.log('%s listening at', PORT); // eslint-disable-line no-console
  });
}).catch((error) => {
  console.error('Error al sincronizar los modelos y llenar la base de datos:', error);
});
