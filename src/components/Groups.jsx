import { useState } from 'react';
import { fakeGroups } from '../data/fakeUsers';
import './Groups.css';

const Groups = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    privacy: 'public',
    image: null
  });
  const [myGroups, setMyGroups] = useState(fakeGroups.filter(g => g.isJoined));
  const [availableGroups, setAvailableGroups] = useState(fakeGroups.filter(g => !g.isJoined));
  const [joinedGroups, setJoinedGroups] = useState([]);

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (newGroup.name.trim()) {
      const group = {
        id: Date.now(),
        name: newGroup.name,
        description: newGroup.description,
        image: newGroup.image || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop',
        members: 1,
        isJoined: true,
        activity: 'Just created'
      };
      setMyGroups([group, ...myGroups]);
      setNewGroup({ name: '', description: '', privacy: 'public', image: null });
      setShowCreateModal(false);
    }
  };

  const handleJoinGroup = (groupId) => {
    const group = availableGroups.find(g => g.id === groupId);
    if (group) {
      const updatedGroup = { ...group, isJoined: true };
      setMyGroups([...myGroups, updatedGroup]);
      setAvailableGroups(availableGroups.filter(g => g.id !== groupId));
      setJoinedGroups([...joinedGroups, groupId]);
    }
  };

  const handleLeaveGroup = (groupId) => {
    const group = myGroups.find(g => g.id === groupId);
    if (group && group.id > 3) { // Don't allow leaving default groups
      const updatedGroup = { ...group, isJoined: false };
      setAvailableGroups([...availableGroups, updatedGroup]);
      setMyGroups(myGroups.filter(g => g.id !== groupId));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewGroup({ ...newGroup, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const groupPosts = [
    {
      id: 1,
      groupName: 'Photography Enthusiasts',
      groupImage: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=40&h=40&fit=crop',
      user: 'Alex Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      content: 'Just captured this amazing sunset! What camera settings would you recommend for better color saturation?',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      groupName: 'Tech Innovators',
      groupImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=40&h=40&fit=crop',
      user: 'Sarah Chen',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      content: 'Excited to share my latest project - an AI-powered task manager! Would love to get feedback from the community.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=400&fit=crop',
      timestamp: '5 hours ago',
      likes: 42,
      comments: 15
    }
  ];

  const renderFeed = () => (
    <div className="groups-feed">
      <div className="feed-header">
        <h3>Recent Activity</h3>
        <button className="create-post-btn">Create Post</button>
      </div>
      <div className="group-posts">
        {groupPosts.map(post => (
          <div key={post.id} className="group-post">
            <div className="post-header">
              <div className="group-info">
                <img src={post.groupImage} alt={post.groupName} className="group-avatar" />
                <div className="group-details">
                  <div className="group-name">{post.groupName}</div>
                  <div className="post-meta">
                    <img src={post.userAvatar} alt={post.user} className="user-avatar" />
                    <span className="user-name">{post.user}</span>
                    <span className="post-time">• {post.timestamp}</span>
                  </div>
                </div>
              </div>
              <button className="post-menu">⋯</button>
            </div>
            
            <div className="post-content">
              <p>{post.content}</p>
              {post.image && (
                <div className="post-image">
                  <img src={post.image} alt="Post content" />
                </div>
              )}
            </div>
            
            <div className="post-actions">
              <button className="action-btn">👍 {post.likes}</button>
              <button className="action-btn">💬 {post.comments}</button>
              <button className="action-btn">📤 Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExplore = () => (
    <div className="groups-explore">
      <h3>Suggested for you</h3>
      <div className="groups-grid">
        {availableGroups.map(group => (
          <div key={group.id} className="group-card">
            <div className="group-image">
              <img src={group.image} alt={group.name} />
            </div>
            <div className="group-info">
              <h4 className="group-name">{group.name}</h4>
              <p className="group-description">{group.description}</p>
              <div className="group-stats">
                <span>{group.members.toLocaleString()} members</span>
                <span className="activity-dot">•</span>
                <span>{group.activity}</span>
              </div>
            </div>
            <div className="group-actions">
              <button 
                className="btn btn-primary"
                onClick={() => handleJoinGroup(group.id)}
                disabled={joinedGroups.includes(group.id)}
              >
                {joinedGroups.includes(group.id) ? 'Joined' : 'Join Group'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMyGroups = () => (
    <div className="my-groups">
      <div className="section-header">
        <h3>Your Groups · {myGroups.length}</h3>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          Create Group
        </button>
      </div>
      <div className="groups-grid">
        {myGroups.map(group => (
          <div key={group.id} className="group-card joined">
            <div className="group-image">
              <img src={group.image} alt={group.name} />
              <div className="joined-badge">✓</div>
            </div>
            <div className="group-info">
              <h4 className="group-name">{group.name}</h4>
              <p className="group-description">{group.description}</p>
              <div className="group-stats">
                <span>{group.members.toLocaleString()} members</span>
                <span className="activity-dot">•</span>
                <span>{group.activity}</span>
              </div>
            </div>
            <div className="group-actions">
              <button className="btn btn-secondary">View Group</button>
              {group.id > 3 && ( // Only show leave for user-created groups
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleLeaveGroup(group.id)}
                >
                  Leave
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="groups-page">
      <div className="groups-sidebar">
        <h2>Groups</h2>
        <nav className="groups-nav">
          <button 
            className={`nav-item ${activeTab === 'feed' ? 'active' : ''}`}
            onClick={() => setActiveTab('feed')}
          >
            <span className="nav-icon">📰</span>
            Your Feed
          </button>
          <button 
            className={`nav-item ${activeTab === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveTab('explore')}
          >
            <span className="nav-icon">🔍</span>
            Explore
          </button>
          <button 
            className={`nav-item ${activeTab === 'my-groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-groups')}
          >
            <span className="nav-icon">👫</span>
            Your Groups
            <span className="group-count">{myGroups.length}</span>
          </button>
        </nav>
        
        <div className="groups-shortcuts">
          <h4>Your Groups</h4>
          {myGroups.slice(0, 5).map(group => (
            <div key={group.id} className="group-shortcut">
              <img src={group.image} alt={group.name} />
              <span>{group.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="groups-content">
        {activeTab === 'feed' && renderFeed()}
        {activeTab === 'explore' && renderExplore()}
        {activeTab === 'my-groups' && renderMyGroups()}
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="create-group-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Group</h3>
              <button 
                className="close-btn"
                onClick={() => setShowCreateModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleCreateGroup} className="group-form">
              <div className="form-group">
                <label>Group Name</label>
                <input
                  type="text"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  placeholder="Enter group name..."
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  placeholder="Describe your group..."
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label>Privacy</label>
                <select
                  value={newGroup.privacy}
                  onChange={(e) => setNewGroup({ ...newGroup, privacy: e.target.value })}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Group Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {newGroup.image && (
                  <div className="image-preview">
                    <img src={newGroup.image} alt="Preview" />
                  </div>
                )}
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;