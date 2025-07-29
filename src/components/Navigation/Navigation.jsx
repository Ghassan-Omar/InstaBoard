import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Info, Users, Heart } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
            >
              <Home size={20} />
              <span>Home</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/about" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Info size={20} />
              <span>About</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/team" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Users size={20} />
              <span>Team</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/liked-users" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Heart size={20} />
              <span>Liked Users</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
