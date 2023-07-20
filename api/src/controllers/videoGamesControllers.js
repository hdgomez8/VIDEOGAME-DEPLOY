const { Videogame, Genre } = require("../db");
const axios = require("axios");
const {
    API_KEY
} = process.env;

const getAllVideoGames = async () => {
    const VideoGamesDB = await Videogame.findAll({
        include: Genre
    });

    const VideoGameDbFormated = VideoGamesDB.map((game)=>{

        const genres = game.genres.map((genres) => genres.name);

        return {
            // Extract the desired properties from the game object and format them as needed
            id: game.id,
            name: game.name,
            description: game.description,
            platforms: game.platforms,
            image: game.image,
            releaseDate: game.released,
            rating: game.rating,
            genres: genres,
            created: true,
            // Add more properties as necessary
        };
    })

    const totalPages = 5;

    let videoGames = [];

    for (let page = 1; page <= totalPages; page++) {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`);
        const pageVideoGames = response.data.results;
        videoGames = [...videoGames, ...pageVideoGames];
    }

    const VideoGamesApi = videoGames.map((game) => {

        const platforms = game.platforms.map((platform) => platform.platform.name);
        const genres = game.genres.map((genres) => genres.name);

        return {
            // Extract the desired properties from the game object and format them as needed
            id: game.id,
            name: game.name,
            description: game.description,
            platforms: platforms,
            image: game.background_image,
            releaseDate: game.released,
            rating: game.rating,
            genres: genres,
            created: "false",
            // Add more properties as necessary
        };
    });

    return [...VideoGameDbFormated, ...VideoGamesApi];
};

const getVideoGameById = async (id, source) => {
    const videoGame = source === "api" ?
        (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data :
        await Videogame.findByPk(id,{
            include: {
                model:Genre,
                attributes: ['name'],
                through: {attributes:[]}
            }
        });

    return videoGame;

};

const videoGameDetails = async (videoGamesDetails) => {

    const results = [];

    const imagen = videoGamesDetails.sprites && videoGamesDetails.sprites.front_default ? pokemonDetails.sprites.front_default : null;

    try {
        for (const videoGame of videoGamesDetails) {
            const videoGame = await getVideoGameDetails(pokemon.url);

            if (pokemonDetails) {
                results.push(pokemonDetails);
            }
        }
    } catch (error) {
        console.error('Error al crear el iterable:', error);
    }

    return results;

};

const cleanArray = async (array) => {
    const results = [];

    try {
        for (const videoGame of array) {
            const pokemonDetails = await getVideoGameDetails(pokemon.url);

            if (pokemonDetails) {
                results.push(pokemonDetails);
            }
        }
    } catch (error) {
        console.error('Error al crear el iterable:', error);
    }

    return results;
}

const createVideoGame = async (name, description, platforms, image, releaseDate, rating, genres) => {
    try {
        const videoGame = await Videogame.create({ name, description, platforms, image, releaseDate, rating });

        const genreDb = await Genre.findAll({ where: { id: genres } })

        // Asociar los géneros al videojuego
        await videoGame.addGenres(genreDb);

        return videoGame;
    } catch (error) {
        console.error('Error al crear el videojuego:', error);
        throw error;
    }
};


module.exports = { createVideoGame, getVideoGameById, getAllVideoGames };