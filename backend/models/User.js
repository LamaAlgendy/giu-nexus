const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6, select: false },
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
  resetPasswordToken: { type: String, select: false },
  resetPasswordExpire: { type: Date, select: false },
  createdAt: { type: Date, default: Date.now },
});

// Hash the password automatically whenever it's set or changed,
// so controllers never have to remember to hash it themselves.
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function comparePassword(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
