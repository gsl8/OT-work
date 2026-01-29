import React from 'react';

const Navbar = ({ onPageChange, onLogout }) => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">CRPMS</h1>
        <ul className="flex space-x-4">
          <li>
            <button onClick={() => onPageChange('car')} className="text-white hover:text-gray-200">
              Car
            </button>
          </li>
          <li>
            <button onClick={() => onPageChange('services')} className="text-white hover:text-gray-200">
              Services
            </button>
          </li>
          <li>
            <button onClick={() => onPageChange('servicerecord')} className="text-white hover:text-gray-200">
              ServiceRecord
            </button>
          </li>
          <li>
            <button onClick={() => onPageChange('payment')} className="text-white hover:text-gray-200">
              Payment
            </button>
          </li>
          <li>
            <button onClick={() => onPageChange('reports')} className="text-white hover:text-gray-200">
              Reports
            </button>
          </li>
          <li>
            <button onClick={onLogout} className="text-white hover:text-gray-200">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
