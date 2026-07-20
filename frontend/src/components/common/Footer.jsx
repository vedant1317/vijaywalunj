import { Link } from 'react-router-dom';
import { SOCIAL_LINKS, CONTACT_INFO, NAV_LINKS } from '../../data/staticLinks.js';
import {
  FaFacebookF, FaInstagram, FaXTwitter, FaYoutube,
} from 'react-icons/fa6';
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from 'react-icons/md';

const socialIcons = [
  { Icon: FaFacebookF, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
  { Icon: FaInstagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
  { Icon: FaXTwitter, href: SOCIAL_LINKS.twitter, label: 'X (Twitter)' },
  { Icon: FaYoutube, href: SOCIAL_LINKS.youtube, label: 'YouTube' },
];

const Footer = () => (
  <footer className="bg-ink-900 text-white">
    {/* CTA Banner */}
    <div className="bg-saffron-600 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg text-white">Have a grievance? We're here to help.</h3>
          <p className="text-white/90 text-sm">Submit your concern and get a reference ID for tracking.</p>
        </div>
        <Link to="/grievance" className="flex-shrink-0 bg-white text-saffron-700 font-bold px-6 py-2.5 rounded-lg hover:bg-ink-100 transition-colors shadow-md">
          Submit Grievance
        </Link>
      </div>
    </div>

    {/* Main footer */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-saffron-600 rounded-full flex items-center justify-center text-white font-bold text-xl">VW</div>
            <div>
              <div className="font-bold text-lg">Vijay Walunj</div>
              <div className="text-saffron-400 text-sm">BJP | Vashi, Navi Mumbai</div>
            </div>
          </div>
          <p className="text-[#C4AC84] text-sm leading-relaxed">
            Dedicated to serving the people of Vashi and Navi Mumbai. Committed to development, citizen welfare, and transparent governance.
          </p>
          {/* Social links */}
          <div className="flex items-center gap-3 mt-5">
            {socialIcons.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 bg-white/10 hover:bg-saffron-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          {/* NaMo & eSaral */}
          <div className="flex gap-3 mt-3">
            <a href={SOCIAL_LINKS.namo} target="_blank" rel="noopener noreferrer" className="text-xs text-saffron-400 hover:text-saffron-300 underline transition-colors">NaMo App</a>
            <a href={SOCIAL_LINKS.esaral} target="_blank" rel="noopener noreferrer" className="text-xs text-saffron-400 hover:text-saffron-300 underline transition-colors">eSaral</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-base mb-4 border-b border-white/20 pb-2">Quick Links</h4>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-[#C4AC84] hover:text-saffron-400 text-sm transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-saffron-600 rounded-full flex-shrink-0" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Citizen Services */}
        <div>
          <h4 className="font-bold text-base mb-4 border-b border-white/10 pb-2">Citizen Services</h4>
          <ul className="space-y-2">
            {[
              { label: 'Voter Services Portal', href: 'https://voters.eci.gov.in/' },
              { label: 'Voter Search', href: 'https://electoralsearch.eci.gov.in/' },
              { label: 'NMMC Property Tax', href: 'https://www.nmmc.gov.in/property-tax' },
              { label: 'NMMC Water Bill', href: 'https://www.nmmc.gov.in/water-tax' },
              { label: 'Ayushman Card (PMJAY)', href: 'https://beneficiary.nha.gov.in/' },
            ].map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#C4AC84] hover:text-saffron-400 text-sm transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-saffron-600 rounded-full flex-shrink-0" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-base mb-4 border-b border-white/20 pb-2">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <MdPhone className="w-4 h-4 text-saffron-500 flex-shrink-0 mt-0.5" />
              <a href={`tel:${CONTACT_INFO.phone}`} className="text-[#C4AC84] hover:text-white text-sm transition-colors">{CONTACT_INFO.phone}</a>
            </li>
            <li className="flex items-start gap-3">
              <MdEmail className="w-4 h-4 text-saffron-500 flex-shrink-0 mt-0.5" />
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-[#C4AC84] hover:text-white text-sm transition-colors break-all">{CONTACT_INFO.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <MdLocationOn className="w-4 h-4 text-saffron-500 flex-shrink-0 mt-0.5" />
              <span className="text-[#C4AC84] text-sm">{CONTACT_INFO.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <MdAccessTime className="w-4 h-4 text-saffron-500 flex-shrink-0 mt-0.5" />
              <span className="text-[#C4AC84] text-sm">{CONTACT_INFO.officeHours}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#9A8060]">
        <span>© {new Date().getFullYear()} Vijay Walunj. All rights reserved.</span>
        <span>Designed with ❤️ for the people of Vashi, Navi Mumbai</span>
      </div>
    </div>
  </footer>
);

export default Footer;
