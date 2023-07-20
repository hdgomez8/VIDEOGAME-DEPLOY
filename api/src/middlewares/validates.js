const validateCreateVideoGames = (req, res, next) => {
    const { name, description, platforms, image, releaseDate, rating, genres } = req.body;

    if (!name) return res.status(400).json({ error: "Missing Name" });
    if (!description) return res.status(400).json({ error: "Missing description" });
    if (!platforms) return res.status(400).json({ error: "Missing platforms" });
    if (!image) return res.status(400).json({ error: "Missing image" });
    if (!releaseDate) return res.status(400).json({ error: "Missing releaseDate" });
    if (!rating) return res.status(400).json({ error: "Missing rating" });
    if (!genres) return res.status(400).json({ error: "Missing genres" });

    next();
}

module.exports = {
    validateCreateVideoGames
};