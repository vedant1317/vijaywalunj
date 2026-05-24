import SectionTitle from '../components/common/SectionTitle.jsx';
import { MdEmail } from 'react-icons/md';

const GALLERY = Array.from({ length: 6 }, (_, i) => ({ id: i + 1, caption: `Ganraj Vashicha 2024` }));

const ACTIVITIES = [
  { icon: '🎵', title: 'Cultural Programs', desc: 'Daily cultural performances, bhajans, and classical music programs during the 10-day festival.' },
  { icon: '🍱', title: 'Prasad Distribution', desc: 'Free prasad and meals distributed to thousands of devotees and underprivileged citizens every year.' },
  { icon: '🎨', title: 'Art & Creativity', desc: 'Children\'s drawing competitions, rangoli contests, and traditional art exhibitions celebrating Indian culture.' },
  { icon: '🤝', title: 'Social Initiatives', desc: 'Blood donation drives, cleanliness campaigns, and health camps organised alongside the festival.' },
];

const GanrajVashicha = () => (
  <div className="pt-24 pb-16">
    {/* Hero */}
    <div className="relative overflow-hidden text-white py-16"
      style={{ background: 'linear-gradient(135deg, #7B2D00 0%, #FF6B00 40%, #1a237e 100%)' }}>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
        <div className="text-6xl mb-4">🐘</div>
        <h1 className="text-3xl sm:text-5xl font-bold mb-3">गणराज वाशीचा, राजा नवी मुंबईचा</h1>
        <div className="text-xl sm:text-2xl font-semibold text-saffron-300 mb-2">Ganraj Vashicha, Raja Navi Mumbai Cha</div>
        <div className="w-16 h-1 bg-saffron-400 mx-auto mb-4 rounded-full" />
        <p className="text-gray-200 text-base max-w-2xl mx-auto">
          The grand Ganpati Mandal led by Vijay Walunj, celebrating Lord Ganesha's blessings for the people of Vashi and Navi Mumbai for over a decade.
        </p>
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
      {/* About */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <SectionTitle tag="About" title="About the Mandal" />
          <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
            <p>
              <strong>Ganraj Vashicha</strong> is the flagship Ganpati Mandal of Vashi, Navi Mumbai, led with devotion and community spirit by Vijay Walunj. Every year during Ganesh Chaturthi, thousands of devotees gather to seek blessings and participate in the grand celebration.
            </p>
            <p>
              The mandal is known not just for its grand celebrations but also for its meaningful social contributions — organising blood donation drives, health camps, and cleanliness campaigns that bring the community together.
            </p>
            <p>
              The eco-friendly theme and community-first approach have made Ganraj Vashicha a model mandal celebrated across Navi Mumbai.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[['15+', 'Years'], ['50,000+', 'Devotees'], ['Eco-Friendly', 'Celebration']].map(([val, lab]) => (
              <div key={lab} className="bg-saffron-50 border border-saffron-200 rounded-xl py-4">
                <div className="font-bold text-saffron-700 text-xl">{val}</div>
                <div className="text-xs text-gray-500 mt-0.5">{lab}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-saffron-600 to-orange-700 rounded-2xl p-8 text-white text-center">
          <div className="text-7xl mb-4">🐘</div>
          <h3 className="text-xl font-bold mb-2">Ganesh Chaturthi 2025</h3>
          <p className="text-white/80 text-sm mb-5">Stay connected for updates on Ganesh Chaturthi 2025 celebrations at Vashi.</p>
          <a href="mailto:ganraj@vijaywalunj.in"
            className="inline-flex items-center gap-2 bg-white text-saffron-700 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
            <MdEmail className="w-4 h-4" /> Get Notified
          </a>
        </div>
      </div>

      {/* Activities */}
      <div>
        <SectionTitle tag="Initiatives" title="Mandal Activities" subtitle="Beyond celebrations — the social initiatives that define Ganraj Vashicha." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {ACTIVITIES.map(({ icon, title, desc }) => (
            <div key={title} className="card p-5 border border-gray-100 hover:border-saffron-200 transition-all text-center">
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="font-bold text-navy-800 text-sm mb-2">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div>
        <SectionTitle tag="Gallery" title="Festival Gallery" subtitle="Glimpses from Ganesh Chaturthi celebrations." />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
          {GALLERY.map(({ id }) => (
            <div key={id} className="aspect-video rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF6B00, #7B2D00)' }}>
              <div className="w-full h-full flex items-center justify-center text-white/60">
                <div className="text-center">
                  <div className="text-3xl">🐘</div>
                  <div className="text-xs mt-1">Festival Photo {id}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">Replace with actual festival photographs</p>
      </div>

      {/* Contact */}
      <div className="text-center bg-gradient-to-r from-saffron-600 to-orange-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Connect With Ganraj Vashicha</h2>
        <p className="text-white/80 mb-6">For volunteering, sponsorship, or media queries related to the Ganpati Mandal.</p>
        <a href="mailto:ganraj@vijaywalunj.in"
          className="inline-flex items-center gap-2 bg-white text-saffron-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors">
          <MdEmail className="w-4 h-4" /> ganraj@vijaywalunj.in
        </a>
      </div>
    </div>
  </div>
);

export default GanrajVashicha;
