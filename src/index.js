/* @flow */
import express, {
  type $Request as ExpressRequest,
} from 'express';
import bodyParser from 'body-parser';
import Router from './routes';

const server = express(),
  port = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
Router(server);

server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
