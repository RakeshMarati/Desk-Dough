import { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';

const MenuCard = ({
  id,
  name,
  description,
  price,
  image,
  category,
  featured = false,
  onAddToCart,
  index = 0,
}) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: index * 100,
        easing: 'easeOutExpo',
      });
    }
  }, [index]);

  useEffect(() => {
    if (isHovered && imageRef.current) {
      anime({
        targets: imageRef.current,
        scale: [1, 1.1],
        duration: 400,
        easing: 'easeOutExpo',
      });
    } else if (imageRef.current) {
      anime({
        targets: imageRef.current,
        scale: [1.1, 1],
        duration: 400,
        easing: 'easeOutExpo',
      });
    }
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
        featured ? 'ring-2 ring-coffee-500 ring-offset-2' : ''
      }`}
      style={{ opacity: 0 }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-coffee-200 to-cream-200">
        {image ? (
          <img
            ref={imageRef}
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">☕</span>
          </div>
        )}
        {featured && (
          <div className="absolute top-4 right-4 bg-coffee-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
        {category && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-coffee-700 px-3 py-1 rounded-full text-xs font-medium">
            {category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-coffee-900 mb-2">{name}</h3>
        <p className="text-coffee-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Price and Add Button */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-coffee-700">
            ${price?.toFixed(2) || '0.00'}
          </span>
          <button
            onClick={() => onAddToCart && onAddToCart(id)}
            className="px-4 py-2 bg-coffee-600 text-white rounded-full hover:bg-coffee-700 transition-all duration-200 transform hover:scale-110 active:scale-95 text-sm font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;

