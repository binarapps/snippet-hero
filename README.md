# snippet-hero
[![Build Status](https://travis-ci.org/binarapps/snippet-hero.svg?branch=master)](https://travis-ci.org/binarapps/snippet-hero)
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
psql -c "CREATE DATABASE snippethero_development WITH ENCODING 'UTF8'"
or
createdb -E UTF8 snippethero_development
```
To setup app database configuration copy example file and overwrite it with your username and password to database:
```
cp server/config/config.json.example server/config/config.json
```
To run migrations
```
npm run sequalize -- db:migrate
```
### Secrets
```
cp server/config/secrets.json.example server/config/secrets.json
```

## Run dev server
```
npm start
```

## Tests
First create test database
```
createdb -E UTF8 snippethero_test
```
Then to run backend tests:
```
npm run test:server
```

To run frontend test simply (keep in mind that you need chrome browser to be able to do it):
```
npm run test:client
```

To fire all tests:
```
npm test
```

## Deploy
```
// TODO
```
