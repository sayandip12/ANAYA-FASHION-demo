import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CollectionsPage from './pages/CollectionsPage';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Occasions from './pages/Occasions';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Placeholder for other routes
const Placeholder = ({ title }) => (
  <div style={{ padding: '120px 20px', textAlign: 'center', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem' }}>{title}</h1>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Navigate to="/" replace />} />
        <Route path="/women" element={<CollectionsPage genderFilter="Women" />} />
        <Route path="/men" element={<CollectionsPage genderFilter="Men" />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/occasions" element={<Occasions />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
