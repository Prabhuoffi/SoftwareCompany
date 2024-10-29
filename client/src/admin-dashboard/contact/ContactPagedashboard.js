import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ContactPagedashboard = () => {
  const [contactInfo, setContactInfo] = useState([]);
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [editingContactId, setEditingContactId] = useState(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contact-info');
        if (Array.isArray(response.data)) {
          setContactInfo(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching contact information:", error);
      }
    };
    fetchContactInfo();
  }, []);

  const addOrUpdateContactInfo = async () => {
    const newContact = { phone, location, email };

    try {
      if (editingContactId) {
        // Update existing contact info
        const response = await axios.put(`http://localhost:5000/api/contact-info/${editingContactId}`, newContact);
        // Update local state optimistically
        setContactInfo(contactInfo.map((contact) => 
          contact._id === editingContactId ? response.data : contact
        ));
        setEditingContactId(null); // Clear editing state
      } else {
        // Add new contact info
        const response = await axios.post('http://localhost:5000/api/contact-info', newContact);
        setContactInfo([...contactInfo, response.data]); // Add to state
      }
      // Clear form fields after submission
      setPhone('');
      setLocation('');
      setEmail('');
    } catch (error) {
      console.error(`Error ${editingContactId ? "updating" : "adding"} contact info:`, error);
    }
  };

  const deleteContactInfo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contact-info/${id}`);
      setContactInfo(contactInfo.filter((contact) => contact._id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting contact info:", error);
    }
  };

  const editContactInfo = (contact) => {
    setPhone(contact.phone);
    setLocation(contact.location);
    setEmail(contact.email);
    setEditingContactId(contact._id);
  };

  return (
    <div className='container mx-auto p-6'>
      <h2 className="text-xl font-bold mb-4">Manage Contact Information</h2>

      {/* Form Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">{editingContactId ? 'Edit Contact Info' : 'Add New Contact Info'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Phone</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Location</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={addOrUpdateContactInfo}
          className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
        >
          {editingContactId ? 'Update Contact Info' : 'Add Contact Info'}
        </button>
      </div>

      {/* Contact Info List Section */}
      <h3 className="text-xl font-semibold mb-4">Existing Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contactInfo.map((contact) => (
          <div
            key={contact._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <p className="text-gray-600">Phone: {contact.phone}</p>
            <p className="text-gray-600">Location: {contact.location}</p>
            <p className="text-gray-600">Email: {contact.email}</p>
            <div className="flex justify-between mt-4">
              <button onClick={() => editContactInfo(contact)} className="text-blue-500 hover:underline flex items-center">
                <FaEdit className="mr-2" /> Edit
              </button>
              <button onClick={() => deleteContactInfo(contact._id)} className="text-red-500 hover:underline flex items-center">
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactPagedashboard;
