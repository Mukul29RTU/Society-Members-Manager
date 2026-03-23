import React from 'react';
import AgrasenSection from './MainSection';
import Gallery from './gallery';
import { FaUserFriends, FaBuilding, FaAward } from 'react-icons/fa';

function Home() {
  return (
    <div className="container-fluid animate__animated animate__fadeIn">
      {/* 1. Welcome Header */}
      <div className="mb-2 ps-2">
        <h1 className="fw-bold mt-2 text-dark">Welcome to Agrawal Society</h1>
        <p className="text-muted">Preserving our heritage, building our future.</p>
      </div>

      {/* 2. Hero Section (Agrasen Section) */}
      <AgrasenSection />

      {/* 3. Quick Stats (New Addition for a complete look) */}
      {/* <div className="row g-4 my-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white">
            <FaUserFriends className="text-primary fs-1 mb-3 mx-auto" />
            <h3 className="fw-bold mb-0">500+</h3>
            <small className="text-muted text-uppercase fw-bold">Active Members</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white">
            <FaBuilding className="text-success fs-1 mb-3 mx-auto" />
            <h3 className="fw-bold mb-0">12</h3>
            <small className="text-muted text-uppercase fw-bold">Local Wards</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white">
            <FaAward className="text-warning fs-1 mb-3 mx-auto" />
            <h3 className="fw-bold mb-0">18</h3>
            <small className="text-muted text-uppercase fw-bold">Gotras Represented</small>
          </div>
        </div>
      </div> */}

      {/* 4. Gallery Section */}
      {/* <div className="mt-5">
        <div className="d-flex align-items-center mb-4 ps-2">
          <h2 className="fw-bold mb-0 me-3">Society Gallery</h2>
          <hr className="flex-grow-1 opacity-25" />
        </div>
        <Gallery />
      </div> */}

      {/* Footer Spacer */}
      <div className="py-5"></div>
    </div>
  );
}

export default Home;