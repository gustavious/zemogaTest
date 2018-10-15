import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Required username'],
    lowercase: true
  },
  password: String,
  age: Number,
  marriage_status: String
}, {collection : 'User'});

let UserModel = mongoose.model('User', UserSchema);

UserModel.getAll = () => {
  return UserModel.find({});
};

UserModel.getUser = (username) => {
  return UserModel.find({username});
};

UserModel.addUser = (user) => {
  return user.save();
};

UserModel.removeUser = (username) => {
  return UserModel.remove({username});
};

export default UserModel;