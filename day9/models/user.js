const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  dateOfBirth: Date
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;
