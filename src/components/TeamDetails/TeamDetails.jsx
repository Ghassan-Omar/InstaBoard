import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  User,
  Globe,
  Clock
} from 'lucide-react';
import './TeamDetails.css';

const TeamDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Get user data from location state or try to find in localStorage
    if (location.state?.user) {
      setUser(location.state.user);
    } else {
      // If no user data in state, redirect back to team page
      navigate('/team');
      return;
    }

    // Check if user is liked
    const savedLikedUsers = localStorage.getItem('likedUsers');
    if (savedLikedUsers) {
      const likedUsers = JSON.parse(savedLikedUsers);
      const userIsLiked = likedUsers.some(likedUser => likedUser.login.uuid === id);
      setIsLiked(userIsLiked);
    }
  }, [id, location.state, navigate]);

  const handleLike = () => {
    const savedLikedUsers = localStorage.getItem('likedUsers');
    let likedUsers = savedLikedUsers ? JSON.parse(savedLikedUsers) : [];

    if (isLiked) {
      // Remove from liked users
      likedUsers = likedUsers.filter(likedUser => likedUser.login.uuid !== user.login.uuid);
    } else {
      // Add to liked users
      likedUsers.push(user);
    }

    localStorage.setItem('likedUsers', JSON.stringify(likedUsers));
    setIsLiked(!isLiked);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatName = (first, last) => {
    return `${first.charAt(0).toUpperCase() + first.slice(1)} ${last.charAt(0).toUpperCase() + last.slice(1)}`;
  };

  const getTitle = (gender) => {
    return gender === 'male' ? 'Mr' : gender === 'female' ? 'Miss' : 'Mx';
  };

  if (!user) {
    return (
      <div className="team-details-container">
        <div className="loading-state">
          <p>Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="team-details-container">
      <div className="details-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} />
          Back
        </button>
        <Link to="/team" className="team-link">
          View All Team Members
        </Link>
      </div>

      <div className="user-details-card">
        <div className="user-profile-section">
          <div className="profile-image-container">
            {imageError ? (
              <div className="profile-image-fallback">
                <User size={80} />
              </div>
            ) : (
              <img
                src={user.picture.large}
                alt={`${user.name.first} ${user.name.last}`}
                className="profile-image"
                onError={handleImageError}
              />
            )}
          </div>
          
          <div className="profile-info">
            <h1 className="profile-name">
              {getTitle(user.gender)} {formatName(user.name.first, user.name.last)}
            </h1>
            <p className="profile-username">@{user.login.username}</p>
            
            <button
              onClick={handleLike}
              className={`like-button-large ${isLiked ? 'liked' : ''}`}
            >
              <Heart size={20} className={isLiked ? 'filled' : ''} />
              {isLiked ? 'Liked' : 'Like'}
            </button>
          </div>
        </div>

        <div className="user-info-grid">
          <div className="info-section">
            <h3 className="section-title">Contact Information</h3>
            <div className="info-items">
              <div className="info-item">
                <Mail className="info-icon" />
                <div>
                  <span className="info-label">Email</span>
                  <span className="info-value">{user.email}</span>
                </div>
              </div>
              <div className="info-item">
                <Phone className="info-icon" />
                <div>
                  <span className="info-label">Phone</span>
                  <span className="info-value">{user.phone}</span>
                </div>
              </div>
              <div className="info-item">
                <Phone className="info-icon" />
                <div>
                  <span className="info-label">Cell</span>
                  <span className="info-value">{user.cell}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3 className="section-title">Location</h3>
            <div className="info-items">
              <div className="info-item">
                <MapPin className="info-icon" />
                <div>
                  <span className="info-label">Address</span>
                  <span className="info-value">
                    {user.location.street.number} {user.location.street.name}
                  </span>
                </div>
              </div>
              <div className="info-item">
                <Globe className="info-icon" />
                <div>
                  <span className="info-label">City</span>
                  <span className="info-value">{user.location.city}</span>
                </div>
              </div>
              <div className="info-item">
                <Globe className="info-icon" />
                <div>
                  <span className="info-label">Country</span>
                  <span className="info-value">{user.location.country}</span>
                </div>
              </div>
              <div className="info-item">
                <MapPin className="info-icon" />
                <div>
                  <span className="info-label">Postcode</span>
                  <span className="info-value">{user.location.postcode}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="info-items">
              <div className="info-item">
                <Calendar className="info-icon" />
                <div>
                  <span className="info-label">Date of Birth</span>
                  <span className="info-value">{formatDate(user.dob.date)}</span>
                </div>
              </div>
              <div className="info-item">
                <Clock className="info-icon" />
                <div>
                  <span className="info-label">Age</span>
                  <span className="info-value">{user.dob.age} years old</span>
                </div>
              </div>
              <div className="info-item">
                <User className="info-icon" />
                <div>
                  <span className="info-label">Gender</span>
                  <span className="info-value">{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</span>
                </div>
              </div>
              <div className="info-item">
                <Globe className="info-icon" />
                <div>
                  <span className="info-label">Nationality</span>
                  <span className="info-value">{user.nat}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;