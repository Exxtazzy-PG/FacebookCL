import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const [showMore, setShowMore] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const mainItems = [
    { icon: '👤', label: 'Your Profile', path: '/profile' },
    { icon: '👥', label: 'Friends', path: '/friends' },
    { icon: '👫', label: 'Groups', path: '/groups' },
    { icon: '📺', label: 'Video', path: '/videos' },
    { icon: '🛒', label: 'Marketplace', path: '/marketplace' },
    { icon: '📰', label: 'News Feed', path: '/' },
    { icon: '🎮', label: 'Games', path: '/games' }
  ];

  const moreItems = [
    { icon: '💬', label: 'Messenger', path: '/messenger' },
  ];

  const handleItemClick = (path) => {
    navigate(path);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-user">
          <img src={currentUser?.avatar} alt="Profile" className="sidebar-avatar" />
          <span className="sidebar-name">{currentUser?.name}</span>
        </div>

        <div className="sidebar-menu">
          {mainItems.map((item, index) => (
            <div
              key={index}
              className="sidebar-item"
              onClick={() => handleItemClick(item.path)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </div>
          ))}

          <div className="sidebar-divider"></div>

          <div
            className="sidebar-item show-more"
            onClick={() => setShowMore(!showMore)}
          >
            <span className="sidebar-icon">{showMore ? '🔼' : '🔽'}</span>
            <span className="sidebar-label">{showMore ? 'Show Less' : 'Show More'}</span>
          </div>

          {showMore && (
            <div className="sidebar-more">
              {moreItems.map((item, index) => (
                <div
                  key={index}
                  className="sidebar-item"
                  onClick={() => handleItemClick(item.path)}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sidebar-shortcuts">
          <h3 className="shortcuts-title">Your Shortcuts</h3>
          <div className="shortcut-item">
            <img src="https://th.bing.com/th/id/R.6b1f8ee0eee132e7ec48d3447e083416?rik=xvRNeorORogHWQ&pid=ImgRaw&r=0" alt="Group" />
            <span>Tech Innovators</span>
          </div>
          <div className="shortcut-item">
            <img src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=40&h=40&fit=crop" alt="Group" />
            <span>Photography Club</span>
          </div>
          <div className="shortcut-item">
            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=40&h=40&fit=crop" alt="Group" />
            <span>Travel Enthusiasts</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;