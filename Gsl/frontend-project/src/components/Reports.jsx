import React, { useState } from 'react';
import axios from 'axios';

const Reports = () => {
  const [date, setDate] = useState('');
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/reports/${date}`);
      setReports(res.data);
      setMessage('');
    } catch (err) {
      setMessage('No reports found for this date');
      setReports([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Daily Reports</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Generate Report
        </button>
      </form>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      {reports.length > 0 && (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Record Number</th>
              <th className="px-4 py-2">Plate Number</th>
              <th className="px-4 py-2">Service Name</th>
              <th className="px-4 py-2">Service Price</th>
              <th className="px-4 py-2">Amount Paid</th>
              <th className="px-4 py-2">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{report.RecordNumber}</td>
                <td className="border px-4 py-2">{report.PlateNumber}</td>
                <td className="border px-4 py-2">{report.ServiceName}</td>
                <td className="border px-4 py-2">{report.ServicePrice}</td>
                <td className="border px-4 py-2">{report.AmountPaid || 'N/A'}</td>
                <td className="border px-4 py-2">{report.PaymentDate || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reports;
