/* @flow */
import express from 'express';
import bodyParser from 'body-parser';
import Router from './routes';
import config from './core/config'
import morgan from 'morgan'
import connectToDb from './db/connect'
import logger from './core/logger'
import {authMiddleware} from './core/auth'
import * as autoQuit from 'autoquit'

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
server.use(authMiddleware);
server.use((error: Error, req: Request, res, next) => {
  logger.error(error);
  if (error.name === 'UnauthorizedError') {
    return res.status(401).send(JSON.stringify({
      error: 'invalid_token',
      error_description: `Invalid token: ${String(error)}`,
    }));
  } else {
    return next();
  }
});
Router(server);

server.autoQuit;
server.listen(port, () => {
  logger.info(`Server running at http://127.0.0.1:${port}/
      You can see endpoints listed in /`);
});
