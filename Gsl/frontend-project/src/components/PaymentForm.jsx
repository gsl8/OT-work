import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    RecordNumber: '',
    AmountPaid: '',
    PaymentDate: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/payments', formData);
      setMessage('Payment added successfully');
      setFormData({
        RecordNumber: '',
        AmountPaid: '',
        PaymentDate: ''
      });
    } catch (err) {
      setMessage('Error adding payment');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Payment</h2>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Record Number</label>
          <input
            type="number"
            name="RecordNumber"
            value={formData.RecordNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount Paid</label>
          <input
            type="number"
            name="AmountPaid"
            value={formData.AmountPaid}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Payment Date</label>
          <input
            type="date"
            name="PaymentDate"
            value={formData.PaymentDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Add Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
