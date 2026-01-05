#!/usr/bin/env node
import open, { openApp, apps } from 'open';
import dotenv from 'dotenv';
import Database from 'better-sqlite3';
import fs from 'fs';

dotenv.config({ quiet: true });

const args = process.argv.slice(2);
const command = args[0];
const favorite = args[1];
const url = args[2];

const argCount = args.length;

const commands = {
    ls: { f: ls, argCount: 1 },
    open: { f: openFavorite, argCount: 2 },
    add: { f: add, argCount: 3 },
    rm: { f: rm, argCount: 2 },
};

let db;
const dbPath = 'favorites.db';

function init() {
    console.log('initializing database...');
    db = new Database(dbPath);

    const createTable = `
        CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            url TEXT NOT NULL
        )
    `;

    db.exec(createTable);

    const data = [
        { name: 'youtube', url: 'https://www.youtube.com' },
        { name: 'netflix', url: 'https://netflix.com' },
        { name: 'anime', url: 'https://www.youtube.com/@crunchyroll' },
    ];

    const insertData = db.prepare(
        'INSERT INTO favorites (name, url) VALUES (?, ?)'
    );

    data.forEach((favorite) => {
        insertData.run(favorite.name, favorite.url);
    });
}

function checkBrowser() {
    const browser = process.env?.BROWSER?.toLocaleLowerCase();
    let appName = browser;

    switch (browser) {
        case 'opera':
            appName = apps.operagx;
            break;
        case 'chrome':
            appName = apps.chrome;
            break;
        case 'firefox':
            appName = apps.firefox;
            break;
        case 'edge':
            appName = apps.edge;
            break;
    }
    return appName;
}

function displayMenu() {
    console.log('ls                        : List all favorites');
    console.log('open <favorite>           : Open a saved favorite');
    console.log('add <favorite> <url>      : add a new favorite for some URL');
    console.log('rm <favorite>             : remove a saved favorite');
}

async function openFavorite(favorite) {
    const row = db
        .prepare('SELECT * FROM favorites WHERE name = ?')
        .get(favorite);

    if (!row) {
        console.log('Favorite not found.');
        process.exit(1);
    }
    const url = row.url;
    console.log('opening', url);
    const appName = checkBrowser();

    if (appName) {
        await open(url, { app: { name: appName }, wait: true });
    } else {
        await open(url, { wait: true });
    }
}

function add(favorite, url) {
    db.prepare('INSERT INTO favorites (name, url) VALUES (?, ?)').run(
        favorite,
        url
    );
    console.log('Adding', favorite, url);
}

function rm(favorite) {
    db.prepare('DELETE FROM favorites WHERE name = ?').run(favorite);
    console.log('Removing: ', favorite);
}

function ls() {
    const favorites = db.prepare('SELECT * FROM favorites').all();
    console.log('All favorites:');
    favorites.forEach((favorite) => {
        console.log(`${favorite.name}: ${favorite.url}`);
    });
}

if (!fs.existsSync(dbPath)) {
    init();
} else {
    db = new Database(dbPath);
}

if (
    argCount === 0 ||
    !commands[command] ||
    argCount < commands[command].argCount
) {
    displayMenu();
    process.exit(1);
}

commands[command].f(favorite, url);
