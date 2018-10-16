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

UserModel.getUser = (username, password) => {
  return UserModel.findOne({username, password});
};

UserModel.getUserById = (id) => {
  return UserModel.findById(id);
};

UserModel.addUser = (user) => {
  return user.save();
};

UserModel.updateUser = (id, params) => {
  return UserModel.findByIdAndUpdate(id, params);
};

UserModel.removeUser = (id) => {
  return UserModel.remove({_id: id});
};

export default UserModel;