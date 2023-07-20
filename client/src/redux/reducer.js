import { GET_VIDEO_GAMES, GET_VIDEO_GAME } from "./actions";

const initialState = {
  videoGames: [],
  videoGamesCopy: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEO_GAMES:
      return { ...state, videoGames: action.payload, videoGamesCopy: action.payload };
    default:
      return { ...state };
  }
};

export default rootReducer;
