import {UserModel as User} from '../models'
import logger from '../core/logger'
import jwt from 'jsonwebtoken';


export const createUser = async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.age || !req.body.marriage_status) {
    res.status(500)
      .send({error: 'Missing params', required: 'username, password, age, marriage_status'});
    return;
  }
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    age: req.body.age,
    marriage_status: req.body.marriage_status
  });

  try {
    const savedUser = await User.addUser(user);
    logger.info('Adding user...');
    res.status(201)
      .send({
        message: 'User registered',
        user: savedUser,
        token: await jwt.sign({ auth: savedUser }, 'zemoga-secret'),
      });
  }
  catch(err) {
    logger.error('Error in creating users: ', err);
    res.status(500)
      .send({error: `Got error during user creation: ${err}`});
  }
};

export const login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(500)
      .send({error: 'Missing params', required: 'username, password'});
    return;
  }
  try {
    const user = await User.getUser(req.body.username, req.body.password);
    if (user == null) {
      res.status(500)
        .send({error: `User not found or wrong credentials: ${req.body.username}`});
    }
    logger.info('Fetching user...');
    res.status(200)
      .send({
        message: 'User successfully logged',
        user: user,
        token: await jwt.sign({ auth: user }, 'zemoga-secret'),
      });
  } catch(err) {
    logger.error('Error in getting users: ', err);
    res.status(500)
      .send({error: `Got error during user login: ${err}`});
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (user == null) {
      res.status(500)
        .send({error: `User id not found: ${req.params.id}`});
    }
    logger.info('Fetching user...');
    res.status(200)
      .send({
        message: 'User found',
        user
      });
  } catch(err) {
    logger.error('Error in getting users: ', err);
    res.status(500)
      .send({error: `Got error during user fetch: ${err}`});
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    logger.info('Sending all users...');
    res.status(200).send(users);
  }
  catch(err) {
    logger.error('Error in getting all users: ' + err);
    res.status(500).send({error: `Got error in getAll: ${err}`});
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.updateUser(req.params.id, req.body);
    if (user == null) {
      res.status(500)
        .send({error: `User not found: ${req.body.username}`});
    }
    logger.info('Updating user...');
    res.status(200).send(user);
  }
  catch(err) {
    logger.error('Error in getting all users: ' + err);
    res.status(500).send({error: `Got error while updating user: ${err}`});
  }
};

export const removeUser = async (req, res) => {
  try{
    const removedUser = await User.removeUser(req.params.id);
    if (removedUser.n === 0) {
      res.status(500)
        .send({error: `User not found: ${req.body.username}`});
    }
    logger.info('Deleted user: ' + removedUser);
    res.status(202).send({
      message: 'User successfully deleted',
      removedUser: removedUser,
    });
  }
  catch(err) {
    logger.error('Failed to delete user: ' + err);
    res.status(500).send({error: `Got error while deleting user :( ${err}`});
  }
};
