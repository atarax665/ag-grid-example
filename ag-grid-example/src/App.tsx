import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import CasesGrid from './components/CasesGrid';
import { getCases } from './services/caseService';

// Placeholder components for other routes
const Dashboard = () => (
  <Box sx={{ p: 3 }}>
    <h1>Dashboard</h1>
    <p>Welcome to the dashboard!</p>
  </Box>
);

const Analytics = () => (
  <Box sx={{ p: 3 }}>
    <h1>Analytics</h1>
    <p>Analytics page content will go here.</p>
  </Box>
);

function App() {
  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cases" element={<CasesGrid cases={getCases()} />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
