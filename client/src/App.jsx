import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import LoadingSpinner from './components/shared/LoadingSpinner.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Portfolio = lazy(() => import('./pages/Portfolio.jsx'));
const Resume = lazy(() => import('./pages/Resume.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails.jsx'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.jsx'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard.jsx'));
const ProjectsAdmin = lazy(() => import('./pages/admin/ProjectsAdmin.jsx'));
const CertificationsAdmin = lazy(() => import('./pages/admin/CertificationsAdmin.jsx'));
const SettingsAdmin = lazy(() => import('./pages/admin/SettingsAdmin.jsx'));

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <Router basename="/rhc-portfolio/">
      <Suspense fallback={<LoadingSpinner fullPage />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio/:type/:id" element={<ProjectDetails />} />

          {/* Admin auth */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectsAdmin />} />
            <Route path="certifications" element={<CertificationsAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
