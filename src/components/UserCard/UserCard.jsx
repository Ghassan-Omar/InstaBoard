import React, { useState } from 'react';
import { Heart, Eye, EyeOff } from 'lucide-react';
import './UserCard.css';

const UserCard = ({ user }) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const toggleEmailVisibility = () => {
    setShowEmail(!showEmail);
  };

  return (
    <div className="user-card">
      <div className="user-card-header">
        <img 
          src={user.picture?.large || user.picture?.medium || user.picture?.thumbnail || '/api/placeholder/150/150'} 
          alt={`${user.name?.first} ${user.name?.last}`}
          className="user-avatar"
        />
        <div className="user-info">
          <h3 className="user-name">
            {user.name?.title} {user.name?.first} {user.name?.last}
          </h3>
          <div className="email-section">
            {showEmail ? (
              <p className="user-email">{user.email}</p>
            ) : (
              <p className="user-email-hidden">Email hidden</p>
            )}
            <button 
              onClick={toggleEmailVisibility}
              className="email-toggle-btn"
              aria-label={showEmail ? "Hide email" : "Show email"}
            >
              {showEmail ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      </div>
      
      <div className="user-card-actions">
        <button 
          onClick={handleLike}
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <Heart size={20} fill={isLiked ? '#e11d48' : 'none'} />
          <span className="like-count">{likes}</span>
        </button>
      </div>
    </div>
  );
};

export default UserCard;

