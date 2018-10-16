# Zemoga NodeJS Test

### Before starting

- First, we need `node` in the version 8.12.
- `MongoDB` server installed and running on port 27017

`/src/core/config.js` file allows to change ports and paths if needed:
```
logFileDir = path.join(__dirname, '../../log');
logFileName = 'app.log';
dbHost = process.env.dbHost || 'localhost';
dbPort = process.env.dbPort || '27017';
dbName = process.env.dbName || 'users';
serverPort = process.env.serverPort || 3000;
```

### Getting Started

First we'll install npm dependencies.

```shell
$ npm install
or
$ yarn
```

And start the development server.

```shell
$ npm start
or
$ yarn start
```

`host:port/` has a minimal UI accessible through the browser to list all the endpoints.

```
e.g.
$ GET/ http://localhost:3000/
```

### Deploy server for production use

To precompile dist assets.

```shell
$ npm run build
```

To start the server on production

```shell
$ npm run serve
```

### Watching file changes with `nodemon`

If needed, changes can be watch using nodemon

```shell
$ npm run watch
```

### API endpoints explained

Most of the API endpoints require an `Authorization` header to work, the only two exception are `/login` and `/register/. You can get a token form here.

POST:
  - Register a user => `/signup`
    required fields: username, password, age, marriage_status

  - Log in a user => `/login`
    required fields: username, password

Other endpoints will require an `Authorization` HEADER compose by `bearer ${token}`. So, you manually have to add the word bearer and a space.
Example:
```
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjp7Il9pZCI6IjViYzU5MGUyYWVjNmYxNWU0ZTc1NDljNSIsInVzZXJuYW1lIjoiMTgiLCJwYXNzd29yZCI6IiQyYiQxMCQxY0dDTW8vdFNRSTlhRFd3WVhsb3YuWVBKbkptQUdycDJwYXJ2eHNYUXZ5Z3Q4ZjF6cDVSVyIsImFnZSI6MjEsIm1hcnJpYWdlX3N0YXR1cyI6IkNhc2FkaXNpbW8iLCJfX3YiOjB9LCJpYXQiOjE1Mzk2NzQzODh9.wBfWGDnbdo69RW-gAT_1kkXZc_KzzZQym7oc7mr7P7U
```

GET:
  - Get all users => `/users`
  - Get a specific user => `/users/:id`
  - Get a specific user votes => `/users/:id/votes`
  - Get all the votes => `/votes`

PUT:

  - Update an user => `/users/:id`
    optional fields: password, age, marriage_status

DELETE:
    - Remove an user => `/users/:id`


### Running tests

There are a minimal set of tests to check the server status.
You must have a server runing.

```shell
$ npm test
```


### Runing linter

To run the eslint linter,

```shell
$ npm lint
```

That's it!