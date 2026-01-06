import Database from 'better-sqlite3';
const db = new Database('favorites.db');

const createTable = `
    CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        url TEXT NOT NULL
    )
`;

db.exec(createTable);

const favorites = [
    { id: 1, name: 'netflix', url: 'https://netflix.com' },
    { id: 2, name: 'fb', url: 'https://facebook.com' },
    { id: 3, name: 'yt', url: 'https://www.youtube.com' },
];

const insertData = db.prepare(
    'INSERT INTO favorites (name, url) values (?, ?)'
);

favorites.forEach((fav) => {
    insertData.run(fav.name, fav.url);
});

db.close();
