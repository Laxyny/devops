const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/", verifyToken, movieController.createMovie);
router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);
router.put("/:id", verifyToken, movieController.updateMovie);
router.delete("/:id", verifyToken, movieController.deleteMovie);

module.exports = router;