import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash } from 'react-icons/fi';

const PartnerPagedashboard = () => {
  const [partners, setPartners] = useState([]);
  const [partnerForm, setPartnerForm] = useState({
    id: null,
    name: '',
    logo: '',
    website: '',
    description: '',
    testimonial: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all partners
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/partners');
        setPartners(response.data);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };
    fetchPartners();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartnerForm({ ...partnerForm, [name]: value });
  };

  // Add or update partner
  const addOrUpdatePartner = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/partners', partnerForm);
      if (isEditing) {
        setPartners(partners.map((partner) => (partner._id === partnerForm.id ? response.data : partner)));
        setIsEditing(false);
      } else {
        setPartners([...partners, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving partner:', error);
    }
  };

  // Delete a partner
  const deletePartner = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/partners/${id}`);
      setPartners(partners.filter((partner) => partner._id !== id));
    } catch (error) {
      console.error('Error deleting partner:', error);
    }
  };

  // Set up form for editing an existing partner
  const handleEditClick = (partner) => {
    setPartnerForm({
      id: partner._id,
      name: partner.name,
      logo: partner.logo,
      website: partner.website,
      description: partner.description,
      testimonial: partner.testimonial,
    });
    setIsEditing(true);
  };

  // Reset form
  const resetForm = () => {
    setPartnerForm({ id: null, name: '', logo: '', website: '', description: '', testimonial: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Partner Management</h1>

      {/* Add/Edit Form */}
      <div className="mb-8">
        <h2 className="text-2xl mb-4">{isEditing ? 'Edit Partner' : 'Add New Partner'}</h2>
        <form onSubmit={addOrUpdatePartner}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={partnerForm.name}
            onChange={handleInputChange}
            className="border mb-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="text"
            name="logo"
            placeholder="Logo URL"
            value={partnerForm.logo}
            onChange={handleInputChange}
            className="border mb-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="text"
            name="website"
            placeholder="Website URL"
            value={partnerForm.website}
            onChange={handleInputChange}
            className="border mb-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={partnerForm.description}
            onChange={handleInputChange}
            className="border mb-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <textarea
            name="testimonial"
            placeholder="Testimonial"
            value={partnerForm.testimonial}
            onChange={handleInputChange}
            className="border mb-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
            {isEditing ? 'Update Partner' : 'Add Partner'}
          </button>
        </form>
      </div>

      {/* Partners List */}
      <div className="space-y-4">
        {partners.map((partner) => (
          <div key={partner._id} className="p-4 border rounded-lg shadow-sm bg-white">
            <h3 className="text-xl font-semibold">{partner.name}</h3>
            <img src={partner.logo} alt={`${partner.name} logo`} className="w-32 h-32 object-cover" />
            <p className="text-gray-700">{partner.description}</p>
            <p className="text-gray-600 italic">{partner.testimonial}</p>
            <a href={partner.website} className="text-purple-500 underline" target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
            <div className="flex justify-end space-x-4 mt-2">
              <button
                onClick={() => handleEditClick(partner)}
                className="text-blue-500 hover:text-blue-600"
              >
                <FiEdit />
                <span>Edit</span>
              </button>
              <button
                onClick={() => deletePartner(partner._id)}
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

export default PartnerPagedashboard;
