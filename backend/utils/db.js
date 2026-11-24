
import Database from "better-sqlite3";

const db = new Database("assets.db");


db.exec(`
    CREATE TABLE IF NOT EXISTS assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        asset_id TEXT UNIQUE NOT NULL,
        asset_name TEXT NOT NULL,
        category TEXT NOT NULL,
        photograph TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

console.log("Database connected successfully!");

export default db;
