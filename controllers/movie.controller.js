const movieModel = require("../models/movie.model");

exports.createMovie = async (req, res) => {
    const { title, director, synopsis } = req.body;
    const user_id = req.user.id;

    try {
        const movie = await movieModel.createMovie(title, director, synopsis, user_id);
        res.status(201).json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await movieModel.getAllMovies();
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await movieModel.getMovieById(id);
        if (!movie)
            return res.status(404).json({ message: "Film introuvable" });
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, director, synopsis } = req.body;
    const user_id = req.user.id;

    try {
        const updated = await movieModel.updateMovie(
            id,
            title,
            director,
            synopsis,
            user_id
        );
        if (!updated)
            return res
                .status(404)
                .json({ message: "Film introuvable ou non autorisé" });
        res.status(200).json({ message: "Film mis à jour avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;

    try {
        const deleted = await movieModel.deleteMovie(id, user_id);
        if (!deleted)
            return res
                .status(404)
                .json({ message: "Film introuvable ou non autorisé" });
        res.status(200).json({ message: "Film supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};