'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _controllers = require('../controllers');










var _path = require('path');var _path2 = _interopRequireDefault(_path);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

async app => {
  // Create a user
  app.post('/signup', _controllers.createUser);
  // Log in a user
  app.post('/login', _controllers.login);
  // Get all stored users
  app.get('/users', _controllers.getAllUsers);

  app.route('/users/:id')
  // Get a specific user
  .get(_controllers.getUser)
  // Update an user
  .put(_controllers.updateUser)
  // Remove an user
  .delete(_controllers.removeUser);

  // Add a new vote
  app.post('/vote', _controllers.addVote);
  // Get all votes
  app.get('/votes', _controllers.getAllVotes);
  // Get the votes that belong to a specific user
  app.route('/users/:id/votes').
  get((0, _controllers.getVotesByUser)());

  app.get('/', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../UI/index.html'));
  });
};