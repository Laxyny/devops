const bookModel = require("../models/book.model");

exports.createBook = async (req, res) => {
    const { title, author, summary } = req.body;
    const user_id = req.user.id;

    try {
        const book = await bookModel.createBook(title, author, summary, user_id);
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.getAllBooks();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await bookModel.getBookById(id);
        if (!book)
            return res.status(404).json({ message: "Livre introuvable" });
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, summary } = req.body;
    const user_id = req.user.id;

    try {
        const updated = await bookModel.updateBook(
            id,
            title,
            author,
            summary,
            user_id
        );
        if (!updated)
            return res
                .status(404)
                .json({ message: "Livre introuvable" });
        res.status(200).json({ message: "Livre mis à jour" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;

    try {
        const deleted = await bookModel.deleteBook(id, user_id);
        if (!deleted)
            return res
                .status(404)
                .json({ message: "Livre introuvable" });
        res.status(200).json({ message: "Livre supprimé" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};