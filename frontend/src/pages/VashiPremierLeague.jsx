import SectionTitle from '../components/common/SectionTitle.jsx';
import Slideshow from '../components/common/Slideshow.jsx';
import { VPL_PHOTOS } from '../data/galleries.js';
import { SOCIAL_LINKS } from '../data/staticLinks.js';
import { MdEmail, MdSportsCricket } from 'react-icons/md';
import { FiInstagram, FiYoutube } from 'react-icons/fi';

const EDITIONS = [
  { year: '2024', teams: '16', matches: '30', winner: 'Vashi Warriors' },
  { year: '2023', teams: '14', matches: '26', winner: 'Sector 8 Lions' },
  { year: '2022', teams: '12', matches: '22', winner: 'Vashi Warriors' },
  { year: '2021', teams: '10', matches: '18', winner: 'Navi Champions' },
];

const VashiPremierLeague = () => (
  <div className="pt-24 pb-16">
    {/* Hero */}
    <div className="relative overflow-hidden bg-ink-900 text-white">
      {/* subtle saffron corner glow for depth (flat, no gradient fill) */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-saffron-600/15 blur-[120px]" aria-hidden="true" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-24 sm:py-28">
        <div className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-saffron-300 mb-5">
          Community Cricket · Vashi
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">Vashi Premier League</h1>
        <div className="w-16 h-1 bg-saffron-500 mx-auto mb-5" />
        <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
          An annual cricket tournament celebrating the spirit of sport, unity, and community in Vashi, Navi Mumbai. Organised by Vijay Walunj's office.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8 text-center">
          {[['Annual', 'Tournament'], ['16+', 'Teams'], ['500+', 'Players'], ['2000+', 'Spectators']].map(([val, lab]) => (
            <div key={lab} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4">
              <div className="text-2xl font-bold text-saffron-400">{val}</div>
              <div className="text-white/70 text-sm">{lab}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
      {/* About */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <SectionTitle tag="About VPL" title="About the Tournament" />
          <div className="mt-6 space-y-4 text-ink-600 leading-relaxed">
            <p>
              The <strong>Vashi Premier League (VPL)</strong> is a flagship annual cricket tournament organised by Vijay Walunj's office, bringing together young cricketers and sports enthusiasts from across Vashi and Navi Mumbai.
            </p>
            <p>
              Launched with the vision of nurturing local talent and promoting sportsmanship, VPL has grown into one of the most awaited community events in Navi Mumbai, with hundreds of players participating every year.
            </p>
            <p>
              The tournament follows a structured format with knockout rounds, semi-finals, and a grand final, offering prizes, trophies, and recognition to deserving players.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 text-sm text-ink-600 bg-saffron-50 px-3 py-2 rounded-lg border border-saffron-200">
              <MdSportsCricket className="w-4 h-4 text-saffron-600" /> T20 Format
            </div>
            <div className="flex items-center gap-2 text-sm text-ink-600 bg-ink-50 px-3 py-2 rounded-lg border border-ink-200">
              🏟️ Vashi Cricket Ground
            </div>
            <div className="flex items-center gap-2 text-sm text-ink-600 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
              🏆 Annual Event
            </div>
          </div>
        </div>
        <div className="bg-ink-900 rounded-2xl p-8 text-white text-center">
          <div className="text-6xl mb-3">🏆</div>
          <h3 className="text-xl font-bold mb-1">VPL 2025</h3>
          <p className="text-ink-300 text-sm mb-6">Stay tuned for the next edition of Vashi Premier League 2025.</p>
          <a href="mailto:vpl@vijaywalunj.in" className="inline-flex items-center gap-2 bg-saffron-600 hover:bg-saffron-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors">
            <MdEmail className="w-4 h-4" /> Register Your Team
          </a>
        </div>
      </div>

      {/* Past Editions */}
      <div>
        <SectionTitle tag="History" title="Past Editions" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {EDITIONS.map(({ year, teams, matches, winner }) => (
            <div key={year} className="card p-5 text-center border border-ink-100">
              <div className="text-2xl font-bold text-saffron-600 mb-1">{year}</div>
              <div className="text-xs text-ink-400 mb-3">Edition</div>
              <div className="space-y-1 text-sm">
                <div className="text-ink-600"><span className="font-semibold text-ink-800">{teams}</span> Teams</div>
                <div className="text-ink-600"><span className="font-semibold text-ink-800">{matches}</span> Matches</div>
                <div className="mt-2 pt-2 border-t border-ink-100">
                  <div className="text-xs text-ink-400">Winner</div>
                  <div className="text-xs font-bold text-saffron-700">🏆 {winner}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div>
        <SectionTitle tag="Gallery" title="Photo Gallery" subtitle="Glimpses from past VPL editions." />
        <div className="mt-8 max-w-4xl mx-auto">
          <Slideshow
            images={VPL_PHOTOS}
            accentClass="bg-saffron-500"
            fallback={(
              <div className="aspect-video rounded-2xl bg-ink-800 flex items-center justify-center text-white/70">
                <div className="text-center">
                  <div className="text-4xl">🏏</div>
                  <div className="text-sm mt-2">Match photos coming soon</div>
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {/* Contact */}
      <div className="bg-ink-800 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Connect With VPL</h2>
        <p className="text-ink-300 mb-6">For team registration, sponsorship, or media queries, reach out to us.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="mailto:vpl@vijaywalunj.in" className="flex items-center gap-2 bg-saffron-600 hover:bg-saffron-700 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors">
            <MdEmail className="w-4 h-4" /> vpl@vijaywalunj.in
          </a>
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors">
            <FiInstagram className="w-4 h-4" /> Follow on Instagram
          </a>
          <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors">
            <FiYoutube className="w-4 h-4" /> YouTube Highlights
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default VashiPremierLeague;
