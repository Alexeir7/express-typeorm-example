# Express, TypeORM and Typescript Example project

This project is a basic starter project on how to use Express and TypeORM together using Typescript.

The project is using right now SQLite as its DB engine.

## Install

```cmd
    $ npm install
```

## Add Admin User to DB via postman

url: http://localhost:3000/signup

```
    {
    "username": "admin",
    "password": "admin",
    "role": "ADMIN"
    }
```

## Available Roles
'ADMIN','EDITOR'

Every other roles other than that is considered a VIEWER

## Run Project

```cmd
    $ npm run watch
```

```cmd
    $ npm run watch
```