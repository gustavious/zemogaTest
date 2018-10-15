import {UserModel as User} from '../models'
import logger from '../core/logger'
import jwt from 'express-jwt';


export const createUser = async (req, res) => {
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
        token: '12345' // TODO
      });
  }
  catch(err) {
    logger.error('Error in getting users- ' + err);
    res.status(500)
      .send({error: `Got error during user creation: ${err}`});
  }

};

export const login = (res, req) => {};

export const getUser = (req, res) => {
  res.json("Hello world");
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    logger.info('sending all users...');
    res.status(201).send(users);
  }
  catch(err) {
    logger.error('Error in getting all users: ' + err);
    res.status(500).send('Got error in getAll');
  }
};

export const updateUser = (res, req) => {};