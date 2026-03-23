import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-top py-4 mt-auto">
      <div className="container-fluid px-4">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <span className="text-muted">Agrawal Society Management System | Contact: +91 98765 43210</span>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <a href="#" className="text-muted me-3 fs-5"><FaFacebook /></a>
            <a href="#" className="text-muted me-3 fs-5"><FaInstagram /></a>
            <a href="#" className="text-primary fs-5"><FaWhatsapp /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;