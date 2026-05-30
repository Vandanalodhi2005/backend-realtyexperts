const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getAllApplications,
  getApplicationsByPosition,
  updateApplicationStatus,
  deleteApplication,
} = require('../controllers/candidateController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/', submitApplication);

// Admin routes
router.get('/', protect, getAllApplications);
router.get('/position/:position', protect, getApplicationsByPosition);
router.put('/:id', protect, updateApplicationStatus);
router.delete('/:id', protect, deleteApplication);

module.exports = router;
