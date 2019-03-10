# Warbler
### Overview
1. Built *Warbler* from scratch, a Twitter-like website where users can create accounts and post messages to every one.
2. Implemented front-end (`warbler-client`) by React and back-end (`warbler-server`) by Node.js and MongoDB, developed modules for registration and authentication.
3. Created APIs containing messages and user data and deployed the website on Heroku platform.
### How to run it
1. Run `git clone https://github.com/DDjackson272/Warbler`.
2. Run `npm install` under `warbler-client` and `warbler-server` respectively.
3. Run `touch .env` under `warbler-server` and define a `SECRET_KEY` in `.env`.
4. Run `mkdir db` under `warbler` to create a database.
5. Run `mongod --dbpath db` to start database, install [MongoDB](https://docs.mongodb.com/v3.2/administration/install-community/) if you have not.
6. Run `nodemon` under `warbler-client` and `warbler-server` respectively.
7. Go to `http://localhost:3000/` and have fun!
