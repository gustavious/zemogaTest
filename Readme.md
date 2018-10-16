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

To start the server on production/

```shell
$ npm run serve
```

### Watching file changes with `nodemon`

If needed, changes can be watch using nodemon

```shell
$ npm run watch
```

That's it!