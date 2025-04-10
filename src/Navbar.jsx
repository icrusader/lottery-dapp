// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    marginRight: '1.5rem', // Increased margin for more spacing
    textDecoration: 'none',
    color: location.pathname === path ? '#007BFF' : '#333',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    borderBottom: location.pathname === path ? '2px solid #007BFF' : 'none',
    paddingBottom: '6px', // Increased padding for bottom border
    fontSize: '1.2rem', // Increased font size
    transition: 'all 0.2s ease-in-out'
  });

  return (
    <nav style={{
      marginBottom: '3rem', // Increased margin bottom for extra space
      background: '#f5f5f5',
      padding: '1.5rem', // Increased padding for bigger navbar
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', // Centering the items vertically
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // Increased shadow for a more prominent look
      height: '70px', // You can adjust this if needed for more height
    }}>
      <Link to="/" style={linkStyle('/')}>🏠 Home</Link>
      <Link to="/players" style={linkStyle('/players')}>👥 Players</Link>
      <Link to="/last-winner" style={linkStyle('/last-winner')}>🥇 Last Winner</Link>
    </nav>
  );
};

export default Navbar;

