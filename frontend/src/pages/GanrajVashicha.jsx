import SectionTitle from '../components/common/SectionTitle.jsx';
import Slideshow from '../components/common/Slideshow.jsx';
import { GANPATI_PHOTOS } from '../data/galleries.js';
import { MdEmail } from 'react-icons/md';

const ACTIVITIES = [
  { icon: '🎵', title: 'Cultural Programs', desc: 'Daily cultural performances, bhajans, and classical music programs during the 10-day festival.' },
  { icon: '🍱', title: 'Prasad Distribution', desc: 'Free prasad and meals distributed to thousands of devotees and underprivileged citizens every year.' },
  { icon: '🎨', title: 'Art & Creativity', desc: 'Children\'s drawing competitions, rangoli contests, and traditional art exhibitions celebrating Indian culture.' },
  { icon: '🤝', title: 'Social Initiatives', desc: 'Blood donation drives, cleanliness campaigns, and health camps organised alongside the festival.' },
];

const GanrajVashicha = () => (
  <div className="pt-24 pb-16">
    {/* Hero */}
    <div className="relative overflow-hidden text-white bg-ink-900">
      {GANPATI_PHOTOS[0] && (
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${GANPATI_PHOTOS[0].url})` }}
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 bg-ink-900/75" aria-hidden="true" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10 py-24 sm:py-28">
        <div className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-saffron-300 mb-5">
          Ganpati Mandal · Vashi
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold mb-3">गणराज वाशीचा, राजा नवी मुंबईचा</h1>
        <div className="text-lg sm:text-2xl font-semibold text-saffron-300 mb-5">Ganraj Vashicha, Raja Navi Mumbai Cha</div>
        <div className="w-16 h-1 bg-saffron-500 mx-auto mb-5" />
        <p className="text-white/80 text-base max-w-2xl mx-auto leading-relaxed">
          The grand Ganpati Mandal led by Vijay Walunj, celebrating Lord Ganesha's blessings for the people of Vashi and Navi Mumbai for over a decade.
        </p>
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
      {/* About */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <SectionTitle tag="About" title="About the Mandal" />
          <div className="mt-6 space-y-4 text-ink-600 leading-relaxed">
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
                <div className="text-xs text-ink-500 mt-0.5">{lab}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-saffron-600 rounded-2xl p-8 text-white text-center">
          <div className="text-7xl mb-4">🐘</div>
          <h3 className="text-xl font-bold mb-2">Ganesh Chaturthi 2025</h3>
          <p className="text-white/80 text-sm mb-5">Stay connected for updates on Ganesh Chaturthi 2025 celebrations at Vashi.</p>
          <a href="mailto:ganraj@vijaywalunj.in"
            className="inline-flex items-center gap-2 bg-white text-saffron-700 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-ink-100 transition-colors">
            <MdEmail className="w-4 h-4" /> Get Notified
          </a>
        </div>
      </div>

      {/* Activities */}
      <div>
        <SectionTitle tag="Initiatives" title="Mandal Activities" subtitle="Beyond celebrations — the social initiatives that define Ganraj Vashicha." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {ACTIVITIES.map(({ icon, title, desc }) => (
            <div key={title} className="card p-5 border border-ink-100 hover:border-saffron-200 transition-all text-center">
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="font-bold text-ink-800 text-sm mb-2">{title}</h3>
              <p className="text-ink-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div>
        <SectionTitle tag="Gallery" title="Festival Gallery" subtitle="Glimpses from Ganesh Chaturthi celebrations." />
        <div className="mt-8 max-w-4xl mx-auto">
          <Slideshow
            images={GANPATI_PHOTOS}
            accentClass="bg-saffron-500"
            fallback={(
              <div className="aspect-video rounded-2xl flex items-center justify-center text-white/70 bg-saffron-700">
                <div className="text-center">
                  <div className="text-4xl">🐘</div>
                  <div className="text-sm mt-2">Festival photos coming soon</div>
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {/* Contact */}
      <div className="text-center bg-saffron-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Connect With Ganraj Vashicha</h2>
        <p className="text-white/80 mb-6">For volunteering, sponsorship, or media queries related to the Ganpati Mandal.</p>
        <a href="mailto:ganraj@vijaywalunj.in"
          className="inline-flex items-center gap-2 bg-white text-saffron-700 px-6 py-3 rounded-lg font-bold hover:bg-ink-50 transition-colors">
          <MdEmail className="w-4 h-4" /> ganraj@vijaywalunj.in
        </a>
      </div>
    </div>
  </div>
);

export default GanrajVashicha;
