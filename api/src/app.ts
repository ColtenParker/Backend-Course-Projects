import express, { Request, Response, NextFunction } from 'express';
import Database from 'better-sqlite3';
import favorites from './routes/favorites.js';
import cors from 'cors';

const db = new Database('favorites.db');

const app = express();
const port = 3000;
app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:3001', 'http://localhost:3002'],
        methods: ['GET', 'POST', 'PUT', 'PATCH'],
        allowedHeaders: ['Content-Type, Accept'],
    })
);

app.use('/favorites', favorites);

app.get('/', (req: Request, res: Response): void => {
    res.json({ hello: 'world' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
    if (err.name === 'sqliteError') {
        console.log('Db error hit!');
    }
    next(err);
});

app.listen(port, () => {
    console.log(`listening on https://localhost:${port}...`);
});
