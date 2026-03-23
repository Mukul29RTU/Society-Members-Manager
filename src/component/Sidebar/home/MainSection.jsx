import React from 'react';
import { FaHistory, FaGem, FaUsers } from 'react-icons/fa';

const AgrasenSection = () => {
  const surnames = [
    "Garg", "Goyal", "Goyan", "Bansal", "Kansal", "Singhal", 
    "Jindal", "Tingal", "Airan", "Dharan", "Madhukul", "Bindal", 
    "Mittal", "Tayal", "Bhandal", "Nangal", "Kuchhal", "Jaitun"
  ];

  return (
    <section className="container-fluid py-2">
      <div className="bg-white rounded-4 shadow-sm border p-4 p-lg-4 overflow-hidden position-relative">
        
        {/* Subtle Decorative Background Element */}
        <div className="position-absolute top-0 end-0 p-5 opacity-10 d-none d-md-block" style={{ pointerEvents: 'none' }}>
            <FaGem size={150} className="text-primary" />
        </div>

        <div className="row align-items-center position-relative">
          {/* Left Side: Image & Title */}
          <div className="col-xl-4 text-center mb-5 mb-xl-0">
            <div className="position-relative d-inline-block">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmv6-zCm74PbXTCgGJKpMBCnErwQf-z3dYrg&s" 
                alt="Maharaja Agrasen" 
                className="img-fluid rounded-4 shadow-lg border border-5 border-white transition-hover"
                style={{ maxHeight: '420px', transition: 'transform 0.3s ease' }}
              />
              <div className="bg-primary text-white p-3 rounded-3 shadow-sm position-absolute bottom-0 start-50 translate-middle-x w-75 mb-n3">
                <h5 className="mb-0 fw-bold">Maharaja Agrasen</h5>
                <small className="opacity-75">Messenger of Peace</small>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="col-xl-8">
            <div className="ps-xl-4">
              <div className="mb-4">
                <span className="badge bg-primary-subtle text-primary mb-2 px-3 py-2 rounded-pill fw-bold">
                  <FaHistory className="me-2" /> Legacy of Agrawal Society
                </span>
                <h2 className="display-6 fw-bold text-dark">Propounder of Socialism</h2>
                <p className="text-muted fs-6">
                  Maharaja Agrasen established the 18 Gotras based on the names of his 18 sons. 
                  He preached the principle of <strong>"One Rupee and One Brick"</strong>, 
                  where every family in the kingdom contributed to help newcomers settle.
                </p>
              </div>

              <h4 className="fw-bold text-dark mb-3 d-flex align-items-center">
                <FaUsers className="text-primary me-2" /> The 18 Gotras
              </h4>
              
              <div className="row g-3">
                {[0, 1, 2].map(colIdx => (
                  <div className="col-lg-4 col-md-6" key={colIdx}>
                    {surnames.slice(colIdx * 6, (colIdx + 1) * 6).map((name, i) => (
                      <div 
                        key={i} 
                        className="gotra-card d-flex align-items-center mb-2 p-2 bg-light rounded-3 border-start border-primary border-4 shadow-sm"
                        style={{ transition: 'all 0.2s ease' }}
                      >
                        <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center fw-bold me-3" 
                             style={{ minWidth: '28px', height: '28px', fontSize: '12px' }}>
                          {colIdx * 6 + i + 1}
                        </div>
                        <span className="fw-bold text-dark-emphasis">{name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded CSS for Hover Effects */}
      <style>{`
        .gotra-card:hover {
          transform: translateX(10px);
          background-color: #f8f9fa !important;
          border-color: #0d6efd !important;
          cursor: default;
        }
        .transition-hover:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default AgrasenSection;