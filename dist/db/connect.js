'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _mongoose = require('mongoose');var _mongoose2 = _interopRequireDefault(_mongoose);
var _config = require('../core/config');var _config2 = _interopRequireDefault(_config);
var _logger = require('../core/logger');var _logger2 = _interopRequireDefault(_logger);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_mongoose2.default.Promise = global.Promise;

const connectToDb = async () => {
  let dbHost = _config2.default.dbHost;
  let dbPort = _config2.default.dbPort;
  let dbName = _config2.default.dbName;
  try {
    await _mongoose2.default.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, { useMongoClient: true });
    _logger2.default.info('Connected to mongo!!!');
  }
  catch (err) {
    _logger2.default.error('Could not connect to MongoDB');
  }
};exports.default =

connectToDb;