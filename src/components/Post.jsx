import { useState } from 'react';
import './Post.css';

const Post = ({ post, onLike, onComment, onShare }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: { name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face' },
      text: 'Amazing shot! 📸',
      timestamp: '2h'
    },
    {
      id: 2,
      user: { name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
      text: 'Love this!',
      timestamp: '1h'
    }
  ]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60); // minutes

    if (diff < 60) {
      return `${diff}m`;
    } else if (diff < 1440) {
      return `${Math.floor(diff / 60)}h`;
    } else {
      return `${Math.floor(diff / 1440)}d`;
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: {
          name: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
        },
        text: newComment,
        timestamp: 'now'
      };
      setComments([...comments, comment]);
      setNewComment('');
      if (onComment) onComment(post.id);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-user">
          <img src={post.user.avatar} alt={post.user.name} className="post-avatar" />
          <div className="post-user-info">
            <div className="post-user-name">{post.user.name}</div>
            <div className="post-timestamp">{formatTimestamp(post.timestamp)}</div>
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

      <div className="post-stats">
        <div className="post-likes">
          <span className="like-icon">👍</span>
          <span>{post.likes}</span>
        </div>
        <div className="post-actions-stats">
          <span onClick={() => setShowComments(!showComments)}>
            {post.comments} comments
          </span>
          <span>{post.shares} shares</span>
        </div>
      </div>

      <div className="post-actions">
        <button 
          className={`action-btn ${post.isLiked ? 'liked' : ''}`}
          onClick={() => onLike && onLike(post.id)}
        >
          <span className="action-icon">👍</span>
          Like
        </button>
        <button 
          className="action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <span className="action-icon">💬</span>
          Comment
        </button>
        <button 
          className="action-btn"
          onClick={() => onShare && onShare(post.id)}
        >
          <span className="action-icon">📤</span>
          Share
        </button>
      </div>

      {showComments && (
        <div className="post-comments">
          <form onSubmit={handleAddComment} className="comment-form">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
              alt="Your avatar" 
              className="comment-avatar" 
            />
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
          </form>
          
          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <img src={comment.user.avatar} alt={comment.user.name} className="comment-avatar" />
                <div className="comment-content">
                  <div className="comment-bubble">
                    <div className="comment-user">{comment.user.name}</div>
                    <div className="comment-text">{comment.text}</div>
                  </div>
                  <div className="comment-actions">
                    <span className="comment-timestamp">{comment.timestamp}</span>
                    <button className="comment-action">Like</button>
                    <button className="comment-action">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;