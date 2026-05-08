import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <h1 className="font-lexend_exa text-2xl font-black text-center mb-8">ADMIN LOGIN</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-lexend_exa text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none font-lexend_exa"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="font-lexend_exa text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none font-lexend_exa"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-lexend_exa font-bold py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'SIGN IN'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
