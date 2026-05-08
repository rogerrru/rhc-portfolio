import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './styles/style.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{ duration: 3000, style: { fontFamily: 'var(--font-lexend_exa)' } }}
        />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
