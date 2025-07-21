import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../UserCard/UserCard';
import { RefreshCw, Users } from 'lucide-react';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch users from the API
  const fetchUsers = async (results = 12) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`https://randomuser.me/api/?results=${results}`);
      setUsers(response.data.results);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to load more users (append to existing list)
  const loadMoreUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('https://randomuser.me/api/?results=12');
      setUsers(prevUsers => [...prevUsers, ...response.data.results]);
    } catch (err) {
      setError('Failed to load more users. Please try again.');
      console.error('Error loading more users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <div className="header-content">
          <Users size={24} />
          <h2>User Profiles</h2>
          <span className="user-count">({users.length} users)</span>
        </div>
        <button 
          onClick={() => fetchUsers()} 
          className="refresh-btn"
          disabled={loading}
          aria-label="Refresh users"
        >
          <RefreshCw size={18} className={loading ? 'spinning' : ''} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => fetchUsers()} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      <div className="user-grid">
        {users.map((user, index) => (
          <UserCard 
            key={`${user.login.uuid}-${index}`} 
            user={user} 
          />
        ))}
      </div>

      {users.length > 0 && (
        <div className="load-more-section">
          <button 
            onClick={loadMoreUsers}
            className="load-more-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="spinning" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}

      {loading && users.length === 0 && (
        <div className="loading-state">
          <RefreshCw size={32} className="spinning" />
          <p>Loading users...</p>
        </div>
      )}
    </div>
  );
};

export default UserList;

