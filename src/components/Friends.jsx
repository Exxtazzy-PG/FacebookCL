import { useState } from 'react';
import { fakeUsers } from '../data/fakeUsers';
import { useNavigate } from 'react-router-dom';
import './Friends.css';

const Friends = () => {
  const [activeTab, setActiveTab] = useState('suggestions');
  const [friendRequests, setFriendRequests] = useState([
    { ...fakeUsers[0], requestTime: '2 days ago' },
    { ...fakeUsers[1], requestTime: '1 week ago' }
  ]);
  const [myFriends, setMyFriends] = useState([
    { ...fakeUsers[2], friendsSince: 'Friends since 2020' },
    { ...fakeUsers[3], friendsSince: 'Friends since 2019' },
    { ...fakeUsers[4], friendsSince: 'Friends since 2021' }
  ]);
  const [suggestions, setSuggestions] = useState(fakeUsers);
  const [sentRequests, setSentRequests] = useState([]);
  
  const navigate = useNavigate();

  const handleSendRequest = (userId) => {
    const user = suggestions.find(u => u.id === userId);
    if (user) {
      setSentRequests([...sentRequests, userId]);
      setTimeout(() => {
        setSentRequests(prev => prev.filter(id => id !== userId));
        setMyFriends(prev => [...prev, { ...user, friendsSince: 'Friends since today' }]);
      }, 3000);
    }
  };

  const handleAcceptRequest = (userId) => {
    const user = friendRequests.find(u => u.id === userId);
    if (user) {
      setMyFriends(prev => [...prev, { ...user, friendsSince: 'Friends since today' }]);
      setFriendRequests(prev => prev.filter(u => u.id !== userId));
    }
  };

  const handleRejectRequest = (userId) => {
    setFriendRequests(prev => prev.filter(u => u.id !== userId));
  };

  const handleUnfriend = (userId) => {
    setMyFriends(prev => prev.filter(u => u.id !== userId));
    setSuggestions(prev => [...prev, fakeUsers.find(u => u.id === userId)]);
  };

  const renderSuggestions = () => (
    <div className="friends-grid">
      {suggestions.map(user => (
        <div key={user.id} className="friend-suggestion-card">
          <div className="friend-image">
            <img src={user.avatar} alt={user.name} />
          </div>
          <div className="friend-info">
            <h3 className="friend-name" onClick={() => navigate(`/profile/${user.id}`)}>
              {user.name}
            </h3>
            <p className="mutual-friends">{user.mutualFriends} mutual friends</p>
            <p className="friend-location">{user.location}</p>
          </div>
          <div className="friend-actions">
            {sentRequests.includes(user.id) ? (
              <button className="btn btn-secondary" disabled>
                Request sent
              </button>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={() => handleSendRequest(user.id)}
              >
                Add Friend
              </button>
            )}
            <button className="btn btn-secondary">Remove</button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRequests = () => (
    <div className="friend-requests">
      {friendRequests.length > 0 ? (
        <div className="friends-grid">
          {friendRequests.map(user => (
            <div key={user.id} className="friend-request-card">
              <div className="friend-image">
                <img src={user.avatar} alt={user.name} />
              </div>
              <div className="friend-info">
                <h3 className="friend-name" onClick={() => navigate(`/profile/${user.id}`)}>
                  {user.name}
                </h3>
                <p className="mutual-friends">{user.mutualFriends} mutual friends</p>
                <p className="request-time">{user.requestTime}</p>
              </div>
              <div className="friend-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => handleAcceptRequest(user.id)}
                >
                  Confirm
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleRejectRequest(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-requests">
          <div className="no-requests-icon">👥</div>
          <h3>No new friend requests</h3>
          <p>When people send you friend requests, they'll appear here.</p>
        </div>
      )}
    </div>
  );

  const renderAllFriends = () => (
    <div className="all-friends">
      <div className="friends-header">
        <h3>All Friends · {myFriends.length}</h3>
        <div className="friends-search">
          <input type="text" placeholder="Search friends" />
        </div>
      </div>
      <div className="friends-grid">
        {myFriends.map(user => (
          <div key={user.id} className="friend-card">
            <div className="friend-image">
              <img src={user.avatar} alt={user.name} />
              {user.isOnline && <div className="online-status"></div>}
            </div>
            <div className="friend-info">
              <h3 className="friend-name" onClick={() => navigate(`/profile/${user.id}`)}>
                {user.name}
              </h3>
              <p className="friends-since">{user.friendsSince}</p>
            </div>
            <div className="friend-menu">
              <button className="menu-btn">⋯</button>
              <div className="friend-menu-dropdown">
                <button onClick={() => navigate('/messenger')}>Message</button>
                <button>View Profile</button>
                <button onClick={() => handleUnfriend(user.id)}>Unfriend</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBirthdays = () => (
    <div className="birthdays-section">
      <div className="today-birthdays">
        <h3>Today</h3>
        <div className="birthday-item">
          <img src={fakeUsers[1].avatar} alt={fakeUsers[1].name} />
          <div>
            <span>🎂 <strong>{fakeUsers[1].name}</strong> has a birthday today</span>
            <button className="btn btn-secondary">Write on their timeline</button>
          </div>
        </div>
      </div>
      
      <div className="upcoming-birthdays">
        <h3>This Week</h3>
        <div className="birthday-item">
          <img src={fakeUsers[3].avatar} alt={fakeUsers[3].name} />
          <div>
            <span><strong>{fakeUsers[3].name}</strong> has a birthday on Friday</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="friends-page">
      <div className="friends-sidebar">
        <h2>Friends</h2>
        <nav className="friends-nav">
          <button 
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <span className="nav-icon">🏠</span>
            Home
          </button>
          <button 
            className={`nav-item ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <span className="nav-icon">👤</span>
            Friend Requests
            {friendRequests.length > 0 && (
              <span className="notification-count">{friendRequests.length}</span>
            )}
          </button>
          <button 
            className={`nav-item ${activeTab === 'suggestions' ? 'active' : ''}`}
            onClick={() => setActiveTab('suggestions')}
          >
            <span className="nav-icon">👥</span>
            Suggestions
          </button>
          <button 
            className={`nav-item ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <span className="nav-icon">👫</span>
            All Friends
          </button>
          <button 
            className={`nav-item ${activeTab === 'birthdays' ? 'active' : ''}`}
            onClick={() => setActiveTab('birthdays')}
          >
            <span className="nav-icon">🎂</span>
            Birthdays
          </button>
          <button 
            className={`nav-item ${activeTab === 'custom' ? 'active' : ''}`}
            onClick={() => setActiveTab('custom')}
          >
            <span className="nav-icon">📝</span>
            Custom Lists
          </button>
        </nav>
      </div>

      <div className="friends-content">
        {activeTab === 'home' && (
          <div className="friends-home">
            <section className="friends-section">
              <h3>Friend Requests {friendRequests.length > 0 && `· ${friendRequests.length}`}</h3>
              {friendRequests.length > 0 ? (
                <div className="friends-preview">
                  {friendRequests.slice(0, 4).map(user => (
                    <div key={user.id} className="friend-request-preview">
                      <img src={user.avatar} alt={user.name} />
                      <div className="preview-info">
                        <div className="preview-name">{user.name}</div>
                        <div className="preview-mutual">{user.mutualFriends} mutual</div>
                      </div>
                      <div className="preview-actions">
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => handleAcceptRequest(user.id)}
                        >
                          Confirm
                        </button>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleRejectRequest(user.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No pending friend requests</p>
              )}
              {friendRequests.length > 4 && (
                <button 
                  className="see-all-btn"
                  onClick={() => setActiveTab('requests')}
                >
                  See all
                </button>
              )}
            </section>

            <section className="friends-section">
              <h3>People You May Know</h3>
              <div className="friends-preview">
                {suggestions.slice(0, 8).map(user => (
                  <div key={user.id} className="friend-suggestion-preview">
                    <img src={user.avatar} alt={user.name} />
                    <div className="preview-info">
                      <div className="preview-name">{user.name}</div>
                      <div className="preview-mutual">{user.mutualFriends} mutual</div>
                    </div>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleSendRequest(user.id)}
                      disabled={sentRequests.includes(user.id)}
                    >
                      {sentRequests.includes(user.id) ? 'Sent' : 'Add Friend'}
                    </button>
                  </div>
                ))}
              </div>
              <button 
                className="see-all-btn"
                onClick={() => setActiveTab('suggestions')}
              >
                See all
              </button>
            </section>
          </div>
        )}
        
        {activeTab === 'suggestions' && (
          <div>
            <h2>People You May Know</h2>
            {renderSuggestions()}
          </div>
        )}
        
        {activeTab === 'requests' && (
          <div>
            <h2>Friend Requests</h2>
            {renderRequests()}
          </div>
        )}
        
        {activeTab === 'all' && renderAllFriends()}
        
        {activeTab === 'birthdays' && (
          <div>
            <h2>Birthdays</h2>
            {renderBirthdays()}
          </div>
        )}
        
        {activeTab === 'custom' && (
          <div className="custom-lists">
            <h2>Custom Lists</h2>
            <p>Create custom lists to organize your friends</p>
            <button className="btn btn-primary">Create List</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;