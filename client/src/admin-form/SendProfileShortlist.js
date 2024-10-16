// SendProfileShortlist.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';

const SendProfileShortlist = ({ applications, hrEmail, interviewDetails, loading, setNotification }) => {
  const [sending, setSending] = useState(false);

  const sendProfileShortlist = async (application) => {
    const { email, name } = application; // Assuming application has 'email' and 'name'
    const { date, place, time } = interviewDetails;

    if (!hrEmail) {
      alert('Please provide HR email address.');
      return;
    }

    if (!date || !place || !time) {
      alert('Please fill out all interview details.');
      return;
    }

    const interviewInfo = `Date: ${date}\nPlace: ${place}\nTime: ${time}`;

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
      setNotification('Profile and interview details sent to Candidate successfully!');
    } catch (error) {
      console.error('Error sending profile:', error);
      setNotification('Failed to send profile.');
    }
  };

  const handleSendAll = async () => {
    if (!hrEmail) {
      alert('Please provide HR email address.');
      return;
    }

    if (!interviewDetails.date || !interviewDetails.place || !interviewDetails.time) {
      alert('Please fill out all interview details.');
      return;
    }

    setSending(true);
    try {
      for (const application of applications) {
        await sendProfileShortlist(application);
      }
      setNotification('All profiles sent to HR successfully!');
    } catch (error) {
      // Error handling is already done in sendProfileShortlist
    } finally {
      setSending(false);
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
      {applications.length > 0 && (
        <button
          onClick={handleSendAll}
          className={`mt-4 bg-blue-600 text-white p-3 rounded flex items-center ${
            sending || loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={sending || loading}
        >
          {sending || loading ? 'Sending All...' : 'Send All Shortlists'} <FaPaperPlane className="ml-2" />
        </button>
      )}
    </div>
  );
};

export default SendProfileShortlist;
