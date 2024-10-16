import React from 'react';
import { AiOutlineDownload } from 'react-icons/ai'; // Import the download icon

const ApplicationsList = ({ applications }) => {
  return (
    <div>
      <h2 className="text-3xl bg-purple-400 py-3 font-sans text-center mb-4">Job Applications</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Position</th>
            <th className="py-2">Resume</th>
            <th className="py-2">Applied At</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((application) => (
              <tr key={application._id} className="text-center">
                <td className="py-2 border">{application.name}</td>
                <td className="py-2 border">{application.email}</td>
                <td className="py-2 border">{application.position}</td>
                <td className="py-2 border">
                  <a
                      href={`server/uploads/resume/${application.resume.split('/').pop()}`}// Relative path to resume
                    download={application.resume.split('/').pop()} // Filename for download
                    className="text-blue-500 underline flex items-center justify-center" // Added flex for alignment
                  >
                    <AiOutlineDownload className="mr-2" /> {/* Download icon */}
                    Download Resume
                  </a>


                </td>
                <td className="py-2 border">{new Date(application.appliedAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4">No applications available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsList;
