import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import api from '../../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      // Handling both nested and direct data structures
      const loginData = response.data?.data || response.data || response;
      login({ email, role: loginData.role }, loginData.token); 
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'ईमेल या पासवर्ड गलत है');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
        padding: '20px'
      }}
    >
      <div 
        className="card border-0 shadow-lg animate__animated animate__fadeIn" 
        style={{ 
          width: '100%', 
          maxWidth: '400px', 
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.98)' 
        }}
      >
        <div className="card-body p-4 p-md-5">
          {/* Logo Circle */}
          <div className="text-center mb-4">
            <div 
              className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle mb-3 shadow" 
              style={{ width: '65px', height: '65px', fontSize: '24px', fontWeight: 'bold' }}
            >
              AS
            </div>
            <h3 className="fw-bold text-dark mb-0">Welcome Back</h3>
            <p className="text-muted small">Agrawal Society Portal</p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small border-0 rounded-3 text-center mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label text-muted small fw-bold">Email Address</label>
              <div className="input-group bg-light rounded-3 px-3 py-1 border-0">
                <span className="input-group-text bg-transparent border-0 ps-0 text-muted">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  className="form-control bg-transparent border-0 shadow-none ps-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  style={{ fontSize: '15px' }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <div className="d-flex justify-content-between">
                <label className="form-label text-muted small fw-bold">Password</label>
                <Link to="/forgot-password" size="sm" className="text-primary text-decoration-none small fw-bold">
                  Forgot?
                </Link>
              </div>
              <div className="input-group bg-light rounded-3 px-3 py-1 border-0">
                <span className="input-group-text bg-transparent border-0 ps-0 text-muted">
                  <FaLock />
                </span>
                <input
                  type="password"
                  className="form-control bg-transparent border-0 shadow-none ps-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{ fontSize: '15px' }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-lg w-100 mb-3 shadow rounded-3 fw-bold py-2 d-flex align-items-center justify-content-center" 
              disabled={loading}
              style={{ letterSpacing: '0.5px' }}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                <><FaSignInAlt className="me-2" /> Login</>
              )}
            </button>
          </form>

          {/* Footer links */}
          <div className="text-center mt-4">
            <p className="text-muted small mb-0">
              खाता नहीं है? 
              <Link to="/register" className="text-primary fw-bold text-decoration-none ms-2">
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;