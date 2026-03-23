import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaKey, FaArrowLeft, FaUserPlus, FaCheckCircle } from 'react-icons/fa';
import api from '../../utils/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setError('');
    setLoading(true);
    try {
      await api.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register/sendotp`, { email });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || err.response?.message || err.response || 'OTP भेजने में विफल');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await api.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register/validateotp`, { email, otp });
      // Capturing the token from the response
      const token = response.data?.data || response.data || response;
      setVerificationToken(token);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || err.response?.message || err.response || 'अमान्य OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register/adduser`, { 
        email, 
        token: verificationToken, 
        password 
      });
      alert('रजिस्ट्रेशन सफल! कृपया लॉगिन करें।');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || err.response?.message || err.response || 'रजिस्ट्रेशन विफल');
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
          maxWidth: '420px', 
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.98)' 
        }}
      >
        <div className="card-body p-4 p-md-5">
          {/* Header Section */}
          <div className="text-center mb-4">
            <div 
              className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle mb-3 shadow" 
              style={{ width: '65px', height: '65px', fontSize: '24px', fontWeight: 'bold' }}
            >
              AS
            </div>
            <h3 className="fw-bold text-dark mb-1">Create Account</h3>
            <p className="text-muted small">Agrawal Society पोर्टल से जुड़ें</p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small border-0 rounded-3 text-center mb-4">
              {error}
            </div>
          )}

          {/* STEP 1: EMAIL */}
          {step === 1 && (
            <div className="animate__animated animate__fadeIn">
              <div className="mb-4">
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
                    placeholder="example@mail.com"
                    style={{ fontSize: '15px' }}
                  />
                </div>
              </div>
              <button 
                className="btn btn-primary btn-lg w-100 shadow rounded-3 fw-bold py-2" 
                onClick={handleSendOtp}
                disabled={loading || !email}
              >
                {loading ? <span className="spinner-border spinner-border-sm"></span> : 'OTP भेजें'}
              </button>
            </div>
          )}

          {/* STEP 2: OTP */}
          {step === 2 && (
            <div className="animate__animated animate__fadeIn">
              <div className="text-center mb-3">
                <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                  Code sent to {email}
                </span>
              </div>
              <div className="mb-4">
                <label className="form-label text-muted small fw-bold d-block text-center">Enter OTP</label>
                <div className="input-group bg-light rounded-3 px-3 py-1 border-0">
                  <span className="input-group-text bg-transparent border-0 ps-0 text-muted">
                    <FaKey />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-transparent border-0 shadow-none ps-2 text-center fw-bold"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="000000"
                    maxLength={6}
                    style={{ fontSize: '18px', letterSpacing: '4px' }}
                  />
                </div>
              </div>
              <button 
                className="btn btn-success btn-lg w-100 shadow rounded-3 fw-bold py-2" 
                onClick={handleVerifyOtp}
                disabled={loading || !otp}
              >
                {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Verify OTP'}
              </button>
              <div className="text-center mt-3">
                <button className="btn btn-link btn-sm text-decoration-none" onClick={() => setStep(1)}>
                  ईमेल बदलें
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PASSWORD */}
          {step === 3 && (
            <form onSubmit={handleRegister} className="animate__animated animate__fadeIn">
              <div className="mb-4">
                <label className="form-label text-muted small fw-bold">Set Password</label>
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
                    placeholder="Min. 6 characters"
                    style={{ fontSize: '15px' }}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="btn btn-success btn-lg w-100 shadow rounded-3 fw-bold py-2" 
                disabled={loading}
              >
                {loading ? <span className="spinner-border spinner-border-sm"></span> : <><FaCheckCircle className="me-2" /> Complete Registration</>}
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-muted small mb-0">
              Already have an account? 
              <Link to="/login" className="text-primary fw-bold text-decoration-none ms-2">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;