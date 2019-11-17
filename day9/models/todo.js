const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
  userEmail: String,
  todoText: String,
  todoColor: String
});

const ToDoModel = mongoose.model('order', ToDoSchema);

module.exports = ToDoModel;
