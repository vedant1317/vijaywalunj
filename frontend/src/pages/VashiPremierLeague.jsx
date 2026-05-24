import SectionTitle from '../components/common/SectionTitle.jsx';
import { MdEmail, MdSportsCricket } from 'react-icons/md';
import { FiInstagram, FiYoutube } from 'react-icons/fi';

const GALLERY_PLACEHOLDER = Array.from({ length: 6 }, (_, i) => ({ id: i + 1, caption: `VPL 2024 - Match ${i + 1}` }));

const EDITIONS = [
  { year: '2024', teams: '16', matches: '30', winner: 'Vashi Warriors' },
  { year: '2023', teams: '14', matches: '26', winner: 'Sector 8 Lions' },
  { year: '2022', teams: '12', matches: '22', winner: 'Vashi Warriors' },
  { year: '2021', teams: '10', matches: '18', winner: 'Navi Champions' },
];

const VashiPremierLeague = () => (
  <div className="pt-24 pb-16">
    {/* Hero */}
    <div className="bg-gradient-to-r from-green-900 via-navy-800 to-navy-900 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="text-6xl mb-4">🏏</div>
        <h1 className="text-3xl sm:text-5xl font-bold mb-3">Vashi Premier League</h1>
        <div className="w-16 h-1 bg-saffron-600 mx-auto mb-4 rounded-full" />
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          An annual cricket tournament celebrating the spirit of sport, unity, and community in Vashi, Navi Mumbai. Organised by Vijay Walunj's office.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-center">
          {[['Annual', 'Tournament'], ['16+', 'Teams'], ['500+', 'Players'], ['2000+', 'Spectators']].map(([val, lab]) => (
            <div key={lab} className="bg-white/10 rounded-xl px-6 py-4">
              <div className="text-2xl font-bold text-saffron-400">{val}</div>
              <div className="text-gray-300 text-sm">{lab}</div>
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
          <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
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
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
              <MdSportsCricket className="w-4 h-4 text-green-600" /> T20 Format
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
              🏟️ Vashi Cricket Ground
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
              🏆 Annual Event
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-800 to-navy-800 rounded-2xl p-8 text-white text-center">
          <div className="text-6xl mb-3">🏆</div>
          <h3 className="text-xl font-bold mb-1">VPL 2025</h3>
          <p className="text-gray-300 text-sm mb-6">Stay tuned for the next edition of Vashi Premier League 2025.</p>
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
            <div key={year} className="card p-5 text-center border border-gray-100">
              <div className="text-2xl font-bold text-saffron-600 mb-1">{year}</div>
              <div className="text-xs text-gray-400 mb-3">Edition</div>
              <div className="space-y-1 text-sm">
                <div className="text-gray-600"><span className="font-semibold text-navy-800">{teams}</span> Teams</div>
                <div className="text-gray-600"><span className="font-semibold text-navy-800">{matches}</span> Matches</div>
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-400">Winner</div>
                  <div className="text-xs font-bold text-green-700">🏆 {winner}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div>
        <SectionTitle tag="Gallery" title="Photo Gallery" subtitle="Glimpses from past VPL editions." />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
          {GALLERY_PLACEHOLDER.map(({ id, caption }) => (
            <div key={id} className="aspect-video bg-gradient-to-br from-green-800 to-navy-700 rounded-xl flex items-center justify-center group cursor-pointer overflow-hidden">
              <div className="text-center text-white/60 group-hover:text-white/90 transition-colors">
                <div className="text-3xl mb-1">🏏</div>
                <div className="text-xs">{caption}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">Replace placeholder images with actual VPL photographs</p>
      </div>

      {/* Contact */}
      <div className="bg-navy-800 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Connect With VPL</h2>
        <p className="text-gray-300 mb-6">For team registration, sponsorship, or media queries, reach out to us.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="mailto:vpl@vijaywalunj.in" className="flex items-center gap-2 bg-saffron-600 hover:bg-saffron-700 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors">
            <MdEmail className="w-4 h-4" /> vpl@vijaywalunj.in
          </a>
          <a href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors">
            <FiInstagram className="w-4 h-4" /> Follow on Instagram
          </a>
          <a href={`https://www.youtube.com/`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors">
            <FiYoutube className="w-4 h-4" /> YouTube Highlights
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default VashiPremierLeague;
