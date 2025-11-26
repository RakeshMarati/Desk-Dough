import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const Loader = ({ size = 'md', fullScreen = false, message = 'Loading...' }) => {
  const loaderRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const circle3Ref = useRef(null);

  useEffect(() => {
    // Animate loader appearance
    if (loaderRef.current) {
      anime({
        targets: loaderRef.current,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 400,
        easing: 'easeOutExpo',
      });
    }

    // Animate circles
    const animateCircles = () => {
      if (circle1Ref.current) {
        anime({
          targets: circle1Ref.current,
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
          duration: 1200,
          easing: 'easeInOutSine',
          loop: true,
        });
      }
      if (circle2Ref.current) {
        anime({
          targets: circle2Ref.current,
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
          duration: 1200,
          delay: 200,
          easing: 'easeInOutSine',
          loop: true,
        });
      }
      if (circle3Ref.current) {
        anime({
          targets: circle3Ref.current,
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
          duration: 1200,
          delay: 400,
          easing: 'easeInOutSine',
          loop: true,
        });
      }
    };

    animateCircles();
  }, []);

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const circleSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-6 h-6',
  };

  const content = (
    <div
      ref={loaderRef}
      className="flex flex-col items-center justify-center"
      style={{ opacity: 0 }}
    >
      {/* Animated Circles */}
      <div className={`flex items-center justify-center space-x-2 ${sizes[size]}`}>
        <div
          ref={circle1Ref}
          className={`${circleSizes[size]} bg-coffee-600 rounded-full`}
        ></div>
        <div
          ref={circle2Ref}
          className={`${circleSizes[size]} bg-coffee-600 rounded-full`}
        ></div>
        <div
          ref={circle3Ref}
          className={`${circleSizes[size]} bg-coffee-600 rounded-full`}
        ></div>
      </div>
      {message && (
        <p className="mt-4 text-coffee-700 font-medium">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;

