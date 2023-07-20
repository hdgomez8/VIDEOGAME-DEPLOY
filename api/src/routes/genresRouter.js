const {Router} = require ("express");

const {
    getGenresHandlers,
    getGenreHandlers,
    createGenreHandlers
} = require("../handlers/genresHandlers");

const genresRouter = Router();

genresRouter.get("/", getGenresHandlers);
genresRouter.post("/", createGenreHandlers);

module.exports = genresRouter;