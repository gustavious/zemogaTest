'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _mongoose = require('mongoose');var _mongoose2 = _interopRequireDefault(_mongoose);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const VoteSchema = _mongoose2.default.Schema({
  user_id: {
    type: String,
    unique: true,
    required: [true, 'Required username'],
    lowercase: true },

  box_id: String,
  vote: String },
{ collection: 'Vote' });

let VoteModel = _mongoose2.default.model('Vote', VoteSchema);

VoteModel.getAll = () => {
  return VoteModel.find({});
};

VoteModel.getVotesByUserId = user_id => {
  return VoteModel.find({ user_id });
};

VoteModel.addVote = user => {
  return user.save();
};exports.default =


VoteModel;