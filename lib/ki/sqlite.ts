import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'ki_cloud.db');
let db: Database.Database | null = null;

export function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('foreign_keys = ON');
  }
  return db;
}

export function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}
