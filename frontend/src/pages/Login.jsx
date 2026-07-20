import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginUser } from '../services/authService.js';
import useAuth from '../hooks/useAuth.js';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser(form.email, form.password);
      login(data, data.token);
      toast.success(`Welcome back, ${data.fullName.split(' ')[0]}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-saffron-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">VW</div>
            <div className="text-left">
              <div className="font-bold text-xl text-white">Vijay Walunj</div>
              <div className="text-saffron-400 text-sm">BJP | Vashi, Navi Mumbai</div>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-2">Citizen Login</h1>
          <p className="text-ink-300 text-sm mt-1">Sign in to track your grievances and access services</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <MdEmail className="absolute left-3.5 top-3.5 text-ink-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="input-field pl-11"
                />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <MdLock className="absolute left-3.5 top-3.5 text-ink-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="input-field pl-11 pr-11"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-3.5 text-ink-400 hover:text-ink-600">
                  {showPassword ? <MdVisibilityOff className="w-5 h-5" /> : <MdVisibility className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> Signing In...</>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-ink-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-saffron-600 font-semibold hover:text-saffron-700">Sign Up</Link>
            </p>
          </div>
        </div>

        <p className="text-center text-ink-400 text-xs mt-6">
          <Link to="/" className="hover:text-white transition-colors">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
