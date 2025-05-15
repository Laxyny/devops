const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();

async function importSQL() {
    const sql = fs.readFileSync(path.join(__dirname, "mysql-init", "init.sql"), "utf8");
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        multipleStatements: true,
    });
    await connection.query(sql);
    await connection.end();
    console.log("Script SQL exécuté");
}

importSQL().catch((err) => {
    console.error("Erreur import SQL:", err);
    process.exit(1);
});