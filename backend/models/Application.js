const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPost',
    required: true,
  },
  coverLetter: { type: String },
  status: {
    type: String,
    enum: ['pending', 'shortlisted', 'rejected'],
    default: 'pending',
  },
  appliedAt: { type: Date, default: Date.now },
});

// Prevent the same user from applying to the same job twice: the pair
// (user, job) must be unique, even though each field alone repeats often
// (one user applies to many jobs; one job gets many applicants).
applicationSchema.index({ user: 1, job: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
