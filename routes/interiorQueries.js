const express = require('express');
const router = express.Router();
const {
  createInteriorQuery,
  getAllInteriorQueries,
  updateInteriorQueryStatus,
  deleteInteriorQuery,
} = require('../controllers/interiorQueryController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/', createInteriorQuery);

// Admin routes
router.get('/', protect, getAllInteriorQueries);
router.put('/:id', protect, updateInteriorQueryStatus);
router.delete('/:id', protect, deleteInteriorQuery);

module.exports = router;
