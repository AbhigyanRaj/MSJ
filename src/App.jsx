// Code by Abhigyann :)
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Fixed import
import { RoleProvider, useRole } from "./context/RoleContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav"; // Mobile bottom nav
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import SuperAdminDashboard from "./pages/dashboards/SuperAdminDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import EditorDashboard from "./pages/dashboards/EditorDashboard";
import JournalistDashboard from "./pages/dashboards/JournalistDashboard";
import AdvertiserDashboard from "./pages/dashboards/AdvertiserDashboard";
import PartnerDashboard from "./pages/dashboards/PartnerDashboard";

// Role-Based Route Protection Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user, role, loading } = useRole(); // Ensure useRole is inside Router

  if (loading) return <div>Loading...</div>; // Show a loader while checking role
  if (!user) return <Navigate to="/auth" replace />; // Redirect to login if not logged in
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />; // Redirect unauthorized users

  return element;
};

const App = () => {
  return (
    <Router> {/* Moved Router to wrap everything */}
      <AuthProvider>
        <RoleProvider>
          <div className="min-h-screen flex flex-col">
          
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              {/* Dashboard & Role-Based Routes */}
              <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} allowedRoles={["admin", "superadmin", "editor", "journalist", "advertiser", "partner"]} />} />
              <Route path="/dashboard/superadmin" element={<ProtectedRoute element={<SuperAdminDashboard />} allowedRoles={["superadmin"]} />} />
              <Route path="/dashboard/admin" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />} />
              <Route path="/dashboard/editor" element={<ProtectedRoute element={<EditorDashboard />} allowedRoles={["editor"]} />} />
              <Route path="/dashboard/journalist" element={<ProtectedRoute element={<JournalistDashboard />} allowedRoles={["journalist"]} />} />
              <Route path="/dashboard/advertiser" element={<ProtectedRoute element={<AdvertiserDashboard />} allowedRoles={["advertiser"]} />} />
              <Route path="/dashboard/partner" element={<ProtectedRoute element={<PartnerDashboard />} allowedRoles={["partner"]} />} />
            </Routes>

          </div>

          <BottomNav /> {/* Always visible on mobile */}
        </RoleProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
