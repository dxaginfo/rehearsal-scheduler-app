import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layout components
import Layout from './components/layout/Layout';

// Auth components
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Main app components
import Dashboard from './pages/Dashboard';
import Bands from './pages/bands/Bands';
import BandDetail from './pages/bands/BandDetail';
import Rehearsals from './pages/rehearsals/Rehearsals';
import RehearsalDetail from './pages/rehearsals/RehearsalDetail';
import Calendar from './pages/calendar/Calendar';
import Profile from './pages/profile/Profile';

// Utils
import ProtectedRoute from './components/auth/ProtectedRoute';
import { RootState } from './redux/store';

const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bands" element={<Bands />} />
          <Route path="/bands/:bandId" element={<BandDetail />} />
          <Route path="/rehearsals" element={<Rehearsals />} />
          <Route path="/rehearsals/:rehearsalId" element={<RehearsalDetail />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Redirect root to dashboard if authenticated, otherwise to login */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      
      {/* Catch all route - 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
