import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, Info, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to InstaBoard</h1>
        <p className="hero-subtitle">
          Discover amazing people from around the world with our enhanced user profile explorer
        </p>
        <div className="hero-features">
          <div className="feature-card">
            <Users size={48} className="feature-icon" />
            <h3>Browse Profiles</h3>
            <p>Explore diverse user profiles from our global community</p>
          </div>
          <div className="feature-card">
            <Heart size={48} className="feature-icon" />
            <h3>Like & Save</h3>
            <p>Like your favorite profiles and keep track of them</p>
          </div>
          <div className="feature-card">
            <Info size={48} className="feature-icon" />
            <h3>Learn More</h3>
            <p>Get detailed information about each user</p>
          </div>
        </div>
        <div className="cta-buttons">
          <Link to="/team" className="cta-button primary">
            Explore Team
            <ArrowRight size={20} />
          </Link>
          <Link to="/about" className="cta-button secondary">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;