import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <Link to="/dashboard" style={styles.link}>Dashboard</Link>
      <Link to="/login" style={styles.link}>Login</Link>
      <Link to="/register" style={styles.link}>Register</Link>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
    backgroundColor: '#333',
    color: '#fff',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default Navbar;
