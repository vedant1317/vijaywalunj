import { useState } from 'react';
import toast from 'react-hot-toast';
import { submitGrievance, trackGrievance } from '../services/grievanceService.js';
import SectionTitle from '../components/common/SectionTitle.jsx';
import { MdSearch, MdSend, MdAttachFile, MdCheckCircle } from 'react-icons/md';

const CATEGORIES = ['Road', 'Water Supply', 'Electricity', 'Garbage/Sanitation', 'Street Light', 'Drainage', 'Tree Cutting', 'Encroachment', 'Other'];
const WARDS = ['Vashi Sector 1', 'Vashi Sector 2', 'Vashi Sector 3', 'Vashi Sector 4', 'Vashi Sector 5', 'Vashi Sector 6', 'Vashi Sector 7', 'Vashi Sector 8', 'Vashi Sector 9', 'Vashi Sector 10', 'Vashi Sector 11', 'Vashi Sector 12', 'Other'];

const INITIAL_FORM = { fullName: '', mobile: '', email: '', address: '', ward: '', category: '', subject: '', description: '' };

const StatusBadge = ({ status }) => {
  const map = {
    'Submitted': 'bg-blue-100 text-blue-700',
    'Under Review': 'bg-yellow-100 text-yellow-700',
    'In Progress': 'bg-orange-100 text-orange-700',
    'Resolved': 'bg-green-100 text-green-700',
    'Closed': 'bg-gray-100 text-gray-600',
  };
  return <span className={`badge-status ${map[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>;
};

const GrievancePortal = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [trackId, setTrackId] = useState('');
  const [trackResult, setTrackResult] = useState(null);
  const [trackLoading, setTrackLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.description.length < 20) return toast.error('Description must be at least 20 characters.');
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (attachment) fd.append('attachment', attachment);
      const { data } = await submitGrievance(fd);
      setSubmitted(data);
      setForm(INITIAL_FORM);
      setAttachment(null);
      toast.success('Grievance submitted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackId.trim()) return toast.error('Please enter a reference ID.');
    setTrackLoading(true);
    setTrackResult(null);
    try {
      const { data } = await trackGrievance(trackId.trim().toUpperCase());
      setTrackResult(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Grievance not found.');
    } finally {
      setTrackLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Grievance Portal</h1>
          <div className="w-16 h-1 bg-saffron-600 mx-auto mb-4 rounded-full" />
          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            Submit your civic grievances and concerns to Vijay Walunj's office. Every submission receives a unique reference ID for tracking.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="card p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MdCheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-navy-800 mb-2">Grievance Submitted!</h2>
                <p className="text-gray-500 mb-6">Your grievance has been received. Please save your reference ID for tracking.</p>
                <div className="bg-saffron-50 border-2 border-saffron-200 rounded-xl px-8 py-5 inline-block mb-6">
                  <div className="text-xs text-saffron-600 font-semibold uppercase tracking-wider mb-1">Your Reference ID</div>
                  <div className="text-2xl font-bold text-navy-800 font-mono">{submitted.referenceId}</div>
                </div>
                <p className="text-sm text-gray-500 mb-6">Status: <StatusBadge status={submitted.status} /></p>
                <button onClick={() => setSubmitted(null)} className="btn-primary">Submit Another Grievance</button>
              </div>
            ) : (
              <div className="card p-6 sm:p-8">
                <SectionTitle tag="Submit Grievance" title="Tell us your concern" subtitle="Fill in the details below. All fields marked * are required." />
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Full Name *</label>
                      <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Your full name" className="input-field" />
                    </div>
                    <div>
                      <label className="label">Mobile Number *</label>
                      <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} required placeholder="10-digit mobile" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="label">Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="input-field" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Address / Locality</label>
                      <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Your address" className="input-field" />
                    </div>
                    <div>
                      <label className="label">Ward / Sector</label>
                      <select name="ward" value={form.ward} onChange={handleChange} className="input-field">
                        <option value="">Select ward</option>
                        {WARDS.map(w => <option key={w} value={w}>{w}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="label">Grievance Category *</label>
                    <select name="category" value={form.category} onChange={handleChange} required className="input-field">
                      <option value="">Select category</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Subject *</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="Brief subject of your grievance" className="input-field" />
                  </div>
                  <div>
                    <label className="label">Detailed Description * <span className="text-xs text-gray-400 font-normal">(min. 20 characters)</span></label>
                    <textarea name="description" value={form.description} onChange={handleChange} required rows={5} placeholder="Describe your grievance in detail..." className="input-field resize-none" />
                    <p className="text-xs text-gray-400 mt-1">{form.description.length} characters</p>
                  </div>
                  <div>
                    <label className="label">Attachment <span className="text-xs text-gray-400 font-normal">(optional, max 5MB – JPG, PNG, PDF)</span></label>
                    <label className="flex items-center gap-3 cursor-pointer border-2 border-dashed border-gray-300 hover:border-saffron-400 rounded-lg px-4 py-3 transition-colors group">
                      <MdAttachFile className="w-5 h-5 text-gray-400 group-hover:text-saffron-500" />
                      <span className="text-sm text-gray-500">{attachment ? attachment.name : 'Click to attach a file'}</span>
                      <input type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={e => setAttachment(e.target.files[0])} />
                    </label>
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
                    {loading ? (
                      <><span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> Submitting...</>
                    ) : (
                      <><MdSend className="w-4 h-4" /> Submit Grievance</>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar: Track & Info */}
          <div className="space-y-6">
            {/* Track */}
            <div className="card p-6">
              <h3 className="font-bold text-navy-800 text-base mb-1">Track Your Grievance</h3>
              <div className="w-10 h-1 bg-saffron-600 rounded-full mb-4" />
              <form onSubmit={handleTrack} className="space-y-3">
                <input type="text" value={trackId} onChange={e => setTrackId(e.target.value)} placeholder="e.g. VW-2025-123456" className="input-field text-sm uppercase" />
                <button type="submit" disabled={trackLoading} className="w-full btn-primary text-sm flex items-center justify-center gap-2">
                  {trackLoading ? <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> : <MdSearch className="w-4 h-4" />}
                  Track Status
                </button>
              </form>
              {trackResult && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-navy-800">{trackResult.referenceId}</span>
                    <StatusBadge status={trackResult.status} />
                  </div>
                  <p className="text-gray-600"><span className="font-medium">Category:</span> {trackResult.category}</p>
                  <p className="text-gray-600"><span className="font-medium">Subject:</span> {trackResult.subject}</p>
                  <p className="text-gray-400 text-xs">Submitted: {new Date(trackResult.createdAt).toLocaleDateString('en-IN')}</p>
                  {trackResult.remarks && <p className="text-gray-600 text-xs mt-1 italic">Remarks: {trackResult.remarks}</p>}
                </div>
              )}
            </div>

            {/* Process */}
            <div className="card p-6">
              <h3 className="font-bold text-navy-800 text-base mb-4">How it Works</h3>
              {[
                { step: '01', text: 'Fill and submit the grievance form with accurate details.' },
                { step: '02', text: 'Receive a unique Reference ID for tracking.' },
                { step: '03', text: 'Our team reviews and assigns your grievance.' },
                { step: '04', text: 'Track status updates until resolution.' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-3 mb-4 last:mb-0">
                  <div className="w-8 h-8 bg-saffron-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{step}</div>
                  <p className="text-sm text-gray-600 pt-1">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrievancePortal;
