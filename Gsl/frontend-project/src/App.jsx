import React, { useState } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Navbar from './components/Navbar';
import CarForm from './components/CarForm';
import ServicesForm from './components/ServicesForm';
import ServiceRecordForm from './components/ServiceRecordForm';
import PaymentForm from './components/PaymentForm';
import Reports from './components/Reports';

axios.defaults.withCredentials = true;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('car');

  const handleLogin = () => setLoggedIn(true);
  const handleLogout = () => {
    axios.post('/auth/logout').then(() => setLoggedIn(false));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'car':
        return <CarForm />;
      case 'services':
        return <ServicesForm />;
      case 'servicerecord':
        return <ServiceRecordForm />;
      case 'payment':
        return <PaymentForm />;
      case 'reports':
        return <Reports />;
      default:
        return <CarForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <Navbar onPageChange={setCurrentPage} onLogout={handleLogout} />
          <div className="container mx-auto p-4">
            {renderPage()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
