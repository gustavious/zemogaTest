'use strict';var _express = require('express');var _express2 = _interopRequireDefault(_express);
var _bodyParser = require('body-parser');var _bodyParser2 = _interopRequireDefault(_bodyParser);
var _routes = require('./routes');var _routes2 = _interopRequireDefault(_routes);
var _config = require('./core/config');var _config2 = _interopRequireDefault(_config);
var _morgan = require('morgan');var _morgan2 = _interopRequireDefault(_morgan);
var _connect = require('./db/connect');var _connect2 = _interopRequireDefault(_connect);
var _logger = require('./core/logger');var _logger2 = _interopRequireDefault(_logger);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const server = (0, _express2.default)(),
port = _config2.default.serverPort;
_logger2.default.stream = {
  write: function (message, encoding) {// eslint-disable-line no-unused-vars
    _logger2.default.info(message);
  } };

(0, _connect2.default)();

server.use(_bodyParser2.default.urlencoded({ extended: true }));
server.use(_bodyParser2.default.json());
server.use((0, _morgan2.default)("dev", { "stream": _logger2.default.stream }));
(0, _routes2.default)(server);

server.listen(port, () => {
  _logger2.default.info(`Server running at http://127.0.0.1:${port}/
      You can see endpoints listed in /`);
});