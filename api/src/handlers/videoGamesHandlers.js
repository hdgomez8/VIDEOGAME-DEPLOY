const { createVideoGame, getVideoGameById, getAllVideoGames, searchVideoGameByName, addVideoGameToGenre } = require("../controllers/videoGamesControllers")
const { getGenreById } = require("../controllers/genresControllers")


const getVideoGamesHandlers = async (req, res) => {
    const { name } = req.query;

    const result = name ? await searchVideoGameByName(name) : await getAllVideoGames();
    res.status(200).json(result);
};

const getVideoGameHandlers = async (req, res) => {
    const { id } = req.params;

    const source = isNaN(id) ? "DB" : "api";

    try {
        const videoGame = await getVideoGameById(id, source);
        res.status(200).json(videoGame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createVideoGameHandlers = async (req, res) => {
    try {
        const { name, description, platforms, image, releaseDate, rating, genres } = req.body;

        const newVideoGame = await createVideoGame(name, description, platforms, image, releaseDate, rating, genres);
        res.status(201).json(newVideoGame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const addVideoGameToGenreHandlers = async (req, res) => {
    const { videoGameId, genreId } = req.params;
    const sourceVideoGame = isNaN(videoGameId) ? "DB" : "api";
    const sourceGenre = isNaN(genreId) ? "DB" : "api";

    try {
        const VideoGame = await getVideoGameById(videoGameId, sourceVideoGame);
        const Genre = await getGenreById(genreId, sourceGenre);
        const resultado = await addVideoGameToGenre(VideoGame, Genre);
        res.send(resultado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = {
    getVideoGamesHandlers,
    getVideoGameHandlers,
    createVideoGameHandlers,
    addVideoGameToGenreHandlers
}