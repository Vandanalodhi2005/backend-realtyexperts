const express = require('express');
const router = express.Router();
const {
  createJobPosting,
  getAllJobPostings,
  getActiveJobPostings,
  getJobPostingById,
  updateJobPosting,
  deleteJobPosting,
} = require('../controllers/jobPostingController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/active', getActiveJobPostings);
router.get('/:id', getJobPostingById);

// Admin routes
router.post('/', protect, createJobPosting);
router.get('/', protect, getAllJobPostings);
router.put('/:id', protect, updateJobPosting);
router.delete('/:id', protect, deleteJobPosting);

module.exports = router;
