const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  bio: { type: String },
  skills: { type: [String], default: [] },
  role: {
    type: String,
    enum: ['jobSeeker', 'recruiter', 'admin'],
    default: 'jobSeeker',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
