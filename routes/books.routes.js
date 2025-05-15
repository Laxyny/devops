const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/", verifyToken, bookController.createBook);
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.put("/:id", verifyToken, bookController.updateBook);
router.delete("/:id", verifyToken, bookController.deleteBook);

module.exports = router;