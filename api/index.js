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
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getAllGenres } = require('./src/controllers/genresControllers');
const { Genre } = require('./src/db');

// Función para llenar la base de datos con los géneros
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
conn.sync({ force: true }).then(() => fillGenresDatabase()).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
}).catch((error) => {
  console.error('Error al sincronizar los modelos y llenar la base de datos:', error);
});
