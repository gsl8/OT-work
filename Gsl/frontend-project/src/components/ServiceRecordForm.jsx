import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceRecordForm = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    RecordNumber: '',
    PlateNumber: '',
    ServiceCode: '',
    ServiceDate: ''
  });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get('/servicerecords');
      setRecords(res.data);
    } catch (err) {
      console.error('Error fetching records');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`/servicerecords/${formData.RecordNumber}`, formData);
        setMessage('Record updated successfully');
      } else {
        await axios.post('/servicerecords', formData);
        setMessage('Record added successfully');
      }
      fetchRecords();
      setFormData({
        RecordNumber: '',
        PlateNumber: '',
        ServiceCode: '',
        ServiceDate: ''
      });
      setEditing(false);
    } catch (err) {
      setMessage(err.response?.data?.message || err.response?.data?.error || 'Error saving record');
    }
  };

  const handleEdit = (record) => {
    setFormData(record);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/servicerecords/${id}`);
      fetchRecords();
      setMessage('Record deleted successfully');
    } catch (err) {
      setMessage('Error deleting record');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Service Records</h2>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
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
          <div>
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
          <div>
            <label className="block text-gray-700">Service Code</label>
            <input
              type="number"
              name="ServiceCode"
              value={formData.ServiceCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Service Date</label>
            <input
              type="date"
              name="ServiceDate"
              value={formData.ServiceDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          {editing ? 'Update' : 'Add'} Record
        </button>
        {editing && (
          <button type="button" onClick={() => { setEditing(false); setFormData({ RecordNumber: '', PlateNumber: '', ServiceCode: '', ServiceDate: '' }); }} className="mt-4 ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
            Cancel
          </button>
        )}
      </form>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Record Number</th>
            <th className="px-4 py-2">Plate Number</th>
            <th className="px-4 py-2">Service Code</th>
            <th className="px-4 py-2">Service Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.RecordNumber}>
              <td className="border px-4 py-2">{record.RecordNumber}</td>
              <td className="border px-4 py-2">{record.PlateNumber}</td>
              <td className="border px-4 py-2">{record.ServiceCode}</td>
              <td className="border px-4 py-2">{record.ServiceDate}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(record)} className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(record.RecordNumber)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceRecordForm;
