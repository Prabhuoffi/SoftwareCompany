import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash } from 'react-icons/fi';

const AboutPagedashboard = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', position: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editMemberId, setEditMemberId] = useState(null);

  // Fetch all team members
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/team');
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };
    fetchTeamMembers();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  // Add new team member
  const addTeamMember = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/team', newMember);
      setTeamMembers([...teamMembers, response.data]);
      setNewMember({ name: '', position: '', image: '' });
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  // Update team member
  const updateTeamMember = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/team/${editMemberId}`, newMember);
      setTeamMembers(
        teamMembers.map((member) => (member._id === editMemberId ? response.data : member))
      );
      setIsEditing(false);
      setNewMember({ name: '', position: '', image: '' });
      setEditMemberId(null);
    } catch (error) {
      console.error('Error updating team member:', error);
    }
  };

  // Delete team member
  const deleteTeamMember = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/team/${id}`);
      setTeamMembers(teamMembers.filter((member) => member._id !== id));
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  // Handle edit click
  const handleEditClick = (member) => {
    setIsEditing(true);
    setEditMemberId(member._id);
    setNewMember(member);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Team Management</h1>

      {/* Add/Edit Form */}
      <div className="mb-8">
        <h2 className="text-2xl mb-4">{isEditing ? 'Edit Team Member' : 'Add New Team Member'}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isEditing ? updateTeamMember() : addTeamMember();
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newMember.name}
            onChange={handleInputChange}
            className="border mb-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={newMember.position}
            onChange={handleInputChange}
            className="border mb-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newMember.image}
            onChange={handleInputChange}
            className="border mb-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
          >
            {isEditing ? 'Update Member' : 'Add Member'}
          </button>
        </form>
      </div>

      {/* Team Members List */}
      <div className="space-y-4">
        {teamMembers.map((member) => (
          <div key={member._id} className="p-4 border rounded-lg shadow-sm bg-white">
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-700">{member.position}</p>
            <img src={member.image} alt={member.name} className="mt-2 rounded-md w-20 h-20 object-cover" />
            <div className="flex justify-end space-x-4 mt-2">
              <button
                onClick={() => handleEditClick(member)}
                className="text-blue-500 hover:text-blue-600"
              >
                <FiEdit />
                <span>Edit</span>
              </button>
              <button
                onClick={() => deleteTeamMember(member._id)}
                className="text-red-500 hover:text-red-600"
              >
                <FiTrash />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPagedashboard;
