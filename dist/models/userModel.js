'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _mongoose = require('mongoose');var _mongoose2 = _interopRequireDefault(_mongoose);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const UserSchema = _mongoose2.default.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Required username'],
    lowercase: true },

  password: String,
  age: Number,
  marriage_status: String },
{ collection: 'User' });

let UserModel = _mongoose2.default.model('User', UserSchema);

UserModel.getAll = () => {
  return UserModel.find({});
};

UserModel.getUser = username => {
  return UserModel.findOne({ username });
};

UserModel.getUserById = id => {
  return UserModel.findById(id);
};

UserModel.addUser = user => {
  return user.save();
};

UserModel.updateUser = (id, params) => {
  return UserModel.findByIdAndUpdate(id, params);
};

UserModel.removeUser = id => {
  return UserModel.remove({ _id: id });
};exports.default =

UserModel;