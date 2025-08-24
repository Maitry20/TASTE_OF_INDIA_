import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ activeSection, setActiveSection }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { getCartCount } = useCart();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'menu', label: t.nav.menu },
    { id: 'cart', label: t.nav.cart },
    { id: 'reviews', label: t.nav.reviews },
    { id: 'signup', label: t.nav.signup }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-primary cursor-pointer"
            onClick={() => setActiveSection('home')}
          >
            🇮🇳 Taste Of India
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-primary'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {item.label}
                {item.id === 'cart' && getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </motion.button>
            ))}
            
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
              >
                <span>{language === 'en' ? '🇬🇧' : '🇫🇷'}</span>
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
              
              {isLangDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-32 bg-white rounded-2xl shadow-lg border z-50"
                >
                  <button
                    onClick={() => {
                      if (language !== 'en') toggleLanguage();
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 rounded-t-2xl flex items-center space-x-2 ${
                      language === 'en' ? 'bg-gray-50 text-primary' : ''
                    }`}
                  >
                    <span>🇬🇧</span>
                    <span>English</span>
                  </button>
                  <button
                    onClick={() => {
                      if (language !== 'fr') toggleLanguage();
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 rounded-b-2xl flex items-center space-x-2 ${
                      language === 'fr' ? 'bg-gray-50 text-primary' : ''
                    }`}
                  >
                    <span>🇫🇷</span>
                    <span>Français</span>
                  </button>
                </motion.div>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={signOut}
              className="px-4 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-colors"
            >
              Sign Out
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-sm font-medium ${
                  activeSection === item.id ? 'text-primary' : 'text-gray-700'
                }`}
              >
                {item.label}
                {item.id === 'cart' && getCartCount() > 0 && (
                  <span className="ml-2 bg-primary text-white text-xs rounded-full px-2 py-1">
                    {getCartCount()}
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={toggleLanguage}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700"
            >
              {language === 'en' ? '🇫🇷 Français' : '🇬🇧 English'}
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;