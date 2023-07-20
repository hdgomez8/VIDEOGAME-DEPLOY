const { Router } = require("express");

const {
    getVideoGamesHandlers,
    getVideoGameHandlers,
    createVideoGameHandlers,
    addVideoGameToGenreHandlers
} = require("../handlers/videoGamesHandlers");

const { validateCreateVideoGames } = require("../middlewares/validates");

const videoGamesRouter = Router();

videoGamesRouter.get("/", getVideoGamesHandlers);

videoGamesRouter.get("/:id", getVideoGameHandlers);

videoGamesRouter.post("/:videoGameId/genres/:genreId",addVideoGameToGenreHandlers);

videoGamesRouter.post("/", validateCreateVideoGames, createVideoGameHandlers);

module.exports = videoGamesRouter;