import React from 'react'
import UserList from './components/UserList/UserList'
import { Github } from 'lucide-react'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-container">
          <div className="logo-section">
            <a 
              href="https://github.com/Ghassan-Omar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-link"
              aria-label="Visit Ghassan Omar's GitHub profile"
            >
              <Github size={32} className="logo-icon" />
            </a>
            <h1 className="app-title">InstaBoard</h1>
          </div>
          <p className="app-subtitle">Discover amazing people from around the world</p>
        </div>
      </header>
      
      <main className="app-main">
        <UserList />
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2025 InstaBoard. Built with React & Axios by <a href="https://github.com/Ghassan-Omar" target="_blank" rel="noopener noreferrer" className="footer-github-link">Ghassan Omar</a>.</p>
      </footer>
    </div>
  )
}

export default App
