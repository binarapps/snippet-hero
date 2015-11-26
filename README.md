# snippet-hero
It is example node js project

## Prerequisites
```
node 4+
npm
```
I recommend using nvm

## Installation
### Packages
```
npm install
```
### Database
To create database run:
```
psql -c "CREATE DATABASE snippethero_development WITH ENCODING 'UTF8'
```
To setup app database configuration copy example file and overwrite it with your username and password to database:
```
cp server/config/config.json.example server/config/config.json
```
To run migrations
```
cd server; ../node_modules/.bin/sequelize db:migrate
```

## Run dev server
```
npm start
```

## Tests
```
// TODO
```


## Deploy
```
// TODO
```
