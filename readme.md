# Express Ready Server

## Server Feature

* Logger.
* Most important middlewares.
* We can use it with http or https via envirnoment variable.
* Socket support (http & https) but not working with cluster (known issue).

## How to Use

* clone repo `git clone https://github.com/poode/readyServer.git`.
* run `npm i`.
* run `npm i -g nodemon`.
* set your environment vairables in `.env` like `.env.example` and set your connections.
* run `npm run secret` to generate secret key will be used to hash passwords or any use in env. variable called `APP_SECRET`.
* run `npm run start` to start server.
* run `npm run dev` to start server with `nodemon` for development.
* please follow .env.example comments.

## Examples for APIs

* In `api/v1` folder
