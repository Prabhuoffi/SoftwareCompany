import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Import the Logout icon
import JobForm from '../admin-form/JobForm';
import InterviewForm from '../admin-form/InterviewForm';
import JobList from '../admin-form/JobList';
import ApplicationsList from './ApplicationsList'; 
import SendProfileShortlist from '../admin-form/SendProfileShortlist'; 

const HRDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    experience: '',
  });
  const [editingJob, setEditingJob] = useState(null);
  const [interviewDetails, setInterviewDetails] = useState({
    date: '',
    place: '',
    time: '',
  });

  const [markedApplications, setMarkedApplications] = useState(new Set());

  const toggleMarkApplication = (id) => {
    setMarkedApplications((prevMarked) => {
      const newMarked = new Set(prevMarked);
      if (newMarked.has(id)) {
        newMarked.delete(id); // Remove mark if already marked
      } else {
        newMarked.add(id); // Add mark if not marked
      }
      return newMarked;
    });
  };

  const [hrEmail, setHrEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/jobs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setNotification('Failed to fetch jobs.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/applications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchJobs();
      fetchApplications();
    }
  }, [token, navigate, fetchJobs, fetchApplications]);

  const resetForm = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      description: '',
      location: '',
      experience: '',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInterviewChange = (e) => {
    setInterviewDetails({ ...interviewDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingJob) {
        // Admin can edit any job
        await axios.put(`http://localhost:5000/api/jobs/${editingJob._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotification('Job updated successfully!');
      } else {
        if (userRole === 'admin') {
          await axios.post('http://localhost:5000/api/jobs', formData, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setNotification('Job created successfully!');
        } else {
          setNotification('You do not have permission to create jobs.');
        }
      }
      resetForm();
      fetchJobs();
    } catch (error) {
      console.error('Error saving job:', error);
      setNotification('Failed to save job.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job) => {
    // Admin can edit any job
    setEditingJob(job);
    setFormData({
      title: job.title,
      description: job.description,
      location: job.location,
      experience: job.experience,
    });
  };

  const handleDelete = async (id) => {
    if (userRole === 'admin' && window.confirm('Are you sure you want to delete this job?')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotification('Job deleted successfully!');
        fetchJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
        setNotification('Failed to delete job.');
      } finally {
        setLoading(false);
      }
    } else if (userRole !== 'admin') {
      setNotification('You do not have permission to delete jobs.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl w-full font-bold text-white bg-purple-600 text-center py-4 mb-6 shadow-md">
        Welcome To Dashboard
      </h1>
      
      {/* Logout Button */}
      <button 
        className="flex items-center mb-4 text-white bg-red-500 hover:bg-red-600 rounded p-2"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="mr-2" />
        Logout
      </button>

      {notification && <div className="bg-yellow-300 p-4 mb-4 rounded">{notification}</div>}

      {/* Job Form - Only visible for admin */}
     
        <JobForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingJob={editingJob}
          resetForm={resetForm}
          loading={loading}
        />
       
      {/* Interview Details Form */}
      <InterviewForm
        CandidateEmail={hrEmail}
        setHrEmail={setHrEmail}
        interviewDetails={interviewDetails}
        handleInterviewChange={handleInterviewChange}
        applications={applications}
      />

      {/* Job Listings */}
      <JobList jobs={jobs} handleEdit={handleEdit} handleDelete={handleDelete} loading={loading} />

      {/* Applications List */}
      <div className="mb-8 border mt-8 p-6 rounded-lg shadow-lg bg-white">
        <ApplicationsList 
          applications={applications} 
          markAsViewed={toggleMarkApplication} // Pass the marking function
          markedApplications={markedApplications} // Pass the marked applications state
        />
      </div>

      {/* Send Profile Shortlist */}
      <SendProfileShortlist
        applications={applications}
        hrEmail={hrEmail}
        interviewDetails={interviewDetails}
        loading={loading}
        setNotification={setNotification}
      />
    </div>
  );
};

export default HRDashboard;
