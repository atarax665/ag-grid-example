import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'rgb(26, 35, 126)',
        '& .MuiButton-root': {
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
        '& .MuiButton-root.Mui-selected': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box
          component="img"
          src="/logo.png"
          alt="Logo"
          sx={{
            height: 40,
            width: 40,
            mr: 3,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        />

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
          <Button
            color={isActive('/') ? 'primary' : 'inherit'}
            onClick={() => navigate('/')}
            sx={{
              color: isActive('/') ? 'white' : 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                color: 'white',
              }
            }}
          >
            Dashboard
          </Button>
          <Button
            color={isActive('/cases') ? 'primary' : 'inherit'}
            onClick={() => navigate('/cases')}
            sx={{
              color: isActive('/cases') ? 'white' : 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                color: 'white',
              }
            }}
          >
            Cases
          </Button>
          <Button
            color={isActive('/analytics') ? 'primary' : 'inherit'}
            onClick={() => navigate('/analytics')}
            sx={{
              color: isActive('/analytics') ? 'white' : 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                color: 'white',
              }
            }}
          >
            Analytics
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 