import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../data/staticLinks.js';
import useAuth from '../../hooks/useAuth.js';
import { HiMenu, HiX, HiUser, HiLogout } from 'react-icons/hi';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Only the Home page has a dark hero directly behind the fixed header, so the
  // transparent "over-hero" style is safe there. Every other page has a light
  // area at the top, so the header must always use its solid style to stay legible.
  const isHome = pathname === '/';
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${solid ? 'bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-white' : 'bg-transparent'}`}>
      {/* Top bar */}
      <div className={`transition-all duration-500 overflow-hidden ${scrolled ? 'h-0 opacity-0' : 'h-8 opacity-100 bg-ink-900/90 backdrop-blur-md text-saffron-100/80 text-[10px] tracking-widest uppercase py-1.5 px-4'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
          <span className="hidden sm:block font-medium">Official Website of Vijay Walunj | BJP | Vashi, Navi Mumbai</span>
          <span className="sm:hidden font-medium">Vijay Walunj | BJP</span>
          <div className="flex items-center gap-6">
            <a href="tel:+91XXXXXXXXXX" className="hover:text-white transition-colors">Call Office</a>
            <a href="mailto:info@vijaywalunj.in" className="hover:text-white transition-colors">Email Us</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 flex-shrink-0 group" onClick={() => setMobileOpen(false)}>
            <div className={`w-12 h-12 flex items-center justify-center font-heading font-bold text-xl transition-all duration-500 border ${solid ? 'bg-saffron-600 text-white border-saffron-500' : 'bg-white text-saffron-600 border-white/20'}`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}>
              VW
            </div>
            <div>
              <div className={`font-heading font-bold text-lg leading-tight uppercase tracking-wide transition-colors ${solid ? 'text-ink-900' : 'text-white drop-shadow-md'}`}>
                Vijay Walunj
              </div>
              <div className={`text-[10px] uppercase tracking-widest font-semibold transition-colors ${solid ? 'text-saffron-600' : 'text-saffron-400'}`}>
                BJP | Vashi
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden xl:flex items-center gap-1 backdrop-blur-sm px-2 py-1.5 border transition-all ${solid ? 'bg-ink-50/50 border-ink-100' : 'bg-white/10 border-white/20'}`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-[11px] uppercase tracking-widest font-semibold transition-all duration-300 ${isActive ? (solid ? 'text-saffron-600' : 'text-saffron-400 bg-white/10 rounded-sm') : (solid ? 'text-ink-700 hover:text-saffron-600' : 'text-white/80 hover:text-white hover:bg-white/10')}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="hidden xl:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className={`text-[11px] uppercase tracking-widest font-semibold flex items-center gap-2 ${solid ? 'text-ink-700' : 'text-white'}`}>
                  <HiUser className="w-4 h-4" /> {user.fullName.split(' ')[0]}
                </span>
                <button onClick={handleLogout} className="text-[11px] uppercase tracking-widest font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 border border-red-500/30 px-3 py-1.5 backdrop-blur-md bg-white/20" style={{clipPath:'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)'}}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className={`text-[11px] uppercase tracking-widest font-bold transition-colors ${solid ? 'text-ink-900 hover:text-saffron-600' : 'text-white hover:text-saffron-300'}`}>Login</Link>
                <Link to="/signup" className="btn-primary text-[10px] px-6 py-2.5">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`xl:hidden p-2 backdrop-blur-md transition-colors ${solid ? 'text-ink-900 border border-ink-100' : 'text-white border border-white/20 bg-white/10'}`}
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-xl border-t border-ink-50/50 shadow-2xl absolute w-full">
          <div className="px-6 py-8 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 text-xs uppercase tracking-widest font-bold transition-all ${isActive ? 'bg-saffron-50 text-saffron-600 border-l-2 border-saffron-600' : 'text-ink-800 hover:bg-cream hover:text-saffron-600'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="border-t border-ink-100 pt-6 mt-4">
              {user ? (
                <div className="space-y-4">
                  <p className="px-4 text-xs tracking-widest uppercase text-ink-500">Welcome, {user.fullName.split(' ')[0]}</p>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest font-bold text-red-600 hover:bg-red-50 border border-red-100" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="w-full text-center py-3 text-xs uppercase tracking-widest font-bold text-ink-900 border border-ink-200 hover:bg-ink-50 transition-colors" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}>Login</Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)} className="w-full text-center py-3 text-xs uppercase tracking-widest font-bold bg-saffron-600 text-white hover:bg-saffron-700 transition-colors" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' }}>Sign Up</Link>
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
