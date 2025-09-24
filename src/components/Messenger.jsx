import { useState, useEffect } from 'react';
import { fakeUsers } from '../data/fakeUsers';
import { useAuth } from '../contexts/AuthContext';
import './Messenger.css';

const Messenger = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { currentUser } = useAuth();

  const conversations = fakeUsers.map(user => ({
    id: user.id,
    user,
    lastMessage: {
      text: user.id === 2 ? "Hey! How's it going?" : user.id === 3 ? "Thanks for sharing that!" : "Looking forward to our meeting",
      timestamp: new Date(Date.now() - user.id * 60 * 60 * 1000),
      isRead: user.id !== 2
    }
  }));

  useEffect(() => {
    // Initialize messages for each user
    const initialMessages = {};
    fakeUsers.forEach(user => {
      initialMessages[user.id] = [
        {
          id: 1,
          text: user.id === 2 ? "Hey! How's it going?" : user.id === 3 ? "Thanks for sharing that!" : "Looking forward to our meeting",
          sender: user.id,
          timestamp: new Date(Date.now() - user.id * 60 * 60 * 1000),
          isRead: true
        }
      ];
    });
    setMessages(initialMessages);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: currentUser.id,
        timestamp: new Date(),
        isRead: false
      };
      
      setMessages(prev => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), message]
      }));
      
      setNewMessage('');
      
      // Simulate response
      setTimeout(() => {
        const response = {
          id: Date.now() + 1,
          text: "Thanks for your message!",
          sender: selectedChat.id,
          timestamp: new Date(),
          isRead: false
        };
        
        setMessages(prev => ({
          ...prev,
          [selectedChat.id]: [...(prev[selectedChat.id] || []), response]
        }));
      }, 1000 + Math.random() * 2000);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="messenger">
      <div className="messenger-sidebar">
        <div className="messenger-header">
          <h2>Chats</h2>
          <div className="messenger-actions">
            <button className="messenger-btn">⚙️</button>
            <button className="messenger-btn">✏️</button>
          </div>
        </div>
        
        <div className="messenger-search">
          <input
            type="text"
            placeholder="Search Messenger"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="conversations-list">
          {filteredConversations.map(conversation => (
            <div
              key={conversation.id}
              className={`conversation-item ${selectedChat?.id === conversation.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(conversation.user)}
            >
              <div className="conversation-avatar">
                <img src={conversation.user.avatar} alt={conversation.user.name} />
                {conversation.user.isOnline && <div className="online-indicator"></div>}
              </div>
              <div className="conversation-info">
                <div className="conversation-header">
                  <div className="conversation-name">{conversation.user.name}</div>
                  <div className="conversation-time">
                    {formatTime(conversation.lastMessage.timestamp)}
                  </div>
                </div>
                <div className="conversation-preview">
                  <span className={`last-message ${!conversation.lastMessage.isRead ? 'unread' : ''}`}>
                    {conversation.lastMessage.text}
                  </span>
                  {!conversation.lastMessage.isRead && <div className="unread-dot"></div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="messenger-main">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <div className="chat-user-info">
                <img src={selectedChat.avatar} alt={selectedChat.name} />
                <div>
                  <div className="chat-user-name">{selectedChat.name}</div>
                  <div className="chat-user-status">
                    {selectedChat.isOnline ? 'Active now' : 'Last seen recently'}
                  </div>
                </div>
              </div>
              <div className="chat-actions">
                <button className="chat-btn">📞</button>
                <button className="chat-btn">📹</button>
                <button className="chat-btn">ℹ️</button>
              </div>
            </div>

            <div className="chat-messages">
              {messages[selectedChat.id]?.map(message => (
                <div
                  key={message.id}
                  className={`message ${message.sender === currentUser.id ? 'sent' : 'received'}`}
                >
                  <div className="message-bubble">
                    {message.text}
                  </div>
                  <div className="message-time">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-form">
              <div className="chat-input-container">
                <button type="button" className="chat-emoji-btn">😊</button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="chat-input"
                />
                <button type="button" className="chat-attach-btn">📎</button>
                <button 
                  type="submit" 
                  className="chat-send-btn"
                  disabled={!newMessage.trim()}
                >
                  ➤
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="no-chat-content">
              <div className="no-chat-icon">💬</div>
              <h3>Your Messages</h3>
              <p>Send private photos and messages to a friend or group.</p>
              <button className="send-message-btn">Send Message</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messenger;