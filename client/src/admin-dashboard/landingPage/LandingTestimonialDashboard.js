import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const LandingTestimonialDashboard = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [quote, setQuote] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [image, setImage] = useState('');
  const [editingTestimonialId, setEditingTestimonialId] = useState(null); // For editing

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/testimonials');
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  const addOrUpdateTestimonial = async () => {
    const newTestimonial = { quote, name, position, image };

    try {
      if (editingTestimonialId) {
        // Update existing testimonial
        const response = await axios.put(`http://localhost:5000/api/testimonials/${editingTestimonialId}`, newTestimonial);
        setTestimonials(
          testimonials.map((testimonial) =>
            testimonial._id === editingTestimonialId ? response.data : testimonial
          )
        );
        setEditingTestimonialId(null); // Clear editing state
      } else {
        // Add new testimonial
        const response = await axios.post('http://localhost:5000/api/testimonials', newTestimonial);
        setTestimonials([...testimonials, response.data]);
      }
      // Clear form fields after submission
      setQuote('');
      setName('');
      setPosition('');
      setImage('');
    } catch (error) {
      console.error(`Error ${editingTestimonialId ? "updating" : "adding"} testimonial:`, error);
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/testimonials/${id}`);
      setTestimonials(testimonials.filter((testimonial) => testimonial._id !== id));
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };
  

  const editTestimonial = (testimonial) => {
    setQuote(testimonial.quote);
    setName(testimonial.name);
    setPosition(testimonial.position);
    setImage(testimonial.image);
    setEditingTestimonialId(testimonial._id); // Set id for updating
  };

  return (
    <div className='container mx-auto p-6'>
      <h2 className="text-xl font-bold mb-4">Manage Testimonials</h2>

      {/* Form Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">{editingTestimonialId ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Quote</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter testimonial quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Position</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
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
          onClick={addOrUpdateTestimonial}
          className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
        >
          {editingTestimonialId ? 'Update Testimonial' : 'Add Testimonial'}
        </button>
      </div>

      {/* Testimonial List Section */}
      <h3 className="text-xl font-semibold mb-4">Existing Testimonials</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            <h4 className="text-lg font-semibold mb-2">{testimonial.name}</h4>
            <p className="text-gray-500">{testimonial.position}</p>
            {testimonial.image && (
              <img src={testimonial.image} alt={testimonial.name} className="mt-2 rounded-md w-20 h-20 object-cover" />
            )}
            <div className="flex justify-between mt-4">
              <button onClick={() => editTestimonial(testimonial)} className="text-blue-500 hover:underline flex items-center">
                <FaEdit className="mr-2" /> Edit
              </button>
              <button onClick={() => deleteTestimonial(testimonial._id)} className="text-red-500 hover:underline flex items-center">
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingTestimonialDashboard;
