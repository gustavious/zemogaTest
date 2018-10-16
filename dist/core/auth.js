'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.authMiddleware = undefined;var _expressJwt = require('express-jwt');var _expressJwt2 = _interopRequireDefault(_expressJwt);
var _logger = require('../core/logger');var _logger2 = _interopRequireDefault(_logger);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const authMiddleware = exports.authMiddleware = (0, _expressJwt2.default)({
  secret: 'zemoga-secret',
  requestProperty: 'auth',
  getToken: req => {
    const authHeader /*: ?string*/ = req.header('Authorization');
    if (authHeader != null && authHeader.split(' ')[0].toLowerCase() === 'bearer') {
      return authHeader.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  } }).
unless({ path: ['/favicon.ico', '/signup', '/login', '/index', '/'] });