import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import React icons for edit and delete

const LandingFeatureDashboard = () => {
  const [features, setFeatures] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [editingId, setEditingId] = useState(null); // Track feature being edited

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/features'); // Adjust the API endpoint
        setFeatures(response.data);
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };
    fetchFeatures();
  }, []);

  const addFeature = async () => {
    const newFeature = { title, description, image };
    try {
      const response = await axios.post('http://localhost:5000/api/features', newFeature);
      setFeatures([...features, response.data]);
      clearForm();
    } catch (error) {
      console.error("Error adding feature:", error);
    }
  };

  const editFeature = (feature) => {
    setTitle(feature.title);
    setDescription(feature.description);
    setImage(feature.image);
    setEditingId(feature._id); // Set the ID of the feature being edited
  };

  const updateFeature = async () => {
    const updatedFeature = { title, description, image };
    try {
      const response = await axios.put(`http://localhost:5000/api/features/${editingId}`, updatedFeature);
      setFeatures(features.map((feature) => (feature._id === editingId ? response.data : feature)));
      clearForm();
    } catch (error) {
      console.error("Error updating feature:", error);
    }
  };

  const deleteFeature = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/features/${id}`);
      setFeatures(features.filter((feature) => feature._id !== id));
    } catch (error) {
      console.error("Error deleting feature:", error);
    }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImage('');
    setEditingId(null); // Reset editing ID
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Manage Features</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">{editingId ? 'Edit Feature' : 'Add New Feature'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter feature title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter feature description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Image URL</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={editingId ? updateFeature : addFeature}
          className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
        >
          {editingId ? 'Update Feature' : 'Add Feature'}
        </button>
       
      </div>

      {/* Feature List Section */}
      <h3 className="text-xl font-semibold mb-4">Existing Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
            <p className="text-gray-600">{feature.description}</p>
            <img
              src={feature.image}
              alt={feature.title}
              className="mt-2 rounded-md w-20 h-20 object-cover"
            />
            <div className="mt-4 flex justify-between">
              <button onClick={() => editFeature(feature)} className="text-blue-500 hover:underline flex item-center">
                <FaEdit className="mr-2" /> Edit
              </button>
              <button onClick={() => deleteFeature(feature._id)} className="text-red-500 hover:underline flex item-center">
                <FaTrash className='mr-2'/> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingFeatureDashboard;
