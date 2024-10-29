import React from 'react';
import { AiOutlineDownload, AiFillStar } from 'react-icons/ai'; // Import the download and star icons

const ApplicationsList = ({ applications, markAsViewed, markedApplications }) => {
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
            <th className="py-2">Mark</th> {/* New header for marking */}
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
                    href={application.resume} // Ensure correct property is accessed
                    download={application.resume.split('/').pop()} // Filename for download
                    target="_blank" // Open the resume in a new tab
                    rel="noopener noreferrer" // Security improvement
                    className="flex items-center justify-center text-blue-500 underline hover:text-blue-700 transition duration-200 w-full h-full" // Added full width and height
                    aria-label={`Download resume for ${application.name}`} // Accessibility improvement
                  >
                    <span className="mr-2">
                      <AiOutlineDownload /> {/* Download icon */}
                    </span>
                    Download Resume
                  </a>
                </td>
                <td className="py-2 border">{new Date(application.appliedAt).toLocaleString()}</td>
                <td className="py-2 border">
                  <button 
                    onClick={() => markAsViewed(application._id)} 
                    className="text-yellow-500"
                    aria-label={`Mark ${application.name} as viewed`} // Accessibility improvement
                  >
                    {markedApplications.has(application._id) ? (
                      <AiFillStar className="text-xl" /> // Star icon if marked
                    ) : (
                      <span className="text-gray-400 text-xl">☆</span> // Empty star if not marked
                    )}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-4">No applications available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsList;
