'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.removeUser = exports.updateUser = exports.getAllUsers = exports.getUser = exports.login = exports.createUser = undefined;var _models = require('../models');
var _logger = require('../core/logger');var _logger2 = _interopRequireDefault(_logger);
var _jsonwebtoken = require('jsonwebtoken');var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _bcrypt = require('bcrypt');var _bcrypt2 = _interopRequireDefault(_bcrypt);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const createUser = exports.createUser = async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.age || !req.body.marriage_status) {
    res.status(500).
    send({ error: 'Missing params', required: 'username, password, age, marriage_status' });
    return;
  }
  const user = new _models.UserModel({
    username: req.body.username,
    password: _bcrypt2.default.hashSync(req.body.password, 10),
    age: req.body.age,
    marriage_status: req.body.marriage_status });


  try {
    const savedUser = await _models.UserModel.addUser(user);
    _logger2.default.info('Adding user...');
    res.status(201).
    send({
      message: 'User registered',
      user: savedUser,
      token: await _jsonwebtoken2.default.sign({ auth: savedUser }, 'zemoga-secret') });

  }
  catch (err) {
    _logger2.default.error('Error in creating users: ', err);
    res.status(500).
    send({ error: `Got error during user creation: ${err}` });
  }
};

const login = exports.login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(500).
    send({ error: 'Missing params', required: 'username, password' });
    return;
  }
  try {
    const user = await _models.UserModel.getUser(
    req.body.username,
    _bcrypt2.default.hashSync(req.body.password, 10));

    if (user == null) {
      res.status(500).
      send({ error: `User not found: ${req.body.username}` });
      return;
    }
    if (!_bcrypt2.default.compareSync(req.body.password, user.password)) {
      res.status(500).
      send({ error: `Wrong password for user: ${req.body.username}` });
      return;
    }
    _logger2.default.info('Fetching user...');
    res.status(200).
    send({
      message: 'User successfully logged',
      user: user,
      token: await _jsonwebtoken2.default.sign({ auth: user }, 'zemoga-secret') });

  } catch (err) {
    _logger2.default.error('Error in getting users: ', err);
    res.status(500).
    send({ error: `Got error during user login: ${err}` });
  }
};

const getUser = exports.getUser = async (req, res) => {
  try {
    const user = await _models.UserModel.getUserById(req.params.id);
    _logger2.default.info('Fetching user...');
    res.status(200).
    send({
      message: 'User found',
      user });

  } catch (err) {
    _logger2.default.error('Error in getting users: ', err);
    res.status(500).
    send({ error: `Got error during user fetch: ${err}` });
  }
};

const getAllUsers = exports.getAllUsers = async (req, res) => {
  try {
    const users = await _models.UserModel.getAll();
    _logger2.default.info('Sending all users...');
    res.status(200).send(users);
  }
  catch (err) {
    _logger2.default.error('Error in getting all users: ' + err);
    res.status(500).send({ error: `Got error in getAll: ${err}` });
  }
};

const updateUser = exports.updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = _bcrypt2.default.hashSync(req.body.password, 10);
    }
    const user = await _models.UserModel.updateUser(req.params.id, req.body);
    if (user == null) {
      res.status(500).
      send({ error: `User not found: ${req.body.username}` });
      return;
    }
    _logger2.default.info('Updating user...');
    res.status(200).send(user);
  }
  catch (err) {
    _logger2.default.error('Error in getting all users: ' + err);
    res.status(500).send({ error: `Got error while updating user: ${err}` });
  }
};

const removeUser = exports.removeUser = async (req, res) => {
  try {
    const removedUser = await _models.UserModel.removeUser(req.params.id);
    if (removedUser.n === 0) {
      res.status(500).
      send({ error: `User not found: ${req.body.username}` });
      return;
    }
    _logger2.default.info('Deleted user: ' + removedUser);
    res.status(202).send({
      message: 'User successfully deleted',
      removedUser: removedUser });

  }
  catch (err) {
    _logger2.default.error('Failed to delete user: ' + err);
    res.status(500).send({ error: `Got error while deleting user :( ${err}` });
  }
};