import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/pages/Home/Home';
import About from './components/pages/About/About';
import UserList from './components/UserList/UserList';
import TeamDetails from './components/TeamDetails/TeamDetails';
import LikedUsers from './components/LikedUsers/LikedUsers';
import NotFound from './components/pages/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="team" element={<UserList />} />
            <Route path="team/:id" element={<TeamDetails />} />
            <Route path="liked-users" element={<LikedUsers />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;