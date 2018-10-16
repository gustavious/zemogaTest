import mongoose from 'mongoose';

const VoteSchema = mongoose.Schema({
  user_id: {
    type: String,
    unique: true,
    required: [true, 'Required username'],
    lowercase: true
  },
  box_id: String,
  vote: String
}, {collection : 'Vote'});

let VoteModel = mongoose.model('Vote', VoteSchema);

VoteModel.getAll = () => {
  return VoteModel.find({});
};

VoteModel.getVotesByUserId = (user_id,) => {
  return VoteModel.find({user_id});
};

VoteModel.addVote = (user) => {
  return user.save();
};


export default VoteModel;