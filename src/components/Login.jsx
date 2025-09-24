import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="facebook-logo-text">facebook</div>
          <p className="tagline">
            Connect with friends and the world around you on Facebook.
          </p>
        </div>
        
        <div className="login-right">
          <div className="login-card">
            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="email"
                name="email"
                placeholder="Email or phone number"
                value={formData.email}
                onChange={handleInputChange}
                className="login-input"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="login-input"
                required
              />
              
              {error && <div className="error-message">{error}</div>}
              
              <button
                type="submit"
                className={`login-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
              
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
              
              <div className="divider"></div>
              
              <button type="button" className="create-account-btn">
                Create new account
              </button>
            </form>
          </div>
          
          <div className="login-footer">
            <p>
              <strong>Create a Page</strong> for a celebrity, brand or business.
            </p>
          </div>
          
          <div className="demo-credentials">
            <h4>Demo Credentials:</h4>
            <p>Email: neizvest@gmail.com</p>
            <p>Password: 8813013</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;