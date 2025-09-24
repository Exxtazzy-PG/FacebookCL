import { useState, useEffect } from 'react';
import './Videos.css';

const Videos = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [savedVideos, setSavedVideos] = useState([]);
  const [videoProgress, setVideoProgress] = useState({});

  const videos = [
    {
      id: 1,
      title: 'Amazing Nature Documentary',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      channel: 'Nature Channel',
      channelAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      views: '1.2M views',
      duration: '12:34',
      uploadTime: '2 days ago',
      likes: 45632,
      isLiked: false
    },
    {
      id: 2,
      title: 'Tech Review: Latest Gadgets 2025',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      channel: 'Tech Today',
      channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      views: '890K views',
      duration: '15:42',
      uploadTime: '5 days ago',
      likes: 32451,
      isLiked: true
    },
    {
      id: 3,
      title: 'Cooking Masterclass: Italian Cuisine',
      thumbnail: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&h=300&fit=crop',
      channel: 'Chef Mario',
      channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      views: '2.3M views',
      duration: '28:15',
      uploadTime: '1 week ago',
      likes: 87420,
      isLiked: false
    },
    {
      id: 4,
      title: 'Travel Vlog: Tokyo Adventures',
      thumbnail: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop',
      channel: 'Travel With Lisa',
      channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
      views: '650K views',
      duration: '18:47',
      uploadTime: '3 days ago',
      likes: 23876,
      isLiked: false
    },
    {
      id: 5,
      title: 'Music Production Tutorial',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      channel: 'Beat Makers',
      channelAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      views: '445K views',
      duration: '22:08',
      uploadTime: '1 day ago',
      likes: 18954,
      isLiked: true
    }
  ];

  const liveStreams = [
    {
      id: 101,
      title: 'LIVE: Breaking News Update',
      thumbnail: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=400&h=300&fit=crop',
      channel: 'News Central',
      channelAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      viewers: '12.4K watching',
      isLive: true
    },
    {
      id: 102,
      title: 'Gaming Stream: Epic Battles',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      channel: 'GameMaster Pro',
      channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      viewers: '8.7K watching',
      isLive: true
    }
  ];

  const reels = [
    {
      id: 201,
      title: 'Quick Recipe Hack',
      thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=400&fit=crop',
      creator: 'Chef Sarah',
      creatorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      likes: '234K',
      views: '1.2M'
    },
    {
      id: 202,
      title: 'Dance Challenge',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop',
      creator: 'Dance Squad',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
      likes: '567K',
      views: '3.4M'
    },
    {
      id: 203,
      title: 'Life Hack Tips',
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop',
      creator: 'Tips & Tricks',
      creatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      likes: '123K',
      views: '890K'
    },
    {
      id: 204,
      title: 'Pet Funny Moments',
      thumbnail: 'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=300&h=400&fit=crop',
      creator: 'Pet Lovers',
      creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      likes: '789K',
      views: '2.1M'
    },
    {
      id: 205,
      title: 'Art Time-lapse',
      thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=400&fit=crop',
      creator: 'Art Studio',
      creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      likes: '345K',
      views: '1.5M'
    }
  ];

  const handleLikeVideo = (videoId) => {
    // Handle like functionality
    console.log('Liked video:', videoId);
  };

  const handleSaveVideo = (videoId) => {
    if (savedVideos.includes(videoId)) {
      setSavedVideos(prev => prev.filter(id => id !== videoId));
    } else {
      setSavedVideos(prev => [...prev, videoId]);
    }
  };

  const handleShareVideo = (videoId) => {
    console.log('Shared video:', videoId);
  };

  const handleSubscribe = (channelName) => {
    console.log('Subscribed to:', channelName);
  };

  const simulateProgress = (videoId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setVideoProgress(prev => ({ ...prev, [videoId]: progress }));
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setVideoProgress(prev => ({ ...prev, [videoId]: 0 }));
        }, 1000);
      }
    }, 100);
  };

  const VideoCard = ({ video, type = 'video' }) => (
    <div className="video-card" onClick={() => simulateProgress(video.id)}>
      <div className="video-thumbnail">
        <img src={video.thumbnail} alt={video.title} />
        <div className="video-overlay">
          <button className="play-btn">▶️</button>
        </div>
        {type === 'video' && (
          <span className="video-duration">{video.duration}</span>
        )}
        {video.isLive && (
          <span className="live-badge">LIVE</span>
        )}
        {videoProgress[video.id] > 0 && (
          <div className="video-progress">
            <div 
              className="progress-bar"
              style={{ width: `${videoProgress[video.id]}%` }}
            ></div>
          </div>
        )}
      </div>
      
      <div className="video-info">
        <div className="video-header">
          <img src={video.channelAvatar || video.creatorAvatar} alt="Channel" className="channel-avatar" />
          <div className="video-details">
            <h3 className="video-title">{video.title}</h3>
            <div className="video-meta">
              <span className="channel-name">{video.channel || video.creator}</span>
              <span className="video-stats">
                {video.views || `${video.views} views`} {video.viewers && `• ${video.viewers}`}
                {video.uploadTime && ` • ${video.uploadTime}`}
              </span>
            </div>
          </div>
        </div>
        
        <div className="video-actions">
          <button 
            className={`action-btn ${video.isLiked ? 'liked' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleLikeVideo(video.id);
            }}
          >
            👍 {video.likes ? new Intl.NumberFormat().format(video.likes) : video.likes}
          </button>
          <button 
            className="action-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleShareVideo(video.id);
            }}
          >
            📤 Share
          </button>
          <button 
            className={`action-btn ${savedVideos.includes(video.id) ? 'saved' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleSaveVideo(video.id);
            }}
          >
            {savedVideos.includes(video.id) ? '💾 Saved' : '💾 Save'}
          </button>
          <button 
            className="action-btn subscribe-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleSubscribe(video.channel || video.creator);
            }}
          >
            ➕ Subscribe
          </button>
        </div>
      </div>
    </div>
  );

  const ReelCard = ({ reel }) => (
    <div className="reel-card" onClick={() => simulateProgress(reel.id)}>
      <div className="reel-thumbnail">
        <img src={reel.thumbnail} alt={reel.title} />
        <div className="reel-overlay">
          <button className="play-btn">▶️</button>
        </div>
        {videoProgress[reel.id] > 0 && (
          <div className="reel-progress">
            <div 
              className="progress-bar"
              style={{ width: `${videoProgress[reel.id]}%` }}
            ></div>
          </div>
        )}
      </div>
      <div className="reel-info">
        <h4 className="reel-title">{reel.title}</h4>
        <div className="reel-creator">
          <img src={reel.creatorAvatar} alt={reel.creator} />
          <span>{reel.creator}</span>
        </div>
        <div className="reel-stats">
          <span>👍 {reel.likes}</span>
          <span>👁️ {reel.views}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="videos-page">
      <div className="videos-sidebar">
        <h2>Watch</h2>
        <nav className="videos-nav">
          <button 
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <span className="nav-icon">🏠</span>
            Home
          </button>
          <button 
            className={`nav-item ${activeTab === 'live' ? 'active' : ''}`}
            onClick={() => setActiveTab('live')}
          >
            <span className="nav-icon">🔴</span>
            Live
          </button>
          <button 
            className={`nav-item ${activeTab === 'reels' ? 'active' : ''}`}
            onClick={() => setActiveTab('reels')}
          >
            <span className="nav-icon">🎥</span>
            Reels
          </button>
          <button 
            className={`nav-item ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <span className="nav-icon">💾</span>
            Saved Videos
            {savedVideos.length > 0 && (
              <span className="saved-count">{savedVideos.length}</span>
            )}
          </button>
        </nav>
      </div>

      <div className="videos-content">
        {activeTab === 'home' && (
          <div className="videos-home">
            <section className="videos-section">
              <h3>Recommended for You</h3>
              <div className="videos-grid">
                {videos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </section>
          </div>
        )}
        
        {activeTab === 'live' && (
          <div className="live-videos">
            <h3>Live Videos</h3>
            <div className="videos-grid">
              {liveStreams.map(stream => (
                <VideoCard key={stream.id} video={stream} type="live" />
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'reels' && (
          <div className="reels-section">
            <h3>Reels</h3>
            <div className="reels-grid">
              {reels.map(reel => (
                <ReelCard key={reel.id} reel={reel} />
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'saved' && (
          <div className="saved-videos">
            <h3>Saved Videos</h3>
            {savedVideos.length > 0 ? (
              <div className="videos-grid">
                {videos
                  .filter(video => savedVideos.includes(video.id))
                  .map(video => (
                    <VideoCard key={video.id} video={video} />
                  ))}
              </div>
            ) : (
              <div className="no-saved-videos">
                <div className="no-saved-icon">💾</div>
                <h4>No saved videos</h4>
                <p>Videos you save will appear here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;