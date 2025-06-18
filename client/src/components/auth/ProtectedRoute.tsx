import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';

import { RootState, AppDispatch } from '../../redux/store';
import { getCurrentUser } from '../../redux/slices/authSlice';

const ProtectedRoute: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading, token, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated && token && !user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated, token, user]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
