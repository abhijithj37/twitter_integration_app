const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  twitterId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
  },
  profileImageUrl: {
    type: String,
  },
  coverPhoto: {
    type: String,
  },
  
  bio: {
    type: String,
  },
  joinedDate: {
    type: Date,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
