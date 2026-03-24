import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaKey, FaArrowLeft, FaPaperPlane, FaShieldAlt } from 'react-icons/fa';
import api from '../../utils/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  // Step Control: 'email', 'otp', or 'reset'
  const [step, setStep] = useState('email'); 
  
  // Form Data
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState(''); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Request OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError('');
    try {
      
      await api.post(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password/sendotp`, { email });
        console.log("Requesting OTP for email:", email);
      setStep('otp');
    } catch (err) {
      setError(err.response?.data?.message || "ईमेल नहीं मिला। कृपया पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  };

  // 2. Validate OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password/validateotp`, { email, otp });
      console.log("OTP Validation Response:", response);
      setToken(response); 
      setStep('reset');
    } catch (err) {
      setError("अमान्य या एक्सपायर OTP।");
    } finally {
      setLoading(false);
    }
  };

  // 3. Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("पासवर्ड मैच नहीं कर रहे हैं।");
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password/reset`, { email, token, newPassword });
      alert("पासवर्ड सफलतापूर्वक बदल गया है!");
      navigate('/');
    } catch (err) {
      setError("पासवर्ड रिसेट करने में विफल। सेशन एक्सपायर हो सकता है।");
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
          {/* Icon Header */}
          <div className="text-center mb-4">
            <div 
              className="d-inline-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle mb-3 shadow-sm" 
              style={{ width: '65px', height: '65px', fontSize: '24px' }}
            >
              {step === 'email' && <FaEnvelope />}
              {step === 'otp' && <FaKey />}
              {step === 'reset' && <FaShieldAlt />}
            </div>
            <h3 className="fw-bold text-dark mb-1">
              {step === 'email' && "पासवर्ड भूल गए?"}
              {step === 'otp' && "OTP सत्यापित करें"}
              {step === 'reset' && "नया पासवर्ड"}
            </h3>
            <p className="text-muted small">
              {step === 'email' && "रजिस्टर्ड ईमेल पर OTP प्राप्त करें"}
              {step === 'otp' && `${email} पर भेजा गया कोड दर्ज करें`}
              {step === 'reset' && "अपना नया पासवर्ड सेट करें"}
            </p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small border-0 rounded-3 text-center mb-4">
              {error}
            </div>
          )}

          {/* STEP 1: EMAIL FORM */}
          {step === 'email' && (
            <form onSubmit={handleSendOtp}>
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
                    required
                    placeholder="name@example.com"
                    style={{ fontSize: '15px' }}
                  />
                </div>
              </div>
              <button className="btn btn-primary btn-lg w-100 shadow rounded-3 fw-bold py-2" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm"></span> : <><FaPaperPlane className="me-2" /> OTP भेजें</>}
              </button>
            </form>
          )}

          {/* STEP 2: OTP FORM */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4">
                <label className="form-label text-muted small fw-bold d-block text-center">Enter 6-Digit OTP</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg bg-light border-0 text-center fw-bold rounded-3" 
                  style={{ letterSpacing: '8px', fontSize: '24px' }}
                  maxLength="6" 
                  placeholder="000000" 
                  required
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button className="btn btn-success btn-lg w-100 shadow rounded-3 fw-bold py-2" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm"></span> : "OTP सत्यापित करें"}
              </button>
              <div className="text-center mt-3">
                <button type="button" className="btn btn-link btn-sm text-decoration-none" onClick={() => setStep('email')}>
                  ईमेल बदलें
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: RESET FORM */}
          {step === 'reset' && (
            <form onSubmit={handleResetPassword}>
              <div className="mb-3">
                <label className="form-label text-muted small fw-bold">नया पासवर्ड</label>
                <div className="input-group bg-light rounded-3 px-3 py-1 border-0">
                  <span className="input-group-text bg-transparent border-0 ps-0 text-muted">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    className="form-control bg-transparent border-0 shadow-none ps-2"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="New Password"
                    style={{ fontSize: '15px' }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label text-muted small fw-bold">पासवर्ड कंफर्म करें</label>
                <div className="input-group bg-light rounded-3 px-3 py-1 border-0">
                  <span className="input-group-text bg-transparent border-0 ps-0 text-muted">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    className="form-control bg-transparent border-0 shadow-none ps-2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm Password"
                    style={{ fontSize: '15px' }}
                  />
                </div>
              </div>
              <button className="btn btn-primary btn-lg w-100 shadow rounded-3 fw-bold py-2" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm"></span> : "पासवर्ड अपडेट करें"}
              </button>
            </form>
          )}

          <div className="text-center mt-4">
            <Link to="/" className="text-decoration-none text-muted small fw-bold">
              <FaArrowLeft className="me-1" /> वापस लॉगिन पर जाएं
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;