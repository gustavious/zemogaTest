'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.getAllVotes = exports.getVotesByUser = exports.addVote = undefined;var _models = require('../models');
var _logger = require('../core/logger');var _logger2 = _interopRequireDefault(_logger);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const addVote = exports.addVote = async (req, res) => {
  if (!req.body.user_id || !req.body.box_id || !req.body.vote) {
    res.status(500).
    send({ error: 'Missing params', required: 'user_id, password, age, marriage_status' });
    return;
  }
  if (req.body.vote !== 'UP' && req.body.vote !== 'DOWN') {
    res.status(500).
    send({ error: 'Wrong vote value', valid_values: 'UP, DOWN' });
    return;
  }
  const vote = new _models.VoteModel({
    user_id: req.body.user_id,
    box_id: req.body.box_id,
    vote: req.body.vote });


  try {
    const savedVote = await _models.VoteModel.addVote(vote);
    _logger2.default.info('Adding Vote...');
    res.status(201).
    send({
      message: `User ${vote.user_id} successfully voted`,
      vote: savedVote });

  }
  catch (err) {
    _logger2.default.error('Error in voting: ', err);
    res.status(500).
    send({ error: `Got error during vote creation: ${err}` });
  }
};

const getVotesByUser = exports.getVotesByUser = async (req, res) => {
  try {
    const user = await _models.UserModel.getUserById(req.params.id);
    if (user == null) {
      res.status(500).
      send({ error: `User id not found: ${req.params.id}` });
      return;
    }
    _logger2.default.info('Fetching user votes...');
    const votes = _models.VoteModel.getVotesByUserId(req.params.id);
    res.status(200).
    send({
      message: `Votes found for user`,
      votes });

  } catch (err) {
    _logger2.default.error('Error in getting users: ', err);
    res.status(500).
    send({ error: `Got error during user fetch: ${err}` });
  }
};

const getAllVotes = exports.getAllVotes = async (req, res) => {
  try {
    const votes = await _models.VoteModel.getAll();
    _logger2.default.info('Sending all votes...');
    res.status(200).send(votes);
  }
  catch (err) {
    _logger2.default.error('Error in getting all votes: ' + err);
    res.status(500).send({ error: `Got error in getAll: ${err}` });
  }
};