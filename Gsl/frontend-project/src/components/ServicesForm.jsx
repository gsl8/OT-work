import React, { useState } from 'react';
import axios from 'axios';

const ServicesForm = () => {
  const [formData, setFormData] = useState({
    ServiceName: '',
    ServicePrice: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/services', formData);
      setMessage('Service added successfully');
      setFormData({
        ServiceName: '',
        ServicePrice: ''
      });
    } catch (err) {
      setMessage('Error adding service');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Service</h2>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Service Name</label>
          <input
            type="text"
            name="ServiceName"
            value={formData.ServiceName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Service Price</label>
          <input
            type="number"
            name="ServicePrice"
            value={formData.ServicePrice}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Add Service
        </button>
      </form>
    </div>
  );
};

export default ServicesForm;
