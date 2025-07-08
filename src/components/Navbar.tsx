import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { Smile, User, LogOut, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigationLinks = [
    { to: '/', label: 'Home' },
    { to: '/movies', label: 'Browse' },
    { to: '/contact', label: 'Suggest' },
  ];

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-yellow-400">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-black hover:text-yellow-600 transition-colors"
            onClick={handleLinkClick}
          >
            <Smile className="w-8 h-8" />
            <span className="text-xl font-bold">Happy Movie</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors font-medium ${
                  isActiveLink(link.to)
                    ? 'text-yellow-600 font-semibold'
                    : 'text-gray-700 hover:text-yellow-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn && user?.role === 'admin' && (
              <Link
                to="/admin"
                className={`transition-colors font-medium ${
                  isActiveLink('/admin')
                    ? 'text-yellow-600 font-semibold'
                    : 'text-gray-700 hover:text-yellow-600'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Login Button (when not logged in) */}
            {!isLoggedIn && (
              <Link
                to="/login"
                className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors font-semibold text-sm"
                onClick={handleLinkClick}
              >
                Login
              </Link>
            )}
            
            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-yellow-600 hover:bg-gray-100 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu Content */}
          <div
            id="mobile-menu"
            className="md:hidden bg-white border-b border-yellow-400 shadow-lg relative z-50"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="container mx-auto px-4 py-6 space-y-1">
              {/* Navigation Links */}
              {navigationLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={handleLinkClick}
                  className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors min-h-[44px] flex items-center ${
                    isActiveLink(link.to)
                      ? 'bg-yellow-400 text-black font-semibold'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-yellow-600'
                  }`}
                  role="menuitem"
                >
                  {link.label}
                </Link>
              ))}

              {/* Admin Dashboard Link (if admin) */}
              {isLoggedIn && user?.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={handleLinkClick}
                  className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors min-h-[44px] flex items-center ${
                    isActiveLink('/admin')
                      ? 'bg-yellow-400 text-black font-semibold'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-yellow-600'
                  }`}
                  role="menuitem"
                >
                  Dashboard
                </Link>
              )}

              {/* User Section (only when logged in) */}
              {isLoggedIn && (
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-2 text-gray-700">
                      <User className="w-5 h-5" />
                      <span className="font-medium">{user?.name}</span>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                        {user?.role}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors font-medium min-h-[44px]"
                      role="menuitem"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;