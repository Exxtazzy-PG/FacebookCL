import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fakeUsers, fakePosts } from '../data/fakeUsers';
import Post from './Post';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [isFriend, setIsFriend] = useState(false);
  const [friendRequestSent, setFriendRequestSent] = useState(false);

  useEffect(() => {
    if (id && id !== 'undefined') {
      const user = fakeUsers.find(u => u.id === parseInt(id));
      setProfileUser(user || currentUser);
    } else {
      setProfileUser(currentUser);
    }
  }, [id, currentUser]);

  useEffect(() => {
    if (profileUser) {
      const posts = fakePosts.filter(post => post.userId === profileUser.id);
      setUserPosts(posts);
    }
  }, [profileUser]);

  const handleFriendRequest = () => {
    setFriendRequestSent(true);
    setTimeout(() => {
      setIsFriend(true);
      setFriendRequestSent(false);
    }, 2000);
  };

  const handleUnfriend = () => {
    setIsFriend(false);
  };

  const isOwnProfile = profileUser?.id === currentUser?.id;

  if (!profileUser) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="cover-photo">
          <img src={profileUser.coverPhoto} alt="Cover" />
          {isOwnProfile && (
            <button className="edit-cover-btn">📷 Edit Cover Photo</button>
          )}
        </div>
        
        <div className="profile-info">
          <div className="profile-picture">
            <img src={profileUser.avatar} alt={profileUser.name} />
            {isOwnProfile && (
              <button className="edit-avatar-btn">📷</button>
            )}
          </div>
          
          <div className="profile-details">
            <h1 className="profile-name">{profileUser.name}</h1>
            <div className="profile-stats">
              <span>{profileUser.friends} friends</span>
              <span>{profileUser.following} following</span>
            </div>
            <p className="profile-bio">{profileUser.bio}</p>
            <div className="profile-meta">
              <span>📍 {profileUser.location}</span>
              <span>📅 Joined {profileUser.joined}</span>
            </div>
          </div>
          
          <div className="profile-actions">
            {isOwnProfile ? (
              <>
                <button className="btn btn-primary">➕ Add to story</button>
                <button className="btn btn-secondary">✏️ Edit profile</button>
              </>
            ) : (
              <>
                {isFriend ? (
                  <button className="btn btn-secondary" onClick={handleUnfriend}>
                    ✓ Friends
                  </button>
                ) : friendRequestSent ? (
                  <button className="btn btn-secondary" disabled>
                    Request sent
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={handleFriendRequest}>
                    ➕ Add friend
                  </button>
                )}
                <button className="btn btn-secondary">💬 Message</button>
                <button className="btn btn-secondary">⋯</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="profile-navigation">
        <div className="profile-nav">
          <button 
            className={`nav-tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button 
            className={`nav-tab ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          <button 
            className={`nav-tab ${activeTab === 'friends' ? 'active' : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            Friends
          </button>
          <button 
            className={`nav-tab ${activeTab === 'photos' ? 'active' : ''}`}
            onClick={() => setActiveTab('photos')}
          >
            Photos
          </button>
          <button 
            className={`nav-tab ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-card">
            <h3>Intro</h3>
            <p>{profileUser.bio}</p>
            <div className="intro-items">
              <div className="intro-item">
                <span className="intro-icon">📍</span>
                Lives in <strong>{profileUser.location}</strong>
              </div>
              <div className="intro-item">
                <span className="intro-icon">❤️</span>
                Single
              </div>
              <div className="intro-item">
                <span className="intro-icon">📅</span>
                Joined {profileUser.joined}
              </div>
            </div>
            {isOwnProfile && (
              <button className="btn btn-secondary full-width">Edit details</button>
            )}
          </div>

          <div className="profile-card">
            <div className="card-header">
              <h3>Photos</h3>
              <a href="#">See all photos</a>
            </div>
            <div className="photos-grid">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="photo-item">
                  <img 
                    src={`https://tse4.mm.bing.net/th/id/OIP.jTIDwfHnYhp3FqGIRr099QHaFj?rs=1&pid=ImgDetMain&o=7&rm=3-${1500000000000 + i}?w=150&h=150&fit=crop`} 
                    alt={`Photo ${i}`} 
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="profile-card">
            <div className="card-header">
              <h3>Friends</h3>
              <a href="#">See all friends</a>
            </div>
            <p className="friends-count">{profileUser.friends} friends</p>
            <div className="friends-grid">
              {fakeUsers.slice(0, 6).map(friend => (
                <div key={friend.id} className="friend-item">
                  <img src={friend.avatar} alt={friend.name} />
                  <span>{friend.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="profile-main">
          {activeTab === 'posts' && (
            <div className="profile-posts">
              {isOwnProfile && (
                <div className="create-post">
                  <div className="create-post-header">
                    <img src={currentUser?.avatar} alt="Your avatar" className="create-post-avatar" />
                    <input
                      type="text"
                      placeholder="What's on your mind?"
                      className="create-post-input"
                    />
                  </div>
                </div>
              )}
              
              {userPosts.length > 0 ? (
                userPosts.map(post => (
                  <Post key={post.id} post={post} />
                ))
              ) : (
                <div className="no-posts">
                  <h3>No posts yet</h3>
                  <p>{isOwnProfile ? "You haven't shared anything yet." : `${profileUser.name} hasn't shared anything yet.`}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="profile-about">
              <div className="about-section">
                <h3>Work and Education</h3>
                <div className="about-item">
                  <span className="about-icon">💼</span>
                  <div>
                    <div>Works as {profileUser.bio?.split(' ')[0] || 'Professional'}</div>
                    <div className="about-detail">Since 2020</div>
                  </div>
                </div>
              </div>
              
              <div className="about-section">
                <h3>Places lived</h3>
                <div className="about-item">
                  <span className="about-icon">📍</span>
                  <div>
                    <div>Lives in {profileUser.location}</div>
                  </div>
                </div>
              </div>
              
              <div className="about-section">
                <h3>Contact and basic info</h3>
                <div className="about-item">
                  <span className="about-icon">✉️</span>
                  <div>
                    <div>{profileUser.email}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="profile-friends">
              <div className="friends-header">
                <h3>Friends · {profileUser.friends}</h3>
              </div>
              <div className="friends-list">
                {fakeUsers.map(friend => (
                  <div key={friend.id} className="friend-card">
                    <img src={friend.avatar} alt={friend.name} />
                    <div className="friend-info">
                      <div className="friend-name">{friend.name}</div>
                      <div className="friend-mutual">{friend.mutualFriends} mutual friends</div>
                    </div>
                    <button className="btn btn-secondary">Message</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;