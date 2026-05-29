const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(process.cwd(), 'ki_cloud.db');
const db = new Database(DB_PATH);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS communities (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    community_id TEXT NOT NULL,
    author TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    post_id TEXT NOT NULL,
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price TEXT,
    image_base64 TEXT,
    dev_name TEXT,
    created_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS social_posts (
    id TEXT PRIMARY KEY,
    author TEXT NOT NULL,
    image_base64 TEXT NOT NULL,
    caption TEXT,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    created_at INTEGER NOT NULL
  );
`);

// Seed demo communities if empty
const existing = db.prepare('SELECT COUNT(*) as count FROM communities').get();
if (existing.count === 0) {
  const now = Date.now();
  db.exec(`
    INSERT INTO communities (id, name, description, created_at) VALUES
      ('c1', 'WebDev', 'Web development discussions', ${now}),
      ('c2', 'AI Agents', 'Build and share AI agents', ${now}),
      ('c3', 'Digital Marketing', 'SEO, social media, growth', ${now});
  `);
  console.log('✅ Seeded demo communities');
}

console.log('✅ Database ready at', DB_PATH);
db.close();
