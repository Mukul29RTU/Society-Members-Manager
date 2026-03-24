import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaHome, FaUsers, FaUser, FaDatabase, 
  FaSignOutAlt, FaUserCircle, FaBars, FaTimes 
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile toggle state
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Dashboard', path: '/dashboard', icon: <FaDatabase /> },
    { name: 'Members', path: '/members', icon: <FaUsers />, adminOnly: true },
    { name: 'Add Member', path: '/add-member', icon: <FaUser />, adminOnly: true },
    { name: 'Past Members', path: '/pastMember', icon: <FaUsers />, adminOnly: true },
  ];

  const { logout, user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate('/');
    }
  };

  // Function to close sidebar when a link is clicked on mobile
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* 1. MOBILE TOGGLE BUTTON (Floating) */}
      <button 
        className="btn btn-primary d-lg-none position-fixed shadow-lg"
        style={{ top: '15px', left: '15px', zIndex: 1100, borderRadius: '10px' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* 2. BACKDROP (Click to close on mobile) */}
      {isOpen && (
        <div 
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-black opacity-50"
          style={{ zIndex: 1040 }}
          onClick={closeSidebar}
        ></div>
      )}

      {/* 3. SIDEBAR CONTAINER */}
      <div 
        className={`bg-dark text-white shadow-lg d-flex flex-column p-3 transition-transform
          position-fixed top-0 start-0 h-100`}
        style={{ 
          width: '280px', 
          zIndex: 1050, 
          transition: 'transform 0.3s ease-in-out',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', // Default hidden on mobile
        }}
      >
        {/* CSS Override for Desktop: Force sidebar visible */}
        <style>{`
          @media (min-width: 992px) {
            .transition-transform { 
              transform: translateX(0) !important; 
            }
          }
        `}</style>
        
        {/* Brand Logo */}
        <div className="d-flex align-items-center mb-4 mt-2 px-2">
          <div className="bg-primary rounded px-2 py-1 me-2 fw-bold shadow-sm">AS</div>
          <span className="fs-4 fw-bold tracking-tight">Agrawal Society</span>
        </div>
        
        <hr className="opacity-25" />

        {/* Navigation Menu */}
        <ul className="nav nav-pills flex-column mb-auto">
          {menuItems.filter(item => !item.adminOnly || user?.role === 'ROLE_ADMIN').map((item) => (
            <li className="nav-item mb-2" key={item.name}>
              <Link 
                to={item.path} 
                onClick={closeSidebar}
                className={`nav-link d-flex align-items-center gap-3 text-white py-2 px-3 rounded-3
                  ${location.pathname === item.path ? 'active shadow-primary' : 'hover-opacity'}`}
                style={{ transition: '0.2s' }}
              >
                <span className="fs-5">{item.icon}</span>
                <span className="fw-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* User & Footer Section */}
        <div className="mt-auto">
          <hr className="opacity-25" />
          
          <Link 
            to={`/profile/${user?.email || 'unknown'}`} 
            onClick={closeSidebar}
            className={`nav-link d-flex align-items-center gap-3 text-white mb-3 p-2 rounded-3
              ${location.pathname === '/profile' ? 'bg-secondary bg-opacity-25' : ''}`}
          >
            <FaUserCircle size={32} className="text-primary" />
            <div className="overflow-hidden">
              <div className="fw-bold small text-truncate">Your Profile</div>
              <div className="text-primary" style={{ fontSize: '11px' }}>{user?.email || 'admin@agrawal.com'}</div>
            </div>
          </Link>

          <button 
            onClick={handleLogout}
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 border-0 mb-2 py-2"
          >
            <FaSignOutAlt />
            <span className="fw-bold">Logout</span>
          </button>

          <div className="text-muted text-center py-2" style={{ fontSize: '10px', letterSpacing: '1px' }}>
            © 2026 AGRAWAL SOCIETY
          </div>
        </div>
      </div>

      {/* Global CSS for hover effects */}
      <style>{`
        .nav-link.active { background-color: #0d6efd !important; }
        .hover-opacity:hover { background-color: rgba(255,255,255,0.1); }
        .shadow-primary { box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3); }
      `}</style>
    </>
  );
};

export default Sidebar;