const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Todo = new Schema({
  title: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Todo', Todo);
