import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessengerDropdown, setShowMessengerDropdown] = useState(false);
  
  const { currentUser, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/friends', icon: '👥', label: 'Friends' },
    { path: '/videos', icon: '📺', label: 'Video' },
    { path: '/groups', icon: '👫', label: 'Groups' },
    { path: '/marketplace', icon: '🛒', label: 'Marketplace' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo" onClick={() => navigate('/')}>
          <svg viewBox="0 0 24 24" width="40" height="40">
            <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
        
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search Facebook"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </form>
      </div>

      <nav className="header-nav">
        {navItems.map(item => (
          <button
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
          </button>
        ))}
      </nav>

      <div className="header-right">
        <button
          className="header-btn"
          onClick={() => navigate('/profile')}
          title="Your Profile"
        >
          <img src={currentUser?.avatar} alt="Profile" className="profile-pic" />
          <span className="profile-name">{currentUser?.name}</span>
        </button>

        <button className="header-btn icon-btn" title="Menu">
          <span className="icon">⚙️</span>
        </button>

        <div className="messenger-dropdown">
          <button
            className="header-btn icon-btn"
            onClick={() => setShowMessengerDropdown(!showMessengerDropdown)}
            title="Messenger"
          >
            <span className="icon">💬</span>
            <span className="notification-badge">3</span>
          </button>
          {showMessengerDropdown && (
            <div className="dropdown-menu messenger-menu">
              <div className="dropdown-header">
                <h3>Messenger</h3>
                <button onClick={() => navigate('/messenger')}>See All</button>
              </div>
              <div className="messenger-preview">
                <div className="message-item">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" alt="" />
                  <div>
                    <div className="sender-name">Emma Watson</div>
                    <div className="message-preview">Hey! How's it going?</div>
                  </div>
                  <div className="message-time">2m</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="notifications-dropdown">
          <button
            className="header-btn icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <span className="icon">🔔</span>
            <span className="notification-badge">5</span>
          </button>
          {showNotifications && (
            <div className="dropdown-menu notifications-menu">
              <div className="dropdown-header">
                <h3>Notifications</h3>
                <button>Mark All as Read</button>
              </div>
              <div className="notifications-list">
                <div className="notification-item">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="" />
                  <div>
                    <div className="notification-text">
                      <strong>Michael Chen</strong> liked your photo
                    </div>
                    <div className="notification-time">5 minutes ago</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="profile-dropdown">
          <button
            className="header-btn icon-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            title="Account"
          >
            <span className="icon">▼</span>
          </button>
          {showProfileMenu && (
            <div className="dropdown-menu profile-menu">
              <div className="dropdown-user-info">
                <img src={currentUser?.avatar} alt="Profile" />
                <div>
                  <div className="user-name">{currentUser?.name}</div>
                  <div className="user-email">{currentUser?.email}</div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={() => navigate('/profile')}>
                👤 Your Profile
              </button>
              <button className="dropdown-item" onClick={() => navigate('/settings')}>
                ⚙️ Settings & Privacy
              </button>
              <button className="dropdown-item" onClick={toggleTheme}>
                {isDark ? '☀️' : '🌙'} {isDark ? 'Light' : 'Dark'} Mode
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={handleLogout}>
                🚪 Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;