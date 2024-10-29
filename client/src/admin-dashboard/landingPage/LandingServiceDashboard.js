import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const LandingServiceDashboard = () => {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceImage, setServiceImage] = useState('');
  const [editServiceId, setEditServiceId] = useState(null); // Track the service being edited

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        console.log("Fetched services:", response.data); // Debugging
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const addOrUpdateService = async () => {
    const newService = { name: serviceName, description: serviceDescription, image: serviceImage };
    try {
      if (editServiceId) {
        // Update existing service
        await axios.put(`http://localhost:5000/api/services/${editServiceId}`, newService);
        setServices(services.map(service => (service._id === editServiceId ? { ...service, ...newService } : service)));
        setEditServiceId(null); // Reset edit service id
      } else {
        // Add new service
        const response = await axios.post('http://localhost:5000/api/services', newService);
        setServices([...services, response.data]);
      }
      // Clear form fields after submission
      setServiceName('');
      setServiceDescription('');
      setServiceImage('');
    } catch (error) {
      console.error("Error adding/updating service:", error);
    }
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      setServices(services.filter(service => service._id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const editService = (service) => {
    setEditServiceId(service._id); // Set the ID of the service to be edited
    setServiceName(service.name);
    setServiceDescription(service.description);
    setServiceImage(service.image);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Services</h2>

      {/* Form Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">{editServiceId ? 'Edit Service' : 'Add New Service'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Service Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter service name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <input
              type="text"
                           className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter description"
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Image URL</label>
            <input
              type="text"
                           className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter image URL"
              value={serviceImage}
              onChange={(e) => setServiceImage(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={addOrUpdateService}
          className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
        >
          {editServiceId ? 'Update Service' : 'Add Service'}
        </button>
      </div>

      {/* Service List Section */}
      <h3 className="text-xl font-semibold mb-4">Existing Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <h4 className="text-lg font-semibold mb-2">{service.name}</h4>
            <p className="text-gray-600">{service.description}</p>
            <img src={service.image} alt={service.name} className="mt-2 rounded-md w-20 h-20 object-cover" />
            <div className="flex justify-between mt-4">
              <button onClick={() => editService(service)} className="text-blue-500 hover:underline flex items-center">
                <FaEdit className="mr-2"/> Edit
              </button>
              <button onClick={() => deleteService(service._id)} className="text-red-500 hover:underline flex items-center">
                <FaTrash  className="mr-2"/> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingServiceDashboard;
