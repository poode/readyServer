# Express Ready Server

## Server Feature

* Logger using winston.
* Most important middlewares.
* We can use it with http or https via environment variables.
* Socket support (http & https) but not working with cluster (known issue it needs socket Adapter with redis server).
* Implemented Localized and translation could be found in (req.app.locals.trans) Object.
* Response compressor for response size more than 1 M.
* Graphql implemented (The Example is not working but it is for clarifications)

## How to Use

* clone repo `git clone https://gitlab.com/Fagr/readyServer.git`.
* run `npm i`.
* create `.env` file using `cp .env.example .env`.
* run `npm run secret` to generate secret key will be used to hash passwords or any use in environment variable called `APP_SECRET`.
* run `npm run start` to start server.
* run `npm run dev` to start server with `nodemon` for development.
* please follow .env.example comments.
* to use graphql open (`http://localhost:3000/graphql`) Note: or `https` if you used it and maybe another port as per `.env` file pre-configration by you.

## Examples for APIs

* In `api/v1` folder
