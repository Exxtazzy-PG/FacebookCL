import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    posts: true,
    comments: true,
    likes: false,
    messages: true,
    friendRequests: true,
    groupActivity: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'friends',
    postVisibility: 'friends',
    friendListVisibility: 'friends',
    emailVisibility: 'private'
  });
  
  const { currentUser, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion is not available in this demo.');
    }
  };

  const renderGeneral = () => (
    <div className="settings-section">
      <h3>General Settings</h3>
      
      <div className="setting-group">
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-title">Dark Mode</div>
            <div className="setting-description">Switch between light and dark theme</div>
          </div>
          <button 
            className={`toggle-btn ${isDark ? 'active' : ''}`}
            onClick={toggleTheme}
          >
            <div className="toggle-slider"></div>
          </button>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-title">Language</div>
            <div className="setting-description">Choose your preferred language</div>
          </div>
          <select className="setting-select">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-title">Time Zone</div>
            <div className="setting-description">Set your local time zone</div>
          </div>
          <select className="setting-select">
            <option value="utc">UTC</option>
            <option value="est">Eastern Time</option>
            <option value="pst">Pacific Time</option>
            <option value="cst">Central Time</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="settings-section">
      <h3>Notification Settings</h3>
      
      <div className="setting-group">
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-title">Posts</div>
            <div className="setting-description">Get notified when friends post updates</div>
          </div>
          <button 
            className={`toggle-btn ${notifications.posts ? 'active' : ''}`}
            onClick={() => handleNotificationChange('posts')}
          >
            <div className="toggle-slider"></div>
          </button>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-title">Comments</div>
            <div className="setting-description">Get notified when someone comments on your posts</div>
          </div>
          <button 
            className={`toggle-btn ${notifications.comments ? 'active' : ''}`}
            onClick={() => handleNotificationChange('comments')}
          >
            <div className="toggle-slider"></div>
          </button>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-title">Likes</div>
            <div className="setting-description">Get notified when someone likes your posts</div>
          </div>
          <button 
            className={`toggle-btn ${notifications.likes ? 'active' : ''}`}
            onClick={() => handleNotificationChange('likes')}
          >
            <div className="toggle-slider"></div>
          </button>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-title">Messages</div>
            <div className="setting-description">Get notified when you receive new messages</div>
          </div>
          <button 
            className={`toggle-btn ${notifications.messages ? 'active' : ''}`}
            onClick={() => handleNotificationChange('messages')}
          >
            <div className="toggle-slider"></div>
          </button>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-title">Friend Requests</div>
            <div className="setting-description">Get notified when you receive friend requests</div>
          </div>
          <button 
            className={`toggle-btn ${notifications.friendRequests ? 'active' : ''}`}
            onClick={() => handleNotificationChange('friendRequests')}
          >
            <div className="toggle-slider"></div>
          </button>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-title">Group Activity</div>
            <div className="setting-description">Get notified about activity in your groups</div>
          </div>
          <button 
            className={`toggle-btn ${notifications.groupActivity ? 'active' : ''}`}
            onClick={() => handleNotificationChange('groupActivity')}
          >
            <div className="toggle-slider"></div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="settings-section">
      <h3>Privacy Settings</h3>
      
      <div className="setting-group">
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-title">Profile Visibility</div>
            <div className="setting-description">Who can see your profile</div>
          </div>
          <select 
            className="setting-select"
            value={privacy.profileVisibility}
            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
          >
            <option value="public">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="private">Only Me</option>
          </select>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-title">Post Visibility</div>
            <div className="setting-description">Who can see your posts by default</div>
          </div>
          <select 
            className="setting-select"
            value={privacy.postVisibility}
            onChange={(e) => handlePrivacyChange('postVisibility', e.target.value)}
          >
            <option value="public">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="private">Only Me</option>
          </select>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-title">Friend List Visibility</div>
            <div className="setting-description">Who can see your friends list</div>
          </div>
          <select 
            className="setting-select"
            value={privacy.friendListVisibility}
            onChange={(e) => handlePrivacyChange('friendListVisibility', e.target.value)}
          >
            <option value="public">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="private">Only Me</option>
          </select>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-title">Email Visibility</div>
            <div className="setting-description">Who can see your email address</div>
          </div>
          <select 
            className="setting-select"
            value={privacy.emailVisibility}
            onChange={(e) => handlePrivacyChange('emailVisibility', e.target.value)}
          >
            <option value="public">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="private">Only Me</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderAccount = () => (
    <div className="settings-section">
      <h3>Account Settings</h3>
      
      <div className="setting-group">
        <div className="account-info">
          <div className="account-avatar">
            <img src={currentUser?.avatar} alt="Profile" />
          </div>
          <div className="account-details">
            <div className="account-name">{currentUser?.name}</div>
            <div className="account-email">{currentUser?.email}</div>
            <div className="account-joined">Joined {currentUser?.joined}</div>
          </div>
        </div>
        
        <div className="account-actions">
          <button className="btn btn-secondary">Edit Profile</button>
          <button className="btn btn-secondary">Change Password</button>
          <button className="btn btn-secondary">Download Data</button>
        </div>
        
        <div className="danger-zone">
          <h4>Danger Zone</h4>
          <div className="danger-actions">
            <button className="btn btn-secondary" onClick={handleLogout}>
              Log Out
            </button>
            <button className="btn btn-danger" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="settings-page">
      <div className="settings-sidebar">
        <h2>Settings</h2>
        <nav className="settings-nav">
          <button 
            className={`nav-item ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <span className="nav-icon">⚙️</span>
            General
          </button>
          <button 
            className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <span className="nav-icon">🔔</span>
            Notifications
          </button>
          <button 
            className={`nav-item ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <span className="nav-icon">🔒</span>
            Privacy
          </button>
          <button 
            className={`nav-item ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            <span className="nav-icon">👤</span>
            Account
          </button>
        </nav>
      </div>

      <div className="settings-content">
        {activeTab === 'general' && renderGeneral()}
        {activeTab === 'notifications' && renderNotifications()}
        {activeTab === 'privacy' && renderPrivacy()}
        {activeTab === 'account' && renderAccount()}
      </div>
    </div>
  );
};

export default Settings;