import SectionTitle from '../components/common/SectionTitle.jsx';
import { FiExternalLink } from 'react-icons/fi';

const SERVICES = [
  {
    icon: '🏠',
    title: 'Property Tax Payment',
    description: 'Pay your NMMC property tax online. Check dues, download receipts, and manage your property tax account.',
    url: 'https://www.nmmc.gov.in/property-tax',
    features: ['Online payment', 'View dues & history', 'Download receipts', 'Self-assessment'],
  },
  {
    icon: '💧',
    title: 'Water Bill Payment',
    description: 'Pay NMMC water charges online. Check your water account, outstanding dues, and download payment receipts.',
    url: 'https://www.nmmc.gov.in/water-tax',
    features: ['Online water bill payment', 'Account statement', 'Leak complaint', 'New connection'],
  },
];

const OTHER_LINKS = [
  { title: 'NMMC Main Website', url: 'https://www.nmmc.gov.in/', icon: '🏛️' },
  { title: 'NMMC Complaint Portal', url: 'https://www.nmmc.gov.in/', icon: '📋' },
  { title: 'Building Permission', url: 'https://www.nmmc.gov.in/', icon: '🏗️' },
  { title: 'Trade License', url: 'https://www.nmmc.gov.in/', icon: '📜' },
];

const NmmcServices = () => (
  <div className="pt-24 pb-16">
    <div className="bg-gradient-to-r from-navy-800 to-navy-900 text-white py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Online NMMC Services</h1>
        <div className="w-16 h-1 bg-saffron-600 mx-auto mb-4 rounded-full" />
        <p className="text-gray-300 text-base max-w-2xl mx-auto">
          Access Navi Mumbai Municipal Corporation services online. Pay bills, file complaints, and manage civic services.
        </p>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <SectionTitle tag="NMMC" title="Municipal Services" subtitle="Quick access to online payment portals for NMMC services." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {SERVICES.map(({ icon, title, description, url, features }) => (
          <div key={title} className="card p-8 flex flex-col border border-gray-100 hover:border-saffron-200 transition-all">
            <div className="text-5xl mb-4">{icon}</div>
            <h2 className="text-xl font-bold text-navy-800 mb-2">{title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-grow">{description}</p>
            <ul className="space-y-2 mb-6">
              {features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href={url} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 btn-primary text-sm py-3">
              <FiExternalLink className="w-4 h-4" /> Go to NMMC Portal
            </a>
          </div>
        ))}
      </div>

      {/* Other NMMC Links */}
      <div className="mt-12">
        <SectionTitle tag="More Services" title="Other NMMC Services" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {OTHER_LINKS.map(({ title, url, icon }) => (
            <a key={title} href={url} target="_blank" rel="noopener noreferrer"
              className="card p-4 text-center hover:border-saffron-200 border border-gray-100 transition-all group">
              <div className="text-3xl mb-2">{icon}</div>
              <div className="text-xs font-semibold text-navy-800 group-hover:text-saffron-600 transition-colors leading-tight">{title}</div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10 bg-navy-50 border border-navy-200 rounded-xl p-5 text-sm text-navy-700">
        <strong>Note:</strong> All above links redirect to the official NMMC website (nmmc.gov.in). For any technical issues with NMMC portal, contact NMMC Helpline: <a href="tel:18002200033" className="font-semibold text-saffron-600">1800-22-0033</a>.
      </div>
    </div>
  </div>
);

export default NmmcServices;
