import express from 'express';
import Database from 'better-sqlite3';
import favorites from './routes/favorites.js';
const db = new Database('favorites.db');

const app = express();
app.use(express.json());
const port = 3000;

app.use('/favorites', favorites);

app.use((err, req, res, next) => {
    if (err.name === 'sqliteError') {
        console.log('Db error hit!');
    }
    next(err);
});

app.listen(port, () => {
    console.log(`listening on https://localhost:${port}...`);
});
