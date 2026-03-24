import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './component/sidebar';
import Home from './component/Sidebar/home/home';
import MembersTable from './component/Sidebar/Member/memberTable';
import AddMember from './component/Sidebar/Member/AddMember';
import Dashboard from './component/Sidebar/Dashboard/dashboard';

import AdminProfile from './component/Sidebar/Admin/AdminProfile';
import EditMember from './component/Sidebar/Member/EditMember';
import MemberDetail from './component/Sidebar/Member/MemberDetail';
import PastMembers from './component/Sidebar/Past Member/PastMembers';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './component/Auth/ProtectedRoute';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import EditProfile from './component/Sidebar/Admin/EditProfile';
import ForgotPassword from './component/Auth/ForgotPassword';

// App.jsx
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex">
          {/* The Sidebar component we built */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-grow-1 p-3" style={{ 
            minHeight: '100vh',
            transition: 'margin-left 0.3s ease-in-out',
            width: '100%' 
          }}>
             <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/members" element={<ProtectedRoute><MembersTable /></ProtectedRoute>} />
                <Route path="/add-member" element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']}><AddMember /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/member/:id" element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']}><MemberDetail/></ProtectedRoute>} />
                <Route path="/profile/:email" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
                <Route path="/editMember/:id" element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']}><EditMember /></ProtectedRoute>} />
                   <Route path="/editProfile/:id" element={<ProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_USER']}>
      <EditProfile />
    </ProtectedRoute>} />
                <Route path="/pastMember" element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']}><PastMembers /></ProtectedRoute>} />
              </Routes>
          </main>

          {/* CSS to fix the blank space */}
          <style>{`
            /* Mobile: No margin */
            main {
              margin-left: 0 !important;
            }

            /* Desktop (992px and up): Add margin for fixed sidebar */
            @media (min-width: 992px) {
              main {
                margin-left: 280px !important;
              }
            }
          `}</style>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;