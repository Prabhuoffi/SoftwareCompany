import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const JobList = ({ jobs, handleEdit, handleDelete, loading }) => (
  <div className='mb-8 border p-6 rounded-lg shadow-lg bg-white'>
    <h2 className="text-3xl bg-purple-400 py-3 font-sans text-center mb-4">Job Listings</h2>
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Title</th>
          <th className="py-2">Location</th>
          <th className="py-2">Experience</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map(job => (
          <tr key={job._id} className="text-center">
            <td className="py-2 border">{job.title}</td>
            <td className="py-2 border">{job.location}</td>
            <td className="py-2 border">{job.experience}</td>
            <td className="py-2 border">
              <button onClick={() => handleEdit(job)} className="bg-blue-500 text-white p-2 rounded mr-2">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(job._id)} className="bg-red-500 text-white p-2 rounded">
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
        {jobs.length === 0 && (
          <tr>
            <td colSpan="4" className="py-4">No jobs available.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default JobList;
