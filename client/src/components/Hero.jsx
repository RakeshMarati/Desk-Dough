import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const coffeeIconRef = useRef(null);
  const floatingElementsRef = useRef([]);

  useEffect(() => {
    // Main hero animation sequence
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 800,
    });

    // Animate title
    timeline.add({
      targets: titleRef.current,
      opacity: [0, 1],
      translateY: [-50, 0],
      scale: [0.8, 1],
      duration: 1000,
    });

    // Animate subtitle
    timeline.add({
      targets: subtitleRef.current,
      opacity: [0, 1],
      translateY: [-30, 0],
      duration: 800,
    }, '-=500');

    // Animate description
    timeline.add({
      targets: descriptionRef.current,
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 800,
    }, '-=400');

    // Animate buttons
    timeline.add({
      targets: buttonRef.current,
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 600,
    }, '-=300');

    // Animate coffee icon with rotation
    if (coffeeIconRef.current) {
      anime({
        targets: coffeeIconRef.current,
        rotate: [0, 360],
        scale: [0, 1],
        duration: 1200,
        delay: 500,
        easing: 'easeOutElastic(1, .8)',
      });
    }

    // Floating elements animation
    floatingElementsRef.current.forEach((el, index) => {
      if (el) {
        anime({
          targets: el,
          translateY: [0, -20],
          opacity: [0, 0.6],
          duration: 2000,
          delay: 1000 + index * 200,
          easing: 'easeInOutSine',
          loop: true,
          direction: 'alternate',
        });
      }
    });

    // Background gradient animation
    if (heroRef.current) {
      anime({
        targets: heroRef.current,
        backgroundPosition: ['0% 0%', '100% 100%'],
        duration: 10000,
        easing: 'linear',
        loop: true,
        direction: 'alternate',
      });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream-100 via-cream-50 to-coffee-100"
      style={{
        backgroundSize: '200% 200%',
      }}
    >
      {/* Floating decorative elements */}
      <div
        ref={(el) => (floatingElementsRef.current[0] = el)}
        className="absolute top-20 left-10 w-20 h-20 bg-coffee-200 rounded-full opacity-0 blur-xl"
      ></div>
      <div
        ref={(el) => (floatingElementsRef.current[1] = el)}
        className="absolute top-40 right-20 w-32 h-32 bg-cream-300 rounded-full opacity-0 blur-xl"
      ></div>
      <div
        ref={(el) => (floatingElementsRef.current[2] = el)}
        className="absolute bottom-20 left-1/4 w-24 h-24 bg-coffee-300 rounded-full opacity-0 blur-xl"
      ></div>
      <div
        ref={(el) => (floatingElementsRef.current[3] = el)}
        className="absolute bottom-40 right-1/3 w-28 h-28 bg-cream-400 rounded-full opacity-0 blur-xl"
      ></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Coffee Icon */}
        <div
          ref={coffeeIconRef}
          className="mb-8 flex justify-center"
          style={{ transform: 'scale(0)' }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-coffee-600 to-coffee-800 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-5xl">☕</span>
          </div>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-coffee-900 mb-6 leading-tight"
          style={{ opacity: 0 }}
        >
          Welcome to{' '}
          <span className="bg-gradient-to-r from-coffee-700 to-coffee-500 bg-clip-text text-transparent">
            My Café
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-2xl md:text-3xl lg:text-4xl text-coffee-700 font-semibold mb-6"
          style={{ opacity: 0 }}
        >
          Where Every Sip Tells a Story
        </p>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-lg md:text-xl text-coffee-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ opacity: 0 }}
        >
          Experience the perfect blend of rich flavors, cozy ambiance, and warm
          hospitality. Your daily dose of happiness, served fresh.
        </p>

        {/* CTA Buttons */}
        <div
          ref={buttonRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ opacity: 0 }}
        >
          <button className="px-8 py-4 bg-coffee-600 text-white rounded-full font-semibold text-lg hover:bg-coffee-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            Explore Menu
          </button>
          <button className="px-8 py-4 bg-white text-coffee-700 rounded-full font-semibold text-lg border-2 border-coffee-600 hover:bg-coffee-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            Visit Us
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-coffee-700"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;

