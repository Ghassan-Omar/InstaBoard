import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from '../UserCard/UserCard';
import { RefreshCw, Users } from 'lucide-react';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  const navigate = useNavigate();

  // Load liked users from localStorage on component mount
  useEffect(() => {
    const savedLikedUsers = localStorage.getItem('likedUsers');
    if (savedLikedUsers) {
      setLikedUsers(JSON.parse(savedLikedUsers));
    }
  }, []);

  // Save liked users to localStorage whenever likedUsers changes
  useEffect(() => {
    localStorage.setItem('likedUsers', JSON.stringify(likedUsers));
  }, [likedUsers]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('https://randomuser.me/api/?results=12');
      setUsers(response.data.results);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreUsers = async () => {
    try {
      setError(null);
      const response = await axios.get('https://randomuser.me/api/?results=6');
      setUsers(prevUsers => [...prevUsers, ...response.data.results]);
    } catch (err) {
      setError('Failed to load more users. Please try again.');
      console.error('Error loading more users:', err);
    }
  };

  const handleLike = (user) => {
    const userKey = `${user.login.uuid}`;
    setLikedUsers(prevLiked => {
      const isAlreadyLiked = prevLiked.some(likedUser => likedUser.login.uuid === user.login.uuid);
      
      if (isAlreadyLiked) {
        // Remove from liked users
        return prevLiked.filter(likedUser => likedUser.login.uuid !== user.login.uuid);
      } else {
        // Add to liked users
        return [...prevLiked, user];
      }
    });
  };

  const handleUserClick = (user) => {
    // Navigate to user details page
    navigate(`/team/${user.login.uuid}`, { state: { user } });
  };

  const isUserLiked = (user) => {
    return likedUsers.some(likedUser => likedUser.login.uuid === user.login.uuid);
  };

  const getLikeCount = (user) => {
    return isUserLiked(user) ? 1 : 0;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading && users.length === 0) {
    return (
      <div className="user-list-container">
        <div className="loading-state">
          <RefreshCw className="loading-icon" size={48} />
          <p>Loading amazing people...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <div className="header-content">
          <Users size={32} className="header-icon" />
          <div>
            <h2 className="section-title">User Profiles ({users.length} users)</h2>
            <p className="section-subtitle">Click on any profile to view detailed information</p>
          </div>
        </div>
        <button 
          onClick={fetchUsers} 
          className="refresh-button"
          disabled={loading}
          aria-label="Refresh user list"
        >
          <RefreshCw size={20} className={loading ? 'spinning' : ''} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchUsers} className="retry-button">
            Try Again
          </button>
        </div>
      )}

      <div className="user-grid">
        {users.map((user, index) => (
          <UserCard
            key={`${user.login.uuid}-${index}`}
            user={user}
            onLike={() => handleLike(user)}
            onUserClick={() => handleUserClick(user)}
            isLiked={isUserLiked(user)}
            likeCount={getLikeCount(user)}
          />
        ))}
      </div>

      {users.length > 0 && (
        <div className="load-more-section">
          <button 
            onClick={loadMoreUsers} 
            className="load-more-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw size={20} className="spinning" />
                Loading...
              </>
            ) : (
              'Load More Users'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;