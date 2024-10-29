import React, { useState } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const SendProfileShortlist = ({ applications, hrEmail, interviewDetails, loading }) => {
  const [sending] = useState(false);

  const sendProfileShortlist = async (application) => {
    const { email, name } = application;
    const { date, place, time, role, hrContact } = interviewDetails;

    if (!hrEmail) {
      toast.error('Please provide HR email address.');
      return;
    }

    if (!date || !place || !time) {
      toast.error('Please fill out all interview details.');
      return;
    }

    const interviewInfo = `
Interview Details

Date: ${date}

Place: ${place}

Role: ${role}

Time: ${time}

HR Contact: ${hrContact}

Please be prepared with the following:
- Updated resume
- Portfolio of your work (if applicable)
- Any questions you may have about the position or company

We look forward to meeting you!

Best Regards,
[Techworka]
`;

    try {
      await axios.post(
        'http://localhost:5000/api/send-profile',
        {
          to: hrEmail,
          interviewDetails: `Candidate Name: ${name}\nCandidate Email: ${email}\n\n${interviewInfo}`,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      toast.success(`Profile and interview details sent to ${name} successfully!`);
    } catch (error) {
      console.error('Error sending profile:', error);
      toast.error(`Failed to send profile for ${name}.`);
    }
  };

  return (
    <div className="mb-8 border mt-8 p-6 rounded-lg shadow-lg bg-white">
      <h2 className="text-3xl bg-purple-400 py-3 font-sans mt-4 text-center mb-4">Send Profile Shortlist</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Candidate Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id} className="text-center">
              <td className="py-2 border">{application.name}</td>
              <td className="py-2 border">{application.email}</td>
              <td className="py-2 border">
                <button
                  onClick={() => sendProfileShortlist(application)}
                  className={`bg-green-500 text-white px-3 py-1 rounded ${
                    sending || loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={sending || loading}
                >
                  {sending || loading ? 'Sending...' : 'Send Shortlist'} <FaPaperPlane className="inline-block ml-1" />
                </button>
              </td>
            </tr>
          ))}
          {applications.length === 0 && (
            <tr>
              <td colSpan="3" className="py-4">
                No applications available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ToastContainer position="top-right" autoClose={3000} /> {/* Add ToastContainer here */}
    </div>
  );
};

export default SendProfileShortlist;
