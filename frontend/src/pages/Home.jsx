import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import SectionTitle from '../components/common/SectionTitle.jsx';
import NewsCard from '../components/common/NewsCard.jsx';
import VideoCard from '../components/common/VideoCard.jsx';
import ServiceCard from '../components/common/ServiceCard.jsx';
import ContactCard from '../components/common/ContactCard.jsx';
import Reveal from '../components/common/Reveal.jsx';
import { SOCIAL_LINKS } from '../data/staticLinks.js';
import { getNews } from '../services/newsService.js';
import api from '../services/api.js';

const QUICK_SERVICES = [
  { icon: 'Grievance', title: 'Grievance Portal', description: 'Submit and track your civic grievances with a unique reference ID.', linkTo: '/grievance' },
  { icon: 'NMMC', title: 'NMMC Services', description: 'Pay property tax, water bill and access Navi Mumbai Municipal services.', linkTo: '/nmmc-services' },
  { icon: 'Voter', title: 'Voter Services', description: 'Access ECI voter portal, search electoral rolls, download forms.', linkTo: '/facilities' },
  { icon: 'Women', title: 'Women\'s Programs', description: 'Stree Shakti Mahila Mandal & Mahila Bachat Gath registration.', linkTo: '/facilities' },
  { icon: 'Sports', title: 'Vashi Premier League', description: 'Annual cricket tournament bringing the community together every year.', linkTo: '/vashi-premier-league' },
  { icon: 'Culture', title: 'Ganraj Vashicha', description: 'Ganpati Mandal celebrations led by Vijay Walunj for Navi Mumbai.', linkTo: '/ganraj-vashicha' },
];

const STATS = [
  { value: '10,000+', label: 'Citizens Served' },
  { value: '500+', label: 'Grievances Resolved' },
  { value: '15+', label: 'Years of Service' },
  { value: '50+', label: 'Community Events' },
];

const STATIC_NEWS = [
  { _id: '1', title: 'Vijay Walunj inaugurates new road development project in Vashi Sector 9', summary: 'A major road infrastructure project was inaugurated to ease traffic and improve connectivity in Vashi Sector 9, benefiting thousands of residents.', category: 'Development', publishedAt: '2025-05-01', imageUrl: null, sourceUrl: null },
  { _id: '2', title: 'Free health camp organized for senior citizens in Vashi', summary: 'Umang Foundation, in association with Vijay Walunj\'s office, organized a free health check-up camp for over 300 senior citizens in Vashi.', category: 'Health', publishedAt: '2025-04-20', imageUrl: null, sourceUrl: null },
  { _id: '3', title: 'Stree Shakti Mahila Mandal concludes annual skills training program', summary: 'The annual vocational training program for women concluded successfully with 150 women receiving certificates in tailoring, beauty, and computer skills.', category: 'Women Welfare', publishedAt: '2025-04-10', imageUrl: null, sourceUrl: null },
];

// Real latest videos from the @Vijay_Walunj channel — used as a fallback until
// the backend YouTube sync returns live data. Refresh via the RSS feed:
// https://www.youtube.com/feeds/videos.xml?channel_id=UCWCulS-foP2CNYfSaN_t_TQ
const STATIC_VIDEOS = [
  { _id: 'POujEAa7ZA0', title: 'Vijay Walunj | Anjali Walunj | Ashimik Kamthe | NMMC Election 2026', youtubeUrl: 'https://www.youtube.com/watch?v=POujEAa7ZA0', youtubeVideoId: 'POujEAa7ZA0', thumbnailUrl: 'https://img.youtube.com/vi/POujEAa7ZA0/hqdefault.jpg' },
  { _id: 'Pe0Qpv-8mMI', title: 'Vijay Walunj | Anjali Walunj | Vision for Panel 16: Forest Theme Garden – Sector 16A, Vashi', youtubeUrl: 'https://www.youtube.com/watch?v=Pe0Qpv-8mMI', youtubeVideoId: 'Pe0Qpv-8mMI', thumbnailUrl: 'https://img.youtube.com/vi/Pe0Qpv-8mMI/hqdefault.jpg' },
  { _id: 'oLVJTUEZiQo', title: 'Vijay Walunj | “आमच्या सुख-दुःखात वाळुंज परिवार खडकासारखा ठाम उभा राहिला.”', youtubeUrl: 'https://www.youtube.com/watch?v=oLVJTUEZiQo', youtubeVideoId: 'oLVJTUEZiQo', thumbnailUrl: 'https://img.youtube.com/vi/oLVJTUEZiQo/hqdefault.jpg' },
];

const STATIC_TESTIMONIALS = [
  { _id: 't1', name: 'Ramesh Patil', area: 'Vashi Sector 7', message: 'My water supply complaint was resolved within 3 days. Vijay Walunj\'s office is always responsive and helpful.' },
  { _id: 't2', name: 'Sunita Sharma', area: 'Vashi Sector 3', message: 'The Stree Shakti program helped me learn new skills and become financially independent. Thank you Walunj saheb!' },
  { _id: 't3', name: 'Anil Deshmukh', area: 'Vashi Sector 10', message: 'The free senior citizen health camp was very helpful. I got complete check-up free of cost. Very grateful for this initiative.' },
  { _id: 't4', name: 'Priya Nair', area: 'Vashi Sector 5', message: 'Road outside our society was in bad condition for years. After submitting grievance, work started within 2 weeks. Excellent service!' },
];

const EMERGENCY_CONTACTS = [
  { name: 'NMMC Control Room', phone: '1800-22-0033', category: 'NMMC', isEmergency: true },
  { name: 'Vashi Police Station', phone: '022-27652131', category: 'Police', isEmergency: true },
  { name: 'Nirbhaya Helpline', phone: '1091', category: 'Emergency Helpline', isEmergency: true },
  { name: 'Disaster Management', phone: '1077', category: 'Disaster Management', isEmergency: true },
];

const Home = () => {
  const [news, setNews] = useState(STATIC_NEWS);
  const [videos, setVideos] = useState(STATIC_VIDEOS);
  const [testimonials, setTestimonials] = useState(STATIC_TESTIMONIALS);

  useEffect(() => {
    getNews(1, 3).then(({ data }) => { if (data.news?.length) setNews(data.news); }).catch(() => {});
    api.get('/videos').then(({ data }) => { if (data?.length) setVideos(data); }).catch(() => {});
    api.get('/testimonials').then(({ data }) => { if (data?.length) setTestimonials(data); }).catch(() => {});
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen bg-ink-900 flex items-center pt-28 pb-16 overflow-hidden">
        {/* Architectural grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(var(--saffron) 1px, transparent 1px), linear-gradient(90deg, var(--saffron) 1px, transparent 1px)', backgroundSize: '100px 100px'}}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-saffron-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-ink-400/10 rounded-full blur-[80px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="animate-reveal stagger-1">
              <div className="inline-flex items-center gap-2 bg-saffron-600/10 border border-saffron-500/20 text-saffron-400 text-[10px] uppercase tracking-widest font-bold px-5 py-2 mb-8" style={{clipPath:'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)'}}>
                Official Website — BJP | Vashi, Navi Mumbai
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.1] mb-6">
                विजय वालुंज
                <span className="block text-saffron-500 text-4xl sm:text-5xl mt-2 tracking-tight">Vijay Walunj</span>
              </h1>
              <p className="text-ink-100 text-lg leading-relaxed mb-10 max-w-xl font-light">
                BJP Leader & Public Servant dedicated to the development and welfare of Vashi, Navi Mumbai.
                Committed to transparent governance and citizen-first services.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/grievance" className="btn-primary">Submit Grievance</Link>
                <Link to="/facilities" className="btn-outline-white">Explore Services</Link>
              </div>
            </div>

            {/* Photo placeholder */}
            <div className="flex justify-center lg:justify-end animate-reveal stagger-2">
              <div className="relative group">
                <div className="w-72 h-[22rem] sm:w-[340px] sm:h-[400px] bg-ink-900 border border-ink-800 relative z-10 overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:border-saffron-500/50" style={{clipPath:'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)'}}>
                  <div className="text-center text-white/30 group-hover:text-white/50 transition-colors">
                    <p className="text-[10px] tracking-widest uppercase font-semibold">Official Portrait</p>
                  </div>
                </div>
                {/* Accent lines backdrop */}
                <div className="absolute top-4 -right-4 w-full h-full border border-saffron-600/30 z-0" style={{clipPath:'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)'}}></div>
                {/* Floating BJP badge */}
                <div className="absolute -bottom-6 -left-6 bg-saffron-600/90 backdrop-blur-md text-white px-6 py-4 shadow-2xl z-20" style={{clipPath:'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)'}}>
                  <div className="font-bold text-lg tracking-wider">BJP</div>
                  <div className="text-xs uppercase tracking-widest opacity-80">Vashi</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {STATS.map(({ value, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-5 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-saffron-400">{value}</div>
                <div className="text-ink-300 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Services ── */}
      <section className="section-padding bg-cream relative z-10">
        <div className="absolute top-0 right-0 w-full h-px bg-saffron-500/20"></div>
        <div className="container-custom">
          <SectionTitle tag="Services" title="Citizen Services" subtitle="Quick access to all government and welfare services provided through this office." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {QUICK_SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 90}><ServiceCard {...s} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── News ── */}
      <section className="section-padding bg-cream-light border-y border-ink-100">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-10">
            <SectionTitle tag="Latest News" title="News & Updates" />
            <Link to="/" className="text-saffron-600 text-sm font-semibold hover:text-saffron-700 transition-colors hidden sm:block">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <Reveal key={item._id} delay={(i % 3) * 90}><NewsCard {...item} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Videos ── */}
      <section className="section-padding bg-ink-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(var(--saffron) 1px, transparent 1px), linear-gradient(90deg, var(--saffron) 1px, transparent 1px)', backgroundSize: '60px 60px'}}></div>
        <div className="container-custom relative z-10">
          <SectionTitle tag="Media" title="Videos & Media" light subtitle="Watch latest speeches, events and public announcements." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {videos.slice(0, 3).map((v, i) => (
              <Reveal key={v._id} delay={(i % 3) * 90}><VideoCard {...v} /></Reveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="btn-outline-white text-sm px-6 py-3 inline-block">View YouTube Channel →</a>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section-padding bg-cream border-t border-saffron-200">
        <div className="container-custom">
          <SectionTitle tag="Citizens Speak" title="Public Testimonials" center subtitle="What the people of Vashi say about our work." />
          <div className="mt-10">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              spaceBetween={24}
              breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
              className="pb-10"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t._id}>
                  <div className="glass-shard p-8 h-full flex flex-col group">
                    <div className="text-saffron-600 font-heading text-4xl mb-4 leading-none group-hover:scale-110 transition-transform origin-left opacity-60">"</div>
                    <p className="text-ink-800 text-sm font-light leading-relaxed mb-8 flex-1">{t.message}</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-10 h-10 bg-ink-900 border border-saffron-500/30 flex items-center justify-center font-bold text-saffron-400 text-xs uppercase" style={{clipPath:'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)'}}>
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-ink-900 text-sm tracking-wide">{t.name}</div>
                        <div className="text-saffron-600 text-[10px] uppercase tracking-widest">{t.area}</div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="text-center mt-4">
            <Link to="/testimonials" className="btn-secondary text-sm px-6 py-3 inline-block">Share Your Experience</Link>
          </div>
        </div>
      </section>

      {/* ── Grievance CTA ── */}
      <section className="py-16 bg-ink-800">
        <div className="container-custom px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Have a Civic Issue?</h2>
          <p className="text-ink-300 mb-8 max-w-lg mx-auto">Submit your grievance online and track its resolution from anywhere. Our team is committed to responding within 72 hours.</p>
          <Link to="/grievance" className="btn-primary text-base px-8 py-3.5 inline-block">Submit Your Grievance</Link>
        </div>
      </section>

      {/* ── NMMC Services ── */}
      <section className="section-padding bg-cream-light relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-ink-50/50 -z-10" style={{clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)'}}></div>
        <div className="container-custom relative z-10">
          <SectionTitle tag="Administration" title="Online NMMC Services" subtitle="Pay your municipal dues securely online without visiting the office." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 max-w-3xl">
            <a href="https://www.nmmc.gov.in/property-tax" target="_blank" rel="noopener noreferrer" className="glass-shard p-8 flex items-start gap-6 group hover:border-saffron-300">
              <div className="w-12 h-12 bg-ink-900 text-saffron-400 flex items-center justify-center text-xs font-bold tracking-widest uppercase flex-shrink-0" style={{clipPath:'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)'}}>
                Tax
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-ink-900 text-lg group-hover:text-saffron-600 transition-colors mb-2">Property Tax</h3>
                <p className="text-sm text-ink-500 font-light leading-relaxed">Pay NMMC property tax securely online via the official administrative portal.</p>
                <span className="text-[10px] text-saffron-600 font-bold uppercase tracking-widest mt-4 inline-block drop-shadow-sm">nmmc.gov.in →</span>
              </div>
            </a>
            <a href="https://www.nmmc.gov.in/water-tax" target="_blank" rel="noopener noreferrer" className="glass-shard p-8 flex items-start gap-6 group hover:border-saffron-300">
              <div className="w-12 h-12 bg-ink-900 text-saffron-400 flex items-center justify-center text-xs font-bold tracking-widest uppercase flex-shrink-0" style={{clipPath:'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)'}}>
                H2O
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-ink-900 text-lg group-hover:text-saffron-600 transition-colors mb-2">Water Bill</h3>
                <p className="text-sm text-ink-500 font-light leading-relaxed">Settle your NMMC water connection charges quickly and track your usage.</p>
                <span className="text-[10px] text-saffron-600 font-bold uppercase tracking-widest mt-4 inline-block drop-shadow-sm">nmmc.gov.in →</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── Emergency Contacts preview ── */}
      <section className="section-padding bg-cream border-t border-saffron-200 relative">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'linear-gradient(var(--saffron) 1px, transparent 1px), linear-gradient(90deg, var(--saffron) 1px, transparent 1px)', backgroundSize: '100px 100px'}}></div>
        <div className="container-custom relative z-10">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl font-heading font-bold text-ink-900 mb-2">Important Contacts</h2>
            <Link to="/important-contacts" className="text-saffron-600 text-[10px] tracking-widest uppercase font-bold hover:text-saffron-700 transition-colors hidden sm:block">View All →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EMERGENCY_CONTACTS.map((c, i) => (
              <Reveal key={c.name} delay={(i % 4) * 80}><ContactCard {...c} /></Reveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/important-contacts" className="btn-secondary text-sm px-6 py-3 inline-block">View All Contacts</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
