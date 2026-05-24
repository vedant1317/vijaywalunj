import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import SectionTitle from '../components/common/SectionTitle.jsx';
import { getTestimonials, submitTestimonial } from '../services/testimonialService.js';

const STATIC_TESTIMONIALS = [
  { _id: 't1', name: 'Ramesh Patil', area: 'Vashi Sector 7', message: 'My water supply complaint was resolved within 3 days. Vijay Walunj\'s office is always responsive and genuinely helpful.' },
  { _id: 't2', name: 'Sunita Sharma', area: 'Vashi Sector 3', message: 'The Stree Shakti program helped me learn new skills and become financially independent. Thank you Walunj saheb!' },
  { _id: 't3', name: 'Anil Deshmukh', area: 'Vashi Sector 10', message: 'The free senior citizen health camp was very helpful. I got a complete check-up free of cost. Grateful for this initiative.' },
  { _id: 't4', name: 'Priya Nair', area: 'Vashi Sector 5', message: 'Road outside our society was in bad condition for years. After submitting grievance, work started within 2 weeks. Excellent service!' },
  { _id: 't5', name: 'Kavita Joshi', area: 'Vashi Sector 8', message: 'Vashi Premier League gave my son a platform to showcase his cricket talent. Great initiative for youth development!' },
  { _id: 't6', name: 'Mohammed Shaikh', area: 'Vashi Sector 2', message: 'Got my Ayushman card registration done through the office without any hassle. Staff is very cooperative and helpful.' },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(STATIC_TESTIMONIALS);
  const [form, setForm] = useState({ name: '', area: '', message: '' });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getTestimonials().then(({ data }) => { if (data?.length) setTestimonials(data); }).catch(() => {});
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.message.length < 20) return toast.error('Please write a message of at least 20 characters.');
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (photo) fd.append('photo', photo);
      await submitTestimonial(fd);
      setSubmitted(true);
      setForm({ name: '', area: '', message: '' });
      setPhoto(null);
      toast.success('Thank you! Your testimonial is under review.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Public Testimonials</h1>
          <div className="w-16 h-1 bg-saffron-600 mx-auto mb-4 rounded-full" />
          <p className="text-gray-300 text-base">What the people of Vashi say about our work and services.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Testimonials Grid */}
          <div className="lg:col-span-2">
            <SectionTitle tag="Citizens Speak" title="What People Say" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
              {testimonials.map((t) => (
                <div key={t._id} className="card p-5 border border-gray-100 hover:border-saffron-200 transition-all">
                  <div className="text-saffron-400 text-3xl mb-2">"</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.message}</p>
                  <div className="flex items-center gap-3">
                    {t.photoUrl ? (
                      <img src={t.photoUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-saffron-200" />
                    ) : (
                      <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center text-navy-700 font-bold text-sm">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-navy-800 text-sm">{t.name}</div>
                      {t.area && <div className="text-gray-400 text-xs">{t.area}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Form */}
          <div>
            <div className="card p-6 sticky top-24">
              <SectionTitle tag="Share" title="Your Experience" />
              {submitted ? (
                <div className="mt-6 text-center py-6">
                  <div className="text-5xl mb-3">🙏</div>
                  <h3 className="font-bold text-navy-800 text-lg mb-2">Thank You!</h3>
                  <p className="text-gray-500 text-sm">Your testimonial has been submitted for review and will appear once approved.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-4 text-saffron-600 text-sm font-semibold hover:underline">Submit another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="label">Your Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className="input-field" />
                  </div>
                  <div>
                    <label className="label">Area / Ward</label>
                    <input type="text" name="area" value={form.area} onChange={handleChange} placeholder="e.g. Vashi Sector 7" className="input-field" />
                  </div>
                  <div>
                    <label className="label">Your Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Share your experience..." className="input-field resize-none" />
                    <p className="text-xs text-gray-400 mt-1">{form.message.length} / 500</p>
                  </div>
                  <div>
                    <label className="label">Photo <span className="text-xs text-gray-400 font-normal">(optional)</span></label>
                    <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} className="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-saffron-50 file:text-saffron-700 hover:file:bg-saffron-100 cursor-pointer w-full" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
                    {loading ? <><span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> Submitting...</> : 'Submit Testimonial'}
                  </button>
                  <p className="text-xs text-gray-400 text-center">Testimonials are reviewed before publishing.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
