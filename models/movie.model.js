const db = require("./db");

exports.createMovie = async (title, director, synopsis, user_id) => {
    const [result] = await db.query(
        `INSERT INTO movies (title, director, synopsis, user_id)
     VALUES (?, ?, ?, ?)`,
        [title, director, synopsis, user_id]
    );
    return {
        id: result.insertId,
        title,
        director,
        synopsis,
        user_id,
    };
};

exports.getAllMovies = async () => {
    const [rows] = await db.query(
        `SELECT * FROM movies ORDER BY created_at DESC`
    );
    return rows;
};

exports.getMovieById = async (id) => {
    const [rows] = await db.query(`SELECT * FROM movies WHERE id = ?`, [id]);
    return rows[0];
};

exports.updateMovie = async (id, title, director, synopsis, user_id) => {
    const [result] = await db.query(
        `UPDATE movies SET title = ?, director = ?, synopsis = ?
     WHERE id = ? AND user_id = ?`,
        [title, director, synopsis, id, user_id]
    );
    return result.affectedRows > 0;
};

exports.deleteMovie = async (id, user_id) => {
    const [result] = await db.query(
        `DELETE FROM movies WHERE id = ? AND user_id = ?`,
        [id, user_id]
    );
    return result.affectedRows > 0;
};