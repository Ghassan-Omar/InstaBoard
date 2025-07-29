import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { Github } from 'lucide-react';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-container">
          <div className="logo-section">
            <a 
              href="https://github.com/Ghassan-Omar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-link"
              aria-label="Visit Ghassan Omar's GitHub profile"
            >
              <Github size={32} className="logo-icon" />
            </a>
            <h1 className="app-title">InstaBoard</h1>
          </div>
          <p className="app-subtitle">Discover amazing people from around the world</p>
        </div>
        <Navigation />
      </header>
      
      <main className="layout-main">
        <Outlet />
      </main>
      
      <footer className="layout-footer">
        <p>&copy; 2025 InstaBoard. Built with React & React Router by <a href="https://github.com/Ghassan-Omar" target="_blank" rel="noopener noreferrer" className="footer-github-link">Ghassan Omar</a>.</p>
      </footer>
    </div>
  );
};

export default Layout;