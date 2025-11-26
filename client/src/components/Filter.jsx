import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const Filter = ({ categories = [], activeCategory, onFilterChange, className = '' }) => {
  const filterRef = useRef(null);
  const buttonRefs = useRef([]);

  useEffect(() => {
    if (filterRef.current) {
      anime({
        targets: filterRef.current,
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 600,
        easing: 'easeOutExpo',
      });
    }
  }, []);

  useEffect(() => {
    buttonRefs.current.forEach((ref, index) => {
      if (ref) {
        anime({
          targets: ref,
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 400,
          delay: index * 50,
          easing: 'easeOutExpo',
        });
      }
    });
  }, [categories]);

  const handleFilterClick = (category, index) => {
    onFilterChange(category);
    
    // Animate active button
    if (buttonRefs.current[index]) {
      anime({
        targets: buttonRefs.current[index],
        scale: [1, 0.95, 1],
        duration: 300,
        easing: 'easeOutExpo',
      });
    }
  };

  return (
    <div
      ref={filterRef}
      className={`flex flex-wrap gap-3 justify-center ${className}`}
      style={{ opacity: 0 }}
    >
      <button
        ref={(el) => (buttonRefs.current[0] = el)}
        onClick={() => handleFilterClick('all', 0)}
        className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 ${
          activeCategory === 'all' || !activeCategory
            ? 'bg-coffee-600 text-white shadow-lg'
            : 'bg-white text-coffee-700 border-2 border-coffee-300 hover:border-coffee-600'
        }`}
        style={{ opacity: 0 }}
      >
        All
      </button>
      {categories.map((category, index) => (
        <button
          key={category}
          ref={(el) => (buttonRefs.current[index + 1] = el)}
          onClick={() => handleFilterClick(category, index + 1)}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 capitalize ${
            activeCategory === category
              ? 'bg-coffee-600 text-white shadow-lg'
              : 'bg-white text-coffee-700 border-2 border-coffee-300 hover:border-coffee-600'
          }`}
          style={{ opacity: 0 }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filter;

