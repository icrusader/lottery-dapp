// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    marginRight: '1rem',
    textDecoration: 'none',
    color: location.pathname === path ? '#007BFF' : '#333',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    borderBottom: location.pathname === path ? '2px solid #007BFF' : 'none',
    paddingBottom: '4px',
    transition: 'all 0.2s ease-in-out'
  });

  return (
    <nav style={{
      marginBottom: '2rem',
      background: '#f5f5f5',
      padding: '1rem',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Link to="/" style={linkStyle('/')}>🏠 Home</Link>
      <Link to="/players" style={linkStyle('/players')}>👥 Players</Link>
      <Link to="/last-winner" style={linkStyle('/last-winner')}>🥇 Last Winner</Link>
    </nav>
  );
};

export default Navbar;

