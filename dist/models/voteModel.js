'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _mongoose = require('mongoose');var _mongoose2 = _interopRequireDefault(_mongoose);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const VoteSchema = _mongoose2.default.Schema({
  _id: { type: _mongoose2.default.Schema.ObjectId, auto: true },
  user_id: {
    type: String,
    required: [true, 'Required username'],
    lowercase: true },

  box_id: {
    type: String,
    required: [true, 'Required box id'],
    lowercase: true },

  vote: {
    type: String,
    required: [true, 'Required vote value'] } },

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
};

VoteModel.countBoxVotesByUserId = (user_id, box_id) => {
  return VoteModel.count({ user_id, box_id });
};exports.default =


VoteModel;