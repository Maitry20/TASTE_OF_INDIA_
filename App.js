import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Reviews from './components/Reviews';
import Signup from './components/Signup';
import SignIn from './components/SignIn';

const AppContent = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll to section
  useEffect(() => {
    if (user) {
      const section = document.getElementById(activeSection);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [activeSection, user]);

  if (!user) {
    return <SignIn />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero setActiveSection={setActiveSection} />;
      case 'menu':
        return <Menu />;
      case 'cart':
        return <Cart setActiveSection={setActiveSection} />;
      case 'reviews':
        return <Reviews />;
      case 'signup':
        return <Signup />;
      default:
        return <Hero setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="App">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="pt-16">
        <div id="home">
          {activeSection === 'home' && <Hero setActiveSection={setActiveSection} />}
        </div>
        
        <div id="menu">
          {activeSection === 'menu' && <Menu />}
        </div>
        
        <div id="cart">
          {activeSection === 'cart' && <Cart setActiveSection={setActiveSection} />}
        </div>
        
        <div id="reviews">
          {activeSection === 'reviews' && <Reviews />}
        </div>
        
        <div id="signup">
          {activeSection === 'signup' && <Signup />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-bold mb-4">🇮🇳 Taste Of India</div>
          <div className="flex justify-center">
            <a href="tel:+33758460381" className="text-gray-400 hover:text-white transition-colors">
              📞 +33 7 58 46 03 81
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-gray-400 text-sm">
            © 2024 Taste Of India. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;