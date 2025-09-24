import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Splash from './components/Splash';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Messenger from './components/Messenger';
import Profile from './components/Profile';
import Friends from './components/Friends';
import Videos from './components/Videos';
import Groups from './components/Groups';
import Marketplace from './components/Marketplace';
import Settings from './components/Settings';
import Games from './components/Games';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { isAuthenticated } = useAuth();

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <Splash onComplete={handleSplashComplete} />;
  }

  return (
    <div className="app">
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Header />
              <div className="main-container">
                <Sidebar />
                <div className="content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/messenger" element={<Messenger />} />
                    <Route path="/profile/:id?" element={<Profile />} />
                    <Route path="/friends" element={<Friends />} />
                    <Route path="/videos" element={<Videos />} />
                    <Route path="/groups" element={<Groups />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/games" element={<Games />} />
                  </Routes>
                </div>
              </div>
              <div className="mobile-nav">
                <div className="mobile-nav-items">
                  <button className="mobile-nav-item active">🏠</button>
                  <button className="mobile-nav-item">👥</button>
                  <button className="mobile-nav-item">💬</button>
                  <button className="mobile-nav-item">🔔</button>
                  <button className="mobile-nav-item">☰</button>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;