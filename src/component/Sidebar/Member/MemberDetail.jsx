import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../../../utils/api';
import { useAuth } from '../../../context/AuthContext';
import { 
  FaArrowLeft, FaEdit, FaTrash, FaUserCircle, 
  FaMapMarkerAlt, FaPhoneAlt, FaIdCard, FaSpinner, FaHistory 
} from 'react-icons/fa';

const MemberDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const memberCategory = location.state?.myData; 
  const { user } = useAuth();
  
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberDetail = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint for a single member
        const response = await api.get(`/supabase/get/${id}`);
        setMember(response);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError("सदस्य का विवरण लोड करने में असमर्थ।");
        setLoading(false);
      }
    };
    fetchMemberDetail();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("क्या आप वाकई इस सदस्य को हटाना चाहते हैं?")) {
      try {
        if(memberCategory === "present_member") {
          await api.delete(`/supabase/delete/${id}`);
        } else if(memberCategory === "past_member") {
          await api.delete(`/supabase/delete/pastMember/${id}`);
        }
      
        alert("सदस्य सफलतापूर्वक हटा दिया गया");
        navigate('/members');
      } catch (err) {
        alert("हटाने में विफल। कृपया पुन: प्रयास करें।");
      }
    }
  };

  if (loading) return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '70vh' }}>
      <FaSpinner className="spinner-border text-primary mb-3" />
      <h5 className="text-primary">विवरण लोड हो रहा है...</h5>
    </div>
  );

  if (error || !member) return (
    <div className="container py-5 text-center">
      <div className="alert alert-danger">{error || "डेटा नहीं मिला"}</div>
      <button className="btn btn-primary" onClick={() => navigate('/members')}>वापस जाएं</button>
    </div>
  );

  return (
    <div className="container-fluid py-4">
      {/* Top Navigation Row */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-6 mb-3 mb-md-0">
          <button className="btn btn-outline-dark border-0 shadow-sm rounded-pill px-4" onClick={() => navigate(-1)}>
            <FaArrowLeft className="me-2" /> पीछे जाएं (Back)
          </button>
        </div>
        <div className="col-md-6 text-md-end">
          {user?.role === 'ROLE_ADMIN' && (
            <div className="d-flex gap-2 justify-content-md-end">
              <button className="btn btn-warning rounded-pill px-4 shadow-sm fw-bold" onClick={() => {if(memberCategory == "present_member") {navigate(`/editMember/${id} `)} else {alert("केवल वर्तमान सदस्यों को संपादित किया जा सकता है।")}}}>
                <FaEdit className="me-2" /> सुधारें (Edit)
              </button>
              <button className="btn btn-danger rounded-pill px-4 shadow-sm fw-bold" onClick={handleDelete}>
                <FaTrash className="me-2" /> हटाएं (Delete)
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
            
            {/* Professional Header Banner */}
            <div className="bg-primary p-4 p-md-5 text-white position-relative">
              <div className="d-md-flex align-items-center gap-4 text-center text-md-start">
                <div className="bg-white p-2 rounded-circle shadow-lg d-inline-block">
                  <FaUserCircle className="text-primary" size={50} />
                </div>
                <div className="mt-3 mt-md-0">
                  <h5 className="fw-bold mb-1">{member["नाम"]}</h5>
                  <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                    <span className="badge bg-white text-primary rounded-pill px-3 py-2">
                       <FaIdCard className="me-1" /> सदस्य नंबर: {member["सदस्य_नंबर"]}
                    </span>
                    <span className="badge bg-dark-subtle text-dark rounded-pill px-3 py-2">
                       {member["वार्ड_संख्या"]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body p-2 p-md-5">
              <h5 className="fw-bold mb-4 border-bottom pb-2">सदस्य की पूरी जानकारी (Member Details)</h5>
              
              <div className="row g-4">
                {/* Father's Name */}
                <div className="col-md-6">
                  <div className="p-4 bg-light rounded-4 border-start border-primary border-5 shadow-sm">
                    <label className="text-muted small fw-bold text-uppercase d-block mb-1">नाम (Name)</label>
                    <span className="fs-8 fw-bold text-dark">{member["नाम"]}</span>
                  </div>
                </div>

                {/* Contact Number */}
                <div className="col-md-6">
                  <div className="p-4 bg-success-subtle rounded-4 border-start border-success border-5 shadow-sm">
                    <label className="text-muted small fw-bold text-uppercase d-block mb-1 text-success">
                      <FaPhoneAlt className="me-2" /> संपर्क सूत्र (Contact)
                    </label>
                    <span className="fs-8 fw-bold text-success">{member["संपर्क"]}</span>
                  </div>
                </div>

                {/* Ward Details */}
                <div className="col-md-6">
                  <div className="p-4 bg-info-subtle rounded-4 border-start border-info border-5 shadow-sm h-100">
                    <label className="text-muted small fw-bold text-uppercase d-block mb-1 text-info">वार्ड विवरण (Ward)</label>
                    <span className="fs-8 fw-bold text-dark">{member["वार्ड_संख्या"]}</span>
                  </div>
                </div>

                {/* Address */}
                <div className="col-md-6">
                  <div className="p-4 bg-warning-subtle rounded-4 border-start border-warning border-5 shadow-sm h-100">
                    <label className="text-muted small fw-bold text-uppercase d-block mb-1 text-warning">
                      <FaMapMarkerAlt className="me-2" /> निवास स्थान (Address)
                    </label>
                    <span className="fs-6 text-dark fw-medium d-block">{member["पता"]}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-4 bg-warning-subtle rounded-4 border-start border-warning border-5 shadow-sm h-100">
                    <label className="text-muted small fw-bold text-uppercase d-block mb-1 text-warning">
                      <FaMapMarkerAlt className="me-2" /> Email Address
                    </label>
                    <span className="fs-6 text-dark fw-medium d-block">{member.email}</span>
                  </div>
                </div>

                {/* ID/Identity - Optional field from API */}
                <div className="col-12">
                   <div className="p-3 border rounded-3 bg-white">
                      <FaHistory className="me-2 text-muted" />
                      <small className="text-muted">पंजीकरण पहचान आईडी: {member["पहचान_आईडी"] || "उपलब्ध नहीं"}</small>
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

export default MemberDetail;