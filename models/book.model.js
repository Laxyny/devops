const db = require("./db");

exports.createBook = async (title, author, summary, user_id) => {
    const [result] = await db.query(
        `INSERT INTO books (title, author, summary, user_id)
     VALUES (?, ?, ?, ?)`,
        [title, author, summary, user_id]
    );
    return {
        id: result.insertId,
        title,
        author,
        summary,
        user_id,
    };
};

exports.getAllBooks = async () => {
    const [rows] = await db.query(
        `SELECT * FROM books ORDER BY created_at DESC`
    );
    return rows;
};

exports.getBookById = async (id) => {
    const [rows] = await db.query(`SELECT * FROM books WHERE id = ?`, [id]);
    return rows[0];
};

exports.updateBook = async (id, title, author, summary, user_id) => {
    const [result] = await db.query(
        `UPDATE books SET title = ?, author = ?, summary = ?
     WHERE id = ? AND user_id = ?`,
        [title, author, summary, id, user_id]
    );
    return result.affectedRows > 0;
};

exports.deleteBook = async (id, user_id) => {
    const [result] = await db.query(
        `DELETE FROM books WHERE id = ? AND user_id = ?`,
        [id, user_id]
    );
    return result.affectedRows > 0;
};