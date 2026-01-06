import express from 'express';
import Database from 'better-sqlite3';
import favorites from './routes/favorites.js';
import cors from 'cors';

const db = new Database('favorites.db');

const app = express();
const port = 3000;
app.use(express.json());
//app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE'
    );
    next();
});

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
