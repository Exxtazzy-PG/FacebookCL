import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const VALID_CREDENTIALS = {
    email: 'neizvest@gmail.com',
    password: '8813013'
  };

  const CURRENT_USER = {
    id: 1,
    name: 'John Doe',
    email: 'neizvest@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    coverPhoto: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=850&h=300&fit=crop',
    bio: 'Software Developer | Tech Enthusiast | Coffee Lover',
    location: 'New York, NY',
    joined: 'January 2020',
    friends: 487,
    following: 234
  };

  useEffect(() => {
    const token = localStorage.getItem('fb_token');
    const userData = localStorage.getItem('fb_user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
      localStorage.setItem('fb_token', 'authenticated');
      localStorage.setItem('fb_user', JSON.stringify(CURRENT_USER));
      setIsAuthenticated(true);
      setCurrentUser(CURRENT_USER);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    localStorage.removeItem('fb_token');
    localStorage.removeItem('fb_user');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const value = {
    isAuthenticated,
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};