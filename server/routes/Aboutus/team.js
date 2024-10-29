const express = require('express');
const router = express.Router();
const {
  getAllTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('../../controllers/Aboutus/teamController');

// @route GET /api/team
// @desc Get all team members
router.get('/', getAllTeamMembers);

// @route POST /api/team
// @desc Add a new team member
router.post('/', addTeamMember);

// @route PUT /api/team/:id
// @desc Update a team member
router.put('/:id', updateTeamMember);

// @route DELETE /api/team/:id
// @desc Delete a team member
router.delete('/:id', deleteTeamMember);

module.exports = router;
