import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);

  useEffect(() => {
    // Animate navbar on mount
    if (navRef.current) {
      anime({
        targets: navRef.current,
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 800,
        easing: 'easeOutExpo',
      });
    }

    // Animate logo
    if (logoRef.current) {
      anime({
        targets: logoRef.current,
        scale: [0, 1],
        rotate: [0, 360],
        duration: 1000,
        delay: 200,
        easing: 'easeOutElastic(1, .6)',
      });
    }

    // Animate menu items
    menuItemsRef.current.forEach((item, index) => {
      if (item) {
        anime({
          targets: item,
          opacity: [0, 1],
          translateX: [-20, 0],
          duration: 600,
          delay: 400 + index * 100,
          easing: 'easeOutExpo',
        });
      }
    });

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    // Animate mobile menu
    if (!isMenuOpen) {
      anime({
        targets: '.mobile-menu',
        opacity: [0, 1],
        translateX: ['-100%', '0%'],
        duration: 400,
        easing: 'easeOutExpo',
      });
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      style={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            ref={logoRef}
            className="flex items-center space-x-2"
            style={{ transform: 'scale(0)' }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-coffee-600 to-coffee-800 rounded-lg flex items-center justify-center">
              <span className="text-cream-100 text-xl font-bold">☕</span>
            </div>
            <span className="text-2xl font-bold text-coffee-800">
              My Café
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                ref={(el) => (menuItemsRef.current[index] = el)}
                className="text-coffee-700 hover:text-coffee-900 font-medium transition-colors duration-200 relative group"
                style={{ opacity: 0 }}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-coffee-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <button
              ref={(el) => (menuItemsRef.current[navLinks.length] = el)}
              className="px-6 py-2 bg-coffee-600 text-white rounded-full hover:bg-coffee-700 transition-all duration-200 transform hover:scale-105 shadow-md"
              style={{ opacity: 0 }}
            >
              Order Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-coffee-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu md:hidden fixed top-20 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300`}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="block text-coffee-700 hover:text-coffee-900 font-medium py-2 border-b border-coffee-100"
            >
              {link.name}
            </Link>
          ))}
          <button className="w-full px-6 py-3 bg-coffee-600 text-white rounded-full hover:bg-coffee-700 transition-all duration-200">
            Order Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

