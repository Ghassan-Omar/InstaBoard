import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Users, Trash2, Eye, EyeOff, User } from 'lucide-react';
import './LikedUsers.css';

const LikedUsers = () => {
  const [likedUsers, setLikedUsers] = useState([]);
  const [showEmails, setShowEmails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Load liked users from localStorage
    const savedLikedUsers = localStorage.getItem('likedUsers');
    if (savedLikedUsers) {
      setLikedUsers(JSON.parse(savedLikedUsers));
    }
  }, []);

  const handleUnlike = (userToRemove) => {
    const updatedLikedUsers = likedUsers.filter(
      user => user.login.uuid !== userToRemove.login.uuid
    );
    setLikedUsers(updatedLikedUsers);
    localStorage.setItem('likedUsers', JSON.stringify(updatedLikedUsers));
  };

  const handleClearAll = () => {
    setLikedUsers([]);
    localStorage.setItem('likedUsers', JSON.stringify([]));
  };

  const toggleEmail = (userId) => {
    setShowEmails(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const handleUserClick = (user) => {
    navigate(`/team/${user.login.uuid}`, { state: { user } });
  };

  const formatName = (first, last) => {
    return `${first.charAt(0).toUpperCase() + first.slice(1)} ${last.charAt(0).toUpperCase() + last.slice(1)}`;
  };

  const getTitle = (gender) => {
    return gender === 'male' ? 'Mr' : gender === 'female' ? 'Miss' : 'Mx';
  };

  if (likedUsers.length === 0) {
    return (
      <div className="liked-users-container">
        <div className="liked-users-header">
          <div className="header-content">
            <Heart size={32} className="header-icon" />
            <div>
              <h2 className="section-title">Liked Users</h2>
              <p className="section-subtitle">Your favorite profiles will appear here</p>
            </div>
          </div>
        </div>

        <div className="empty-state">
          <Heart size={64} className="empty-icon" />
          <h3 className="empty-title">No Liked Users Yet</h3>
          <p className="empty-message">
            Start exploring profiles and like the ones you find interesting. 
            They'll appear here for easy access later.
          </p>
          <Link to="/team" className="explore-button">
            <Users size={20} />
            Explore Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="liked-users-container">
      <div className="liked-users-header">
        <div className="header-content">
          <Heart size={32} className="header-icon" />
          <div>
            <h2 className="section-title">Liked Users ({likedUsers.length})</h2>
            <p className="section-subtitle">Your favorite profiles</p>
          </div>
        </div>
        <div className="header-actions">
          <Link to="/team" className="explore-more-button">
            <Users size={20} />
            Explore More
          </Link>
          <button 
            onClick={handleClearAll} 
            className="clear-all-button"
            aria-label="Clear all liked users"
          >
            <Trash2 size={20} />
            Clear All
          </button>
        </div>
      </div>

      <div className="liked-users-grid">
        {likedUsers.map((user) => (
          <div key={user.login.uuid} className="liked-user-card">
            <div className="user-card-content" onClick={() => handleUserClick(user)}>
              <div className="user-avatar">
                <img
                  src={user.picture.large}
                  alt={`${user.name.first} ${user.name.last}`}
                  className="avatar-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="avatar-fallback" style={{ display: 'none' }}>
                  <User size={40} />
                </div>
              </div>
              
              <div className="user-info">
                <h3 className="user-name">
                  {getTitle(user.gender)} {formatName(user.name.first, user.name.last)}
                </h3>
                <div className="user-email">
                  {showEmails[user.login.uuid] ? (
                    <span className="email-visible">{user.email}</span>
                  ) : (
                    <span className="email-hidden">Email hidden</span>
                  )}
                </div>
                <div className="user-location">
                  <span className="location-text">
                    {user.location.city}, {user.location.country}
                  </span>
                </div>
              </div>
            </div>

            <div className="user-card-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEmail(user.login.uuid);
                }}
                className="email-toggle"
                aria-label={showEmails[user.login.uuid] ? "Hide email" : "Show email"}
              >
                {showEmails[user.login.uuid] ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnlike(user);
                }}
                className="unlike-button"
                aria-label="Unlike user"
              >
                <Heart size={16} className="filled" />
              </button>
            </div>

            <div className="card-overlay">
              <span className="click-hint">Click to view details</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedUsers;