/* @flow */
import express from 'express';
import bodyParser from 'body-parser';
import Router from './routes';
import config from './core/config'
import morgan from 'morgan'
import connectToDb from './db/connect'
import logger from './core/logger'

const server = express(),
  port = config.serverPort;
logger.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};
connectToDb();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan("dev", { "stream": logger.stream }));
Router(server);

server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
