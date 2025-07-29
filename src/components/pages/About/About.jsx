import React from 'react';
import { Github, Code, Heart, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">About InstaBoard 2</h1>
          <p className="about-subtitle">
            A modern React application showcasing user profiles with routing and state management
          </p>
        </div>

        <div className="about-content">
          <div className="about-section">
            <h2>Project Overview</h2>
            <p>
              InstaBoard 2 is an enhanced version of the original InstaBoard application, built with React and React Router. 
              It demonstrates modern web development practices including component-based architecture, client-side routing, 
              state management, and responsive design.
            </p>
          </div>

          <div className="about-section">
            <h2>Features</h2>
            <div className="features-grid">
              <div className="feature-item">
                <Users className="feature-icon" />
                <h3>User Profiles</h3>
                <p>Browse through diverse user profiles fetched from a real API</p>
              </div>
              <div className="feature-item">
                <Heart className="feature-icon" />
                <h3>Like System</h3>
                <p>Like your favorite profiles and track them with localStorage</p>
              </div>
              <div className="feature-item">
                <Code className="feature-icon" />
                <h3>Modern Tech Stack</h3>
                <p>Built with React, React Router, Axios, and modern CSS</p>
              </div>
              <div className="feature-item">
                <Github className="feature-icon" />
                <h3>Open Source</h3>
                <p>Clean, well-documented code available on GitHub</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Technologies Used</h2>
            <div className="tech-stack">
              <span className="tech-tag">React 19</span>
              <span className="tech-tag">React Router DOM</span>
              <span className="tech-tag">Axios</span>
              <span className="tech-tag">Lucide React</span>
              <span className="tech-tag">CSS3</span>
              <span className="tech-tag">Vite</span>
              <span className="tech-tag">JavaScript ES6+</span>
            </div>
          </div>

          <div className="about-section">
            <h2>Developer</h2>
            <div className="developer-info">
              <p>
                Created by <strong>Ghassan Omar</strong> as part of a React development learning journey.
                This project demonstrates proficiency in modern React development patterns and best practices.
              </p>
              <a 
                href="https://github.com/Ghassan-Omar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-link"
              >
                <Github size={20} />
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;