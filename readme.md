# Express Ready Server

A ready-to-use Express + GraphQL server boilerplate with a clean, layered structure
and switchable MongoDB / MySQL persistence.

## Features

* Layered REST API (`Route → Controller → Service → Repository → Model`).
* Dual ORM: MongoDB (Mongoose) or MySQL (Sequelize), selected by `DB_TYPE` — one active per run.
* JWT authentication (`jsonwebtoken`) with bcrypt password hashing.
* Request validation with Joi (and a generic Ajv validator middleware).
* Security & resilience middleware: helmet, cors, rate limiting, too-busy guard.
* Logging with winston; i18n via `i18n-express` (translations on `req.app.locals.trans`).
* Response compression and optional HTTPS.
* Socket.io support (http & https). Note: not cluster-safe — needs a redis socket adapter.
* GraphQL wired with Apollo (resolvers are placeholder examples for clarification).
* Fail-fast environment validation at boot.

## Getting Started (local)

1. `npm i`
2. `cp .env.example .env`, then follow the comments in `.env`.
3. `npm run secret` — generates `APP_SECRET` used for hashing/signing.
4. Pick your database in `.env` via `DB_TYPE` (`mongodb` or `mysql`).
5. `npm run start` (or `npm run dev` for nodemon).

## Getting Started (Docker)

The compose stack runs the app alongside **both** MongoDB and MySQL, so `DB_TYPE`
works either way without editing compose files.

1. `cp .env.example .env` and set:
   * `DB_TYPE=mongodb` → `DB_HOST=mongo`, `DB_PORT=27017`, or
   * `DB_TYPE=mysql` → `DB_HOST=mysql`, `DB_PORT=3306`
   * set `DB_NAME`, and (for MySQL) `DB_USERNAME` / `DB_PASSWORD`.
2. `docker compose up --build`
3. The API is available on `http://localhost:${PORT}` (default 3000).

## Scripts

* `npm run dev` — start with nodemon (development).
* `npm run start` — start the server.
* `npm test` — run the Jest test suite.
* `npm run lint` — run ESLint.
* `npm run secret` — generate and write `APP_SECRET` into `.env`.

## API Examples

REST examples live in `api/v1/` (e.g. user registration at `POST {SERVER_ROOT_URL}/users/create`).
GraphQL is served at `/graphql`.
