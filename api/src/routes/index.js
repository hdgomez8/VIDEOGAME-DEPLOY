// este archivo actúa como un enrutador principal que agrupa y configura los diferentes sub-enrutadores 
// relacionados con las rutas de videojuegos y géneros en la aplicación. Al organizar las rutas de esta manera, 
// se mantiene una estructura limpia y modular en la aplicación Express.

//******************routes --- index.js******************
//Importa el enrutador Router de Express.
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGamesRouter = require("./videoGamesRouter");
const genresRouter = require("./genresRouter");

//Crea una instancia del enrutador principal llamado router.
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videoGamesRouter);
router.use('/genres', genresRouter);

//Exporta el enrutador principal para que pueda ser utilizado en la aplicación principal.
module.exports = router;
