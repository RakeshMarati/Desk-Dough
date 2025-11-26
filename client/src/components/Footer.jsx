import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';

const Footer = () => {
  const footerRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    if (footerRef.current) {
      anime({
        targets: footerRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutExpo',
      });
    }

    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        anime({
          targets: ref,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          delay: 200 + index * 100,
          easing: 'easeOutExpo',
        });
      }
    });
  }, []);

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Story', path: '/story' },
      { name: 'Careers', path: '/careers' },
      { name: 'Contact', path: '/contact' },
    ],
    menu: [
      { name: 'Coffee', path: '/menu?category=coffee' },
      { name: 'Tea', path: '/menu?category=tea' },
      { name: 'Pastries', path: '/menu?category=pastries' },
      { name: 'Specialty', path: '/menu?category=specialty' },
    ],
    support: [
      { name: 'FAQ', path: '/faq' },
      { name: 'Shipping', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: '#' },
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-coffee-900 text-cream-100 mt-20"
      style={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div
            ref={(el) => (sectionRefs.current[0] = el)}
            className="space-y-4"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-coffee-600 to-coffee-800 rounded-lg flex items-center justify-center">
                <span className="text-cream-100 text-xl font-bold">☕</span>
              </div>
              <span className="text-2xl font-bold">My Café</span>
            </div>
            <p className="text-cream-200 text-sm leading-relaxed">
              Where every sip tells a story. Experience the perfect blend of
              rich flavors and warm hospitality.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-coffee-800 rounded-full flex items-center justify-center hover:bg-coffee-700 transition-all duration-200 transform hover:scale-110 text-lg"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div
            ref={(el) => (sectionRefs.current[1] = el)}
            className="space-y-4"
            style={{ opacity: 0 }}
          >
            <h3 className="text-lg font-bold text-cream-50">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-cream-200 hover:text-cream-50 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu Links */}
          <div
            ref={(el) => (sectionRefs.current[2] = el)}
            className="space-y-4"
            style={{ opacity: 0 }}
          >
            <h3 className="text-lg font-bold text-cream-50">Menu</h3>
            <ul className="space-y-2">
              {footerLinks.menu.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-cream-200 hover:text-cream-50 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div
            ref={(el) => (sectionRefs.current[3] = el)}
            className="space-y-4"
            style={{ opacity: 0 }}
          >
            <h3 className="text-lg font-bold text-cream-50">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-cream-200 hover:text-cream-50 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-coffee-800 mt-12 pt-8 text-center">
          <p className="text-cream-200 text-sm">
            © {new Date().getFullYear()} My Café. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

