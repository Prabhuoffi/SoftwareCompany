const TeamMember = require('../../models/Aboutus/TeamMember');

// Get all team members
const getAllTeamMembers = async (req, res) => {
  try {
    const team = await TeamMember.find();
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new team member
const addTeamMember = async (req, res) => {
  const { name, position, image } = req.body;
  const newMember = new TeamMember({ name, position, image });
  try {
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a team member
const updateTeamMember = async (req, res) => {
  const { id } = req.params;
  const { name, position, image } = req.body;

  try {
    const updatedMember = await TeamMember.findByIdAndUpdate(
      id,
      { name, position, image },
      { new: true }
    );
    if (!updatedMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a team member
const deleteTeamMember = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMember = await TeamMember.findByIdAndDelete(id);
    if (!deletedMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json({ message: 'Team member deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember };
