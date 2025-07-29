import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1 className="error-title">Page Not Found</h1>
          <p className="error-message">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="error-illustration">
            <Search size={64} className="search-icon" />
            <p className="illustration-text">We couldn't find what you're looking for</p>
          </div>

          <div className="error-actions">
            <Link to="/" className="action-button primary">
              <Home size={20} />
              Go Home
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="action-button secondary"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>

          <div className="helpful-links">
            <h3>Try these instead:</h3>
            <ul>
              <li><Link to="/">Home Page</Link></li>
              <li><Link to="/team">Browse Team</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/liked-users">Liked Users</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;