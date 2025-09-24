import { useState, useEffect } from 'react';
import Stories from './Stories';
import Post from './Post';
import { fakePosts } from '../data/fakeUsers';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  
  const { currentUser } = useAuth();

  useEffect(() => {
    setPosts(fakePosts);
  }, []);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (newPost.trim() || postImage) {
      const post = {
        id: Date.now(),
        userId: currentUser.id,
        user: currentUser,
        content: newPost,
        image: postImage,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false
      };
      setUserPosts([post, ...userPosts]);
      setNewPost('');
      setPostImage(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPostImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
    setUserPosts(userPosts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleComment = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: post.comments + 1 } : post
    ));
    setUserPosts(userPosts.map(post => 
      post.id === postId ? { ...post, comments: post.comments + 1 } : post
    ));
  };

  const handleShare = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, shares: post.shares + 1 } : post
    ));
    setUserPosts(userPosts.map(post => 
      post.id === postId ? { ...post, shares: post.shares + 1 } : post
    ));
  };

  const allPosts = [...userPosts, ...posts];

  return (
    <div className="home">
      <div className="home-content">
        <Stories />
        
        <div className="create-post">
          <div className="create-post-header">
            <img src={currentUser?.avatar} alt="Your avatar" className="create-post-avatar" />
            <input
              type="text"
              placeholder={`What's on your mind, ${currentUser?.name?.split(' ')[0]}?`}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="create-post-input"
            />
          </div>
          
          {postImage && (
            <div className="post-image-preview">
              <img src={postImage} alt="Post preview" />
              <button 
                className="remove-image"
                onClick={() => setPostImage(null)}
              >
                ✕
              </button>
            </div>
          )}
          
          <div className="create-post-actions">
            <div className="post-options">
              <label className="post-option">
                <span className="option-icon">📷</span>
                <span>Photo/Video</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
              <div className="post-option">
                <span className="option-icon">😊</span>
                <span>Feeling/Activity</span>
              </div>
            </div>
            <button 
              className="post-submit-btn"
              onClick={handleCreatePost}
              disabled={!newPost.trim() && !postImage}
            >
              Post
            </button>
          </div>
        </div>

        <div className="posts-feed">
          {allPosts.map(post => (
            <Post 
              key={post.id} 
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;