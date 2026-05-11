const express = require('express');
const { getAllTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } = require('../controllers/teamMemberController');
const { verifyAdminToken } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

const router = express.Router();

// Public route
router.get('/', getAllTeamMembers);

// Admin only routes
router.post('/', verifyAdminToken, upload.single('image'), createTeamMember);
router.put('/:id', verifyAdminToken, upload.single('image'), updateTeamMember);
router.delete('/:id', verifyAdminToken, deleteTeamMember);

module.exports = router;
