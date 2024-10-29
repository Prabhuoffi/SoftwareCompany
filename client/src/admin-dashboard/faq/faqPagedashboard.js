import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash } from 'react-icons/fi';

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [editFaqId, setEditFaqId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch FAQs
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/faqs');
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };
    fetchFaqs();
  }, []);

  // Handle form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFaq({ ...newFaq, [name]: value });
  };

  // Create FAQ
  const createFaq = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/faqs', newFaq);
      setFaqs([...faqs, response.data]);
      setNewFaq({ question: '', answer: '' });
    } catch (error) {
      console.error('Error creating FAQ:', error);
    }
  };

  // Update FAQ
  const updateFaq = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/faqs/${editFaqId}`, newFaq);
      setFaqs(faqs.map((faq) => (faq._id === editFaqId ? response.data : faq)));
      setNewFaq({ question: '', answer: '' });
      setIsEditing(false);
      setEditFaqId(null);
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };

  // Delete FAQ
  const deleteFaq = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/faqs/${id}`);
      setFaqs(faqs.filter((faq) => faq._id !== id));
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  // Set FAQ to be edited
  const handleEditClick = (faq) => {
    setIsEditing(true);
    setEditFaqId(faq._id);
    setNewFaq(faq);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">FAQ Management</h1>

      {/* FAQ Form */}
      <div className="mb-8">
        <h2 className="text-2xl mb-4">{isEditing ? 'Edit FAQ' : 'Create a New FAQ'}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isEditing ? updateFaq() : createFaq();
          }}
        >
          <input
            type="text"
            name="question"
            placeholder="Question"
            value={newFaq.question}
            onChange={handleInputChange}
            className="border mb-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <textarea
            name="answer"
            placeholder="Answer"
            value={newFaq.answer}
            onChange={handleInputChange}
            className="border mb-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          ></textarea>
          <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
            {isEditing ? 'Update FAQ' : 'Create FAQ'}
          </button>
        </form>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq._id} className="p-4 border rounded-lg shadow-sm bg-white">
            <h3 className="text-xl font-semibold">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
            <div className="flex justify-end space-x-4 mt-2">
              <button onClick={() => handleEditClick(faq)} className="text-blue-500 hover:text-blue-600">
                <FiEdit />
                <span>Edit</span>
              </button>
              <button onClick={() => deleteFaq(faq._id)} className="text-red-500 hover:text-red-600">
                <FiTrash />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
