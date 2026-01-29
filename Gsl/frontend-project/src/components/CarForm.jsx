import React, { useState } from 'react';
import axios from 'axios';

const CarForm = () => {
  const [formData, setFormData] = useState({
    PlateNumber: '',
    type: '',
    Model: '',
    ManufacturingYear: '',
    DriverPhone: '',
    MechanicName: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/cars', formData);
      setMessage('Car added successfully');
      setFormData({
        PlateNumber: '',
        type: '',
        Model: '',
        ManufacturingYear: '',
        DriverPhone: '',
        MechanicName: ''
      });
    } catch (err) {
      setMessage('Error adding car');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Car</h2>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Plate Number</label>
          <input
            type="text"
            name="PlateNumber"
            value={formData.PlateNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Model</label>
          <input
            type="text"
            name="Model"
            value={formData.Model}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Manufacturing Year</label>
          <input
            type="number"
            name="ManufacturingYear"
            value={formData.ManufacturingYear}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Driver Phone</label>
          <input
            type="text"
            name="DriverPhone"
            value={formData.DriverPhone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mechanic Name</label>
          <input
            type="text"
            name="MechanicName"
            value={formData.MechanicName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Add Car
        </button>
      </form>
    </div>
  );
};

export default CarForm;
