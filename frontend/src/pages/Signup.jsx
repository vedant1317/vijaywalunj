import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signupUser } from '../services/authService.js';
import useAuth from '../hooks/useAuth.js';
import { MdEmail, MdLock, MdPerson, MdPhone, MdLocationOn, MdVisibility, MdVisibilityOff } from 'react-icons/md';

const WARDS = ['Vashi Sector 1', 'Vashi Sector 2', 'Vashi Sector 3', 'Vashi Sector 4', 'Vashi Sector 5', 'Vashi Sector 6', 'Vashi Sector 7', 'Vashi Sector 8', 'Vashi Sector 9', 'Vashi Sector 10', 'Vashi Sector 11', 'Vashi Sector 12', 'Other'];

const Signup = () => {
  const [form, setForm] = useState({ fullName: '', email: '', mobile: '', password: '', area: '', ward: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) return toast.error('Please accept the terms to continue.');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters.');
    setLoading(true);
    try {
      const { data } = await signupUser(form);
      login(data, data.token);
      toast.success(`Welcome, ${data.fullName.split(' ')[0]}! Account created successfully.`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'fullName', label: 'Full Name', type: 'text', icon: MdPerson, placeholder: 'Enter your full name' },
    { name: 'email', label: 'Email Address', type: 'email', icon: MdEmail, placeholder: 'your@email.com' },
    { name: 'mobile', label: 'Mobile Number', type: 'tel', icon: MdPhone, placeholder: '10-digit mobile number' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-saffron-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">VW</div>
            <div className="text-left">
              <div className="font-bold text-xl text-white">Vijay Walunj</div>
              <div className="text-saffron-400 text-sm">BJP | Vashi, Navi Mumbai</div>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-2">Citizen Registration</h1>
          <p className="text-gray-300 text-sm mt-1">Create your account to access citizen services</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ name, label, type, icon: Icon, placeholder }) => (
              <div key={name}>
                <label className="label">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-3.5 top-3.5 text-gray-400 w-5 h-5" />
                  <input type={type} name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} required className="input-field pl-11" />
                </div>
              </div>
            ))}

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <MdLock className="absolute left-3.5 top-3.5 text-gray-400 w-5 h-5" />
                <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Min. 6 characters" required className="input-field pl-11 pr-11" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600">
                  {showPassword ? <MdVisibilityOff className="w-5 h-5" /> : <MdVisibility className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Area</label>
                <div className="relative">
                  <MdLocationOn className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                  <input type="text" name="area" value={form.area} onChange={handleChange} placeholder="Your area" className="input-field pl-9 text-sm" />
                </div>
              </div>
              <div>
                <label className="label">Ward</label>
                <select name="ward" value={form.ward} onChange={handleChange} className="input-field text-sm">
                  <option value="">Select ward</option>
                  {WARDS.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group mt-2">
              <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-gray-300 text-saffron-600 focus:ring-saffron-500" />
              <span className="text-sm text-gray-600">I consent to this website collecting my details for citizen services. Information will not be shared with third parties.</span>
            </label>

            <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2">
              {loading ? (
                <><span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> Creating Account...</>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-saffron-600 font-semibold hover:text-saffron-700">Sign In</Link>
            </p>
          </div>
        </div>
        <p className="text-center text-gray-400 text-xs mt-6">
          <Link to="/" className="hover:text-white transition-colors">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
