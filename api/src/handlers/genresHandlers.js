const { createGenre, getAllGenres, getAllGenresDb } = require("../controllers/genresControllers");

const getGenresHandlers = async (req, res) => {
    const { name } = req.query;

    const result = name ? await searchGenreByName(name) : await getAllGenresDb();
    res.status(200).json(result);
};

const getGenreHandlers = (req, res) => {
    res.send("Esta ruta trae la info de un tipo de Genero determinado por ID");
};

const createGenreHandlers = async (req, res) => {
    const { name } = req.body;
    try {
        const newGenre = await createGenre(name);
        res.status(200).json(newGenre);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getGenresHandlers,
    getGenreHandlers,
    createGenreHandlers
}