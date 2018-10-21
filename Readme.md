# Advertisement NodeJS Field Test

The following `Readme` contains instructions about how to build and deploy the advertisement service and a section that explains how to consume each route of the API. An editor that supports `MarkDown` is recommended.

### Before starting

- First, we need `node` in the version 8.12.
- `MongoDB` server installed and running on port 27017

`/src/core/config.js` file allows to change ports and paths if needed:
```
logFileDir = path.join(__dirname, '../../log');
logFileName = 'app.log';
dbHost = process.env.dbHost || 'localhost';
dbPort = process.env.dbPort || '27017';
dbName = process.env.dbName || 'advertisement';
serverPort = process.env.serverPort || 3000;
```

### Getting Started

First we'll install npm dependencies.

```shell
$ npm install
```

And start the development server.

```shell
$ npm start
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

POST:
  - Create new advertisement => `/advertisement`\
    required body fields: offer_msg, offer_graphic_url, start_datetime, end_datetime, category\
    request body type: JSON

       ```
       offer_graphic_url: must be a valid URL
       start_datetime, end_datetime: Must be a valid ISO8601 Date (e.g. 2018-10-20T20:28:17Z)
       ```


GET:
  - Get all advertisements => `/advertisements`
  - Fetch advertisements that belong to a category => `/advertisements/categories/:category`
  - Fetch a specific advertisement => `/advertisements/:id`
  - Fetch for advertisements that start and/or end within a specified date range =>
    Query string params: filter_by, initial_date, final_date
     ```
       filter_by: This constant can have three values: START, END, BOTH. It determines if you want to look for advertisement that have an start date in the specified range, an end date in the specified range or you want to look in both dates.

       note a query param is part of the URL and must have the form: URL?prop1=value1&prop2=value2&prop3=value3...
     ```

PUT:
  - Update an advertisement => `/advertisements/:id`\
    optional fields: offer_msg, offer_graphic_url, start_datetime, end_datetime, category

DELETE:
   - Remove an advertisement => `/advertisements/:id`

### Running tests

There are a minimal set of tests to check the server status.
You must have a server runing.

```shell
$ npm test
```


### Runing linter

To run the eslint linter,

```shell
$ npm run lint
```

That's it!