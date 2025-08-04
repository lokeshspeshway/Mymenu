import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import OwnerDashboard from './pages/OwnerDashboard';
import PublicMenu from './pages/PublicMenu';
import CreateOwnerForm from './pages/CreateOwnerForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/CreateOwnerForm" element={<CreateOwnerForm />} />
        <Route path="/dashboard" element={<OwnerDashboard />} />
        <Route path="/menu/:ownerId" element={<PublicMenu />} />
      </Routes>
    </Router>
  );
}

export default App;