const { Videogame, Genre } = require("../db");
const axios = require("axios");
const {
    API_KEY
} = process.env;

const getAllGenres = async () => {

    const genresGames = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results;
    const GenresApi = genresGames.map((genre) => {
        return {
            // Extract the desired properties from the game object and format them as needed
            id: genre.id,
            name: genre.name,
        };
    });

    return [ ...GenresApi];
};

const getAllGenresDb = async () => {
    const GenresDB = await Genre.findAll({
        include: Videogame
    });

    return [...GenresDB];
};

module.exports = { getAllGenres, getAllGenresDb };