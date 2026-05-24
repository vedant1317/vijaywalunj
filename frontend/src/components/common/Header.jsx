import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../../data/staticLinks.js';
import useAuth from '../../hooks/useAuth.js';
import { HiMenu, HiX, HiUser, HiLogout } from 'react-icons/hi';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white shadow-md'}`}>
      {/* Top bar */}
      <div className="bg-navy-800 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:block">🏛️ Official Website of Vijay Walunj | BJP | Vashi, Navi Mumbai</span>
          <span className="sm:hidden">Vijay Walunj | BJP</span>
          <div className="flex items-center gap-4 text-xs">
            <a href="tel:+91XXXXXXXXXX" className="hover:text-saffron-400 transition-colors">📞 Contact</a>
            <span className="text-gray-400">|</span>
            <a href="mailto:info@vijaywalunj.in" className="hover:text-saffron-400 transition-colors">✉️ Email</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0" onClick={() => setMobileOpen(false)}>
            <div className="w-10 h-10 bg-saffron-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              VW
            </div>
            <div>
              <div className="font-bold text-navy-800 text-base leading-tight">Vijay Walunj</div>
              <div className="text-xs text-saffron-600 font-medium">BJP | Vashi, Navi Mumbai</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive ? 'text-saffron-600 bg-saffron-50' : 'text-gray-700 hover:text-saffron-600 hover:bg-saffron-50'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="hidden xl:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <HiUser className="w-4 h-4" /> {user.fullName.split(' ')[0]}
                </span>
                <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all">
                  <HiLogout className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-navy-800 hover:text-saffron-600 transition-colors">Login</Link>
                <Link to="/signup" className="btn-primary text-sm px-4 py-2">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-lg text-navy-800 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-saffron-50 text-saffron-600' : 'text-gray-700 hover:bg-gray-50 hover:text-saffron-600'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="border-t border-gray-100 pt-3 mt-3">
              {user ? (
                <div className="space-y-2">
                  <p className="px-4 text-sm text-gray-600">Hello, {user.fullName.split(' ')[0]}</p>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg font-medium">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 px-2">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2.5 text-sm font-medium text-navy-800 border border-navy-200 rounded-lg hover:bg-navy-50 transition-colors">Login</Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2.5 text-sm font-medium bg-saffron-600 text-white rounded-lg hover:bg-saffron-700 transition-colors">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
