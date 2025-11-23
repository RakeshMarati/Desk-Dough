import { useEffect, useRef } from 'react';
import anime from 'animejs';

const Home = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Basic anime.js example - fade in and slide up animation
    anime({
      targets: titleRef.current,
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 1000,
      easing: 'easeOutExpo',
    });

    anime({
      targets: subtitleRef.current,
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 1000,
      delay: 300,
      easing: 'easeOutExpo',
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1
        ref={titleRef}
        className="text-5xl font-bold text-coffee-800 mb-4"
        style={{ opacity: 0 }}
      >
        Welcome to My Café
      </h1>
      <p
        ref={subtitleRef}
        className="text-xl text-coffee-600"
        style={{ opacity: 0 }}
      >
        Step 1: Base setup completed with React, Vite, Tailwind, Redux, Router & anime.js
      </p>
    </div>
  );
};

export default Home;

