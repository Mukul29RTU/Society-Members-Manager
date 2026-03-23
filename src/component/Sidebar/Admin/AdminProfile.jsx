import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FaUserShield, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaCalendarAlt, FaEdit, FaArrowLeft, FaCamera 
} from 'react-icons/fa';
import api from '../../../utils/api';

const AdminProfile = () => {
  const navigate = useNavigate();
  const { email } = useParams();

  
  const [member, setMember] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true); 
        const data = await api.get(`/supabase/get/userData/${email}`);
   
            setMember(data); // Set the actual member object
       
      } catch (err) {
        setError(err.response?.data?.message || err.message || "सदस्य का विवरण लोड करने में असमर्थ।");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, []);

  // Mock Admin Data - This would normally come from your Auth Context or API
  const adminData = {
    fullName: member?.नाम || 'Admin Name',
    email: email || 'admin2gmail.com',
    phone: member?.संपर्क || 'N/A',
    address: member?.पता || 'N/A',
    serial: member?.सदस्य_नंबर ||'N/A'
  };

  return (
    <div className="container-fluid py-2">
      {/* Top Navigation */}
      <div className="mb-2">
        <button className="btn btn-outline-secondary border-0" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" /> Back
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-xl-9">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            {/* Header Banner */}
            <div className="bg-primary p-5 position-relative" style={{ height: '160px' }}>
              <div className="position-absolute top-100 start-0 translate-middle-y ps-5 d-flex align-items-end">
                <div className="position-relative">
                  <div className="bg-white p-1 rounded-circle shadow">
                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                      <FaUserShield size={60} className="text-primary" />
                    </div>
                  </div>
                  <button className="btn btn-sm btn-dark position-absolute bottom-0 end-0 rounded-circle p-2 shadow">
                    <FaCamera size={12} />
                  </button>
                </div>
                <div className="ms-4 mb-2">
                  <h4 className="fw-bold mb-0">{adminData.fullName}</h4>
                  <span className="badge bg-dark-subtle text-dark border">{adminData.role}</span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="card-body p-5 mt-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Personal Information</h5>
             <button className="btn btn-warning rounded-pill px-4 shadow-sm fw-bold" onClick={() => navigate(`/editProfile/${member["सदस्य_नंबर"]}`)} >
                             <FaEdit className="me-2" /> सुधारें (Edit)
                           </button>
                          
              </div>

              <div className="row g-4">
                {/* Information Grid */}
                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-3">
                    <FaEnvelope className="text-primary mt-1" />
                    <div>
                      <small className="text-muted d-block fw-bold text-uppercase">Email Address</small>
                      <span className="text-dark fw-medium">{adminData.email}</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-3">
                    <FaPhone className="text-primary mt-1" />
                    <div>
                      <small className="text-muted d-block fw-bold text-uppercase">Phone Number</small>
                      <span className="text-dark fw-medium">{adminData.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-3">
                    <FaCalendarAlt className="text-primary mt-1" />
                    <div>
                      <small className="text-muted d-block fw-bold text-uppercase">Serial Number</small>
                      <span className="text-dark fw-medium">{adminData.serial}</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-3 h-100">
                    <FaMapMarkerAlt className="text-primary mt-1" />
                    <div>
                      <small className="text-muted d-block fw-bold text-uppercase">Location</small>
                      <span className="text-dark fw-medium">{adminData.address}</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-3 h-100">
                    <FaMapMarkerAlt className="text-primary mt-1" />
                    <div>
                      <small className="text-muted d-block fw-bold text-uppercase">Ward Number</small>
                      <span className="text-dark fw-medium">{member?.वार्ड_संख्या || 'NA'} </span>
                    </div>
                  </div>
                </div>

               <div className="col-md-6">
                  <div className="d-flex align-items-start gap-3 p-3 bg-light rounded-3 h-100">
                    <FaMapMarkerAlt className="text-primary mt-1" />
                    <div>
                      <small className="text-muted d-block fw-bold text-uppercase">Identity</small>
                      <span className="text-dark fw-medium">{member?.पहचान || 'NA'}</span>
                    </div>
                  </div>
                </div>



              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;