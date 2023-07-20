import axios from "axios";

export const GET_VIDEO_GAMES = "GET_VIDEO_GAMES";
export const GET_VIDEO_GAME = "GET_VIDEO_GAME";
export const POST_VIDEO_GAME = "POST_VIDEO_GAME";

export const getVideoGames = () => {
  return async function (dispatch) {
    const videoGamesData = await axios.get(`/videogames/`);
    const videoGames = videoGamesData.data;
    dispatch({ type: GET_VIDEO_GAMES, payload: videoGames });
  };
};

export const getVideoGame = (id) => {
  return async function (dispatch) {
    const videoGameData = await axios.get(`/videogames/${id}`);
    const videoGame = videoGameData.data;
    dispatch({ type: GET_VIDEO_GAME, payload: videoGame });
  };
};


export const postVideoGame = (videoGameData) => {
  return async function (dispatch) {
    try {
      const response = await axios.post('/videogames/', videoGameData);
      const videoGames = response.data;
      dispatch({ type: POST_VIDEO_GAME, payload: videoGames });
    } catch (error) {
      // Manejar el error en caso de que ocurra
      console.error('Error al crear el videojuego:', error);
    }
  };
};