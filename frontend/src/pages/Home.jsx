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
import { getNews } from '../services/newsService.js';
import api from '../services/api.js';

const QUICK_SERVICES = [
  { icon: '📋', title: 'Grievance Portal', description: 'Submit and track your civic grievances with a unique reference ID.', linkTo: '/grievance' },
  { icon: '🏛️', title: 'NMMC Services', description: 'Pay property tax, water bill and access Navi Mumbai Municipal services.', linkTo: '/nmmc-services' },
  { icon: '🗳️', title: 'Voter Services', description: 'Access ECI voter portal, search electoral rolls, download forms.', linkTo: '/facilities' },
  { icon: '👩', title: 'Women\'s Programs', description: 'Stree Shakti Mahila Mandal & Mahila Bachat Gath registration.', linkTo: '/facilities' },
  { icon: '🏏', title: 'Vashi Premier League', description: 'Annual cricket tournament bringing the community together every year.', linkTo: '/vashi-premier-league' },
  { icon: '🐘', title: 'Ganraj Vashicha', description: 'Ganpati Mandal celebrations led by Vijay Walunj for Navi Mumbai.', linkTo: '/ganraj-vashicha' },
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

const STATIC_VIDEOS = [
  { _id: 'v1', title: 'Vijay Walunj addresses residents on Vashi development projects', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', youtubeVideoId: 'dQw4w9WgXcQ', description: 'Development updates for Vashi residents' },
  { _id: 'v2', title: 'Ganraj Vashicha 2024 - Grand celebration highlights', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', youtubeVideoId: 'dQw4w9WgXcQ', description: 'Ganpati festival 2024 celebration' },
  { _id: 'v3', title: 'Vashi Premier League 2024 - Final match highlights', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', youtubeVideoId: 'dQw4w9WgXcQ', description: 'Cricket tournament final 2024' },
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
      <section className="relative min-h-screen bg-hero-pattern flex items-center pt-28 pb-16 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-saffron-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-saffron-600/20 border border-saffron-500/40 text-saffron-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
                🏛️ Official Website — BJP | Vashi, Navi Mumbai
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                विजय वालुंज
                <span className="block text-saffron-400 text-3xl sm:text-4xl mt-1">Vijay Walunj</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
                BJP Leader & Public Servant dedicated to the development and welfare of Vashi, Navi Mumbai.
                Committed to transparent governance and citizen-first services.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/grievance" className="btn-primary text-base px-7 py-3.5">Submit Grievance</Link>
                <Link to="/facilities" className="btn-outline-white text-base px-7 py-3.5">Explore Services</Link>
              </div>
            </div>

            {/* Photo placeholder */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-2xl bg-gradient-to-br from-navy-600 to-navy-800 border-4 border-saffron-500/40 shadow-2xl overflow-hidden flex items-center justify-center">
                  <div className="text-center text-white/50">
                    <div className="text-7xl mb-2">👤</div>
                    <p className="text-xs">Replace with official photo</p>
                  </div>
                </div>
                {/* Floating BJP badge */}
                <div className="absolute -bottom-4 -right-4 bg-saffron-600 text-white rounded-xl px-4 py-2 shadow-xl text-center">
                  <div className="font-bold text-sm">BJP</div>
                  <div className="text-xs opacity-90">Vashi</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {STATS.map(({ value, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-5 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-saffron-400">{value}</div>
                <div className="text-gray-300 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Services ── */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionTitle tag="Services" title="Citizen Services" subtitle="Quick access to all government and welfare services provided through this office." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {QUICK_SERVICES.map((s) => <ServiceCard key={s.title} {...s} />)}
          </div>
        </div>
      </section>

      {/* ── News ── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-10">
            <SectionTitle tag="Latest News" title="News & Updates" />
            <Link to="/" className="text-saffron-600 text-sm font-semibold hover:text-saffron-700 transition-colors hidden sm:block">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => <NewsCard key={item._id} {...item} />)}
          </div>
        </div>
      </section>

      {/* ── Videos ── */}
      <section className="section-padding bg-navy-900">
        <div className="container-custom">
          <SectionTitle tag="Media" title="Videos & Media" light subtitle="Watch latest speeches, events and public announcements." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {videos.slice(0, 3).map((v) => <VideoCard key={v._id} {...v} />)}
          </div>
          <div className="text-center mt-8">
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="btn-outline-white text-sm px-6 py-3 inline-block">View YouTube Channel →</a>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section-padding bg-saffron-50">
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
                  <div className="bg-white rounded-2xl p-6 shadow-md border border-saffron-100 h-full">
                    <div className="text-saffron-400 text-4xl mb-3">"</div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{t.message}</p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center font-bold text-navy-700 text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-navy-800 text-sm">{t.name}</div>
                        <div className="text-gray-400 text-xs">{t.area}</div>
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
      <section className="py-16 bg-navy-800">
        <div className="container-custom px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Have a Civic Issue?</h2>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto">Submit your grievance online and track its resolution from anywhere. Our team is committed to responding within 72 hours.</p>
          <Link to="/grievance" className="btn-primary text-base px-8 py-3.5 inline-block">Submit Your Grievance</Link>
        </div>
      </section>

      {/* ── NMMC Services ── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle tag="NMMC" title="Online NMMC Services" subtitle="Pay your municipal dues online without visiting the office." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 max-w-2xl">
            <a href="https://www.nmmc.gov.in/property-tax" target="_blank" rel="noopener noreferrer" className="card p-6 flex items-center gap-5 group hover:border-saffron-200 border border-transparent">
              <div className="text-4xl">🏠</div>
              <div>
                <h3 className="font-bold text-navy-800 group-hover:text-saffron-600 transition-colors">Property Tax Payment</h3>
                <p className="text-sm text-gray-500">Pay NMMC property tax online via official portal</p>
                <span className="text-xs text-saffron-600 font-semibold mt-1 inline-block">nmmc.gov.in →</span>
              </div>
            </a>
            <a href="https://www.nmmc.gov.in/water-tax" target="_blank" rel="noopener noreferrer" className="card p-6 flex items-center gap-5 group hover:border-saffron-200 border border-transparent">
              <div className="text-4xl">💧</div>
              <div>
                <h3 className="font-bold text-navy-800 group-hover:text-saffron-600 transition-colors">Water Bill Payment</h3>
                <p className="text-sm text-gray-500">Pay NMMC water charges online quickly and easily</p>
                <span className="text-xs text-saffron-600 font-semibold mt-1 inline-block">nmmc.gov.in →</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── Emergency Contacts preview ── */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-10">
            <SectionTitle tag="Emergency" title="Important Contacts" subtitle="Key emergency and civic contacts for Vashi, Navi Mumbai." />
            <Link to="/important-contacts" className="text-saffron-600 text-sm font-semibold hover:text-saffron-700 transition-colors hidden sm:block">View All →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EMERGENCY_CONTACTS.map((c) => <ContactCard key={c.name} {...c} />)}
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
