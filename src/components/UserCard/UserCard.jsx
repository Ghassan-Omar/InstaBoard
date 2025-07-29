import React, { useState } from 'react';
import { Eye, EyeOff, Heart, User } from 'lucide-react';
import './UserCard.css';

const UserCard = ({ user, onLike, onUserClick, isLiked, likeCount }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [imageError, setImageError] = useState(false);

  const toggleEmail = (e) => {
    e.stopPropagation(); // Prevent triggering onUserClick
    setShowEmail(!showEmail);
  };

  const handleLike = (e) => {
    e.stopPropagation(); // Prevent triggering onUserClick
    onLike();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const formatName = (first, last) => {
    return `${first.charAt(0).toUpperCase() + first.slice(1)} ${last.charAt(0).toUpperCase() + last.slice(1)}`;
  };

  const getTitle = (gender) => {
    return gender === 'male' ? 'Mr' : gender === 'female' ? 'Miss' : 'Mx';
  };

  return (
    <div className="user-card" onClick={onUserClick}>
      <div className="user-card-header">
        <div className="user-avatar">
          {imageError ? (
            <div className="avatar-fallback">
              <User size={40} />
            </div>
          ) : (
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              className="avatar-image"
              onError={handleImageError}
            />
          )}
        </div>
        <div className="user-info">
          <h3 className="user-name">
            {getTitle(user.gender)} {formatName(user.name.first, user.name.last)}
          </h3>
          <div className="user-email">
            {showEmail ? (
              <span className="email-visible">{user.email}</span>
            ) : (
              <span className="email-hidden">Email hidden</span>
            )}
          </div>
        </div>
        <button
          onClick={toggleEmail}
          className="email-toggle"
          aria-label={showEmail ? "Hide email" : "Show email"}
        >
          {showEmail ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div className="user-card-footer">
        <button
          onClick={handleLike}
          className={`like-button ${isLiked ? 'liked' : ''}`}
          aria-label={isLiked ? "Unlike user" : "Like user"}
        >
          <Heart size={16} className={isLiked ? 'filled' : ''} />
          <span className="like-count">{likeCount}</span>
        </button>
        <div className="user-location">
          <span className="location-text">
            {user.location.city}, {user.location.country}
          </span>
        </div>
      </div>

      <div className="card-overlay">
        <span className="click-hint">Click to view details</span>
      </div>
    </div>
  );
};

export default UserCard;