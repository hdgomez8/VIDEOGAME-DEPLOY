//******************routes --- genresRouter.js******************
//Importa el enrutador Router de Express.
const {Router} = require ("express");

const {
    getGenresHandlers,
    getGenreHandlers,
    createGenreHandlers
} = require("../handlers/genresHandlers");

const genresRouter = Router();

genresRouter.get("/", getGenresHandlers);
genresRouter.get("/:id", getGenreHandlers);
genresRouter.post("/", createGenreHandlers);

module.exports = genresRouter;