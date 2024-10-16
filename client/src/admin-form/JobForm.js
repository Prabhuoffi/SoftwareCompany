import React from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const JobForm = ({ formData, handleChange, handleSubmit, editingJob, resetForm, loading }) => (
  <form onSubmit={handleSubmit} className="mb-8 border p-6 rounded-lg shadow-lg bg-white">
    <h2 className="text-2xl mb-4">{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
    <input
      type="text"
      name="title"
      placeholder="Job Title"
      className="w-full p-3 mb-4 border rounded"
      value={formData.title}
      onChange={handleChange}
      required
    />
    <textarea
      name="description"
      placeholder="Job Description"
      className="w-full p-3 mb-4 border rounded"
      value={formData.description}
      onChange={handleChange}
      required
    ></textarea>
    <input
      type="text"
      name="location"
      placeholder="Location"
      className="w-full p-3 mb-4 border rounded"
      value={formData.location}
      onChange={handleChange}
      required
    />
    <input
      type="text"
      name="experience"
      placeholder="Experience Required"
      className="w-full p-3 mb-4 border rounded"
      value={formData.experience}
      onChange={handleChange}
      required
    />
     <div className="flex justify-between items-center mt-4"> {/* Flex container for buttons */}
        <button type="submit" className="bg-purple-600 text-white p-3 rounded transition duration-300 hover:bg-purple-700">
          {loading ? 'Processing...' : (editingJob ? 'Update Job' : 'Add Job')}
          {editingJob ? <FaEdit className="ml-2" /> : <FaPlus className="ml-2" />}
        </button>
        {editingJob && (
          <button type="button" onClick={resetForm} className="bg-gray-400 text-white p-3 rounded transition duration-300 hover:bg-gray-500">
            <AiOutlineClose className="mr-2" /> Cancel
          </button>
        )}
      </div>
  
  </form>
);

export default JobForm;
