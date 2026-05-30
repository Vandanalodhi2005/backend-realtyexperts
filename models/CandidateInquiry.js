const mongoose = require('mongoose');

const candidateInquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      enum: [
        'Sales Executive',
        'Team Leader',
        'Graphic Designer Intern (Male)',
        'Video Editor Intern (Male)',
        'Content Writer Intern',
        'Other'
      ],
      required: true,
    },
    experience: {
      type: Number,
      required: true,
      default: 0,
    },
    location: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    resume: {
      url: String,
      publicId: String,
    },
    status: {
      type: String,
      enum: ['applied', 'reviewed', 'shortlisted', 'rejected', 'hired'],
      default: 'applied',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CandidateInquiry', candidateInquirySchema);
