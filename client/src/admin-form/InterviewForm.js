import React from 'react';
import { FaUserCheck } from 'react-icons/fa';

const InterviewForm = ({ hrEmail, setHrEmail, interviewDetails, handleInterviewChange, sendProfileShortlist, applications }) => (
  <form className="mb-8 border p-6 rounded-lg shadow-lg bg-white">
    <h2 className="text-3xl bg-purple-600 py-3 text-white text-center mb-4">Interview Details</h2>
    
    <input
      type="email"
      name="hrEmail"
      placeholder="HR Email"
      className="w-full p-3 mb-4 border rounded"
      value={hrEmail}
      onChange={(e) => setHrEmail(e.target.value)}
      required
    />

    <input
      type="tel"  // Changed to 'tel' for contact number
      name="hrContact"
      placeholder="HR Contact Number"
      className="w-full p-3 mb-4 border rounded"
      value={interviewDetails.hrContact}
      onChange={handleInterviewChange}
      required
    />
    
    <input
      type="date"
      name="date"
      className="w-full p-3 mb-4 border rounded"
      value={interviewDetails.date}
      onChange={handleInterviewChange}
      required
    />
    
    <input
      type="text"
      name="place"
      placeholder="Interview Place"
      className="w-full p-3 mb-4 border rounded"
      value={interviewDetails.place}
      onChange={handleInterviewChange}
      required
    />
    
    <input
      type="text"
      name="role"  // Ensure unique name for the role input
      placeholder="Role"
      className="w-full p-3 mb-4 border rounded"
      value={interviewDetails.role}
      onChange={handleInterviewChange}
      required
    />
    
    <input
      type="time"
      name="time"
      className="w-full p-3 mb-4 border rounded"
      value={interviewDetails.time}
      onChange={handleInterviewChange}
      required
    />
    
    <button
      type="button"
      onClick={() => applications.forEach(sendProfileShortlist)}
      className="bg-green-600 text-white p-3 rounded flex items-center"
    >
      <FaUserCheck className="mr-2" /> Send Interview Details
    </button>
  </form>
);

export default InterviewForm;
