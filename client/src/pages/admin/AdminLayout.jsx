import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '⬡', end: true },
  { to: '/admin/projects', label: 'Projects', icon: '◈' },
  { to: '/admin/publications', label: 'Publications', icon: '◉' },
  { to: '/admin/certifications', label: 'Certifications', icon: '◎' },
  { to: '/admin/settings', label: 'Settings', icon: '◇' },
];

const AdminLayout = () => {
  const { adminEmail, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-gray-900 text-white w-60 py-8 px-4 shrink-0">
      <div className="mb-8 px-2">
        <h1 className="font-lexend_exa font-black text-lg">RHC ADMIN</h1>
        <p className="text-xs text-gray-400 mt-1 truncate">{adminEmail}</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-lexend_exa transition ${
                isActive ? 'bg-white text-black font-semibold' : 'text-gray-300 hover:bg-gray-800'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="text-base">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-lexend_exa text-gray-300 hover:bg-gray-800 transition"
        >
          ← View Site
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-lexend_exa text-red-400 hover:bg-gray-800 transition mt-1"
        >
          ⊠ Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="flex">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 bg-gray-900 text-white px-4 py-3">
          <button onClick={() => setSidebarOpen(true)} className="text-xl">☰</button>
          <span className="font-lexend_exa font-black text-sm">RHC ADMIN</span>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
