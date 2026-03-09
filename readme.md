# Backend Course Projects

This repository is a collection of mini projects built while learning backend and full-stack fundamentals in Node.js and TypeScript.

## Mini Projects Overview

### 1) `server client intro/First Node Project`
A basic Node.js client/server exercise using the built-in `http` module.
- The server reads `users.json` from disk and returns it as a response.
- The client makes an HTTP request to the server and prints user names from the returned JSON.
- Goal: understand low-level request/response flow and simple file-backed data exchange.

### 2) `cli`
A command-line tool (`favs`) for managing and opening favorite websites.
- Supports commands like listing, adding, removing, and opening saved favorites.
- Uses the `open` package to launch links in a browser.
- Connects to the API service to persist favorites.
- Goal: practice building user-facing Node CLIs that integrate with backend services.

### 3) `api`
An Express + TypeScript REST API for favorites.
- Exposes routes under `/favorites` for CRUD-style operations.
- Uses SQLite (via `better-sqlite3`) for data persistence.
- Includes CORS configuration for local client apps.
- Goal: learn API design, routing, middleware, and persistence.

### 4) `client`
A React frontend that consumes the favorites API.
- Fetches favorite links from `http://localhost:3000/favorites`.
- Renders each favorite as a clickable link.
- Goal: connect a frontend app to a backend API and display dynamic data.

### 5) `api-ts`
A minimal TypeScript + Express starter API.
- Contains a simple `GET /` endpoint returning “Hello world!”.
- Goal: serve as a lightweight TypeScript API baseline.

### 6) `shared-types`
Shared TypeScript declaration package.
- Intended to hold type definitions that can be reused across projects (for example between API and CLI/client).
- Goal: reduce duplication and keep data contracts consistent.

### 7) `server client intro` scripts (`MapFilterReduce.js`, `practice.js`)
Small standalone JavaScript practice files.
- Focus on foundational language features and array methods.
- Goal: reinforce core JavaScript concepts used in later projects.

---