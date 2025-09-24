import { useState, useEffect } from 'react';
import { fakeStories } from '../data/fakeUsers';
import { useAuth } from '../contexts/AuthContext';
import './Stories.css';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [viewingStory, setViewingStory] = useState(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [userStories, setUserStories] = useState([]);
  
  const { currentUser } = useAuth();

  useEffect(() => {
    setStories(fakeStories);
  }, []);

  useEffect(() => {
    let interval;
    if (viewingStory) {
      setStoryProgress(0);
      interval = setInterval(() => {
        setStoryProgress(prev => {
          if (prev >= 100) {
            setViewingStory(null);
            return 0;
          }
          return prev + 2;
        });
      }, 60);
    }
    return () => clearInterval(interval);
  }, [viewingStory]);

  const handleAddStory = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newStory = {
            id: Date.now(),
            userId: currentUser.id,
            user: currentUser,
            image: e.target.result,
            timestamp: new Date().toISOString()
          };
          setUserStories([...userStories, newStory]);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const viewStory = (story) => {
    setViewingStory(story);
  };

  const allStories = [...userStories, ...stories];

  return (
    <>
      <div className="stories-container">
        <div className="stories-scroll">
          <div className="create-story-card" onClick={handleAddStory}>
            <div className="story-image">
              <img src={currentUser?.avatar} alt="Your story" />
              <div className="add-story-overlay">
                <span className="add-icon">+</span>
              </div>
            </div>
            <div className="story-label">Create Story</div>
          </div>

          {allStories.map(story => (
            <div
              key={story.id}
              className="story-card"
              onClick={() => viewStory(story)}
            >
              <div className="story-image">
                <img src={story.image} alt={`${story.user.name}'s story`} />
                <div className="story-ring"></div>
              </div>
              <div className="story-user">
                <img src={story.user.avatar} alt={story.user.name} className="story-avatar" />
                <span className="story-name">{story.user.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {viewingStory && (
        <div className="story-viewer" onClick={() => setViewingStory(null)}>
          <div className="story-content" onClick={(e) => e.stopPropagation()}>
            <div className="story-header">
              <div className="story-progress">
                <div 
                  className="progress-bar" 
                  style={{ width: `${storyProgress}%` }}
                ></div>
              </div>
              <div className="story-user-info">
                <img src={viewingStory.user.avatar} alt={viewingStory.user.name} />
                <span>{viewingStory.user.name}</span>
                <span className="story-time">
                  {new Date(viewingStory.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <button 
                className="close-story"
                onClick={() => setViewingStory(null)}
              >
                ✕
              </button>
            </div>
            <div className="story-media">
              <img src={viewingStory.image} alt="Story" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Stories;