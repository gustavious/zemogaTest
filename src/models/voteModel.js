import mongoose from 'mongoose';

const VoteSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  user_id: {
    type: String,
    required: [true, 'Required username'],
    lowercase: true
  },
  box_id: {
    type: String,
    required: [true, 'Required box id'],
    lowercase: true
  },
  vote: {
    type: String,
    required: [true, 'Required vote value'],
  }
}, {collection : 'Vote'});

let VoteModel = mongoose.model('Vote', VoteSchema);

VoteModel.getAll = () => {
  return VoteModel.find({});
};

VoteModel.getVotesByUserId = (user_id) => {
  return VoteModel.find({user_id});
};

VoteModel.addVote = (user) => {
  return user.save();
};

VoteModel.countBoxVotesByUserId = (user_id, box_id) => {
  return VoteModel.count({user_id, box_id});
};


export default VoteModel;