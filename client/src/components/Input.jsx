import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const Input = ({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  className = '',
  animated = true,
  ...props
}) => {
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (animated && containerRef.current) {
      anime({
        targets: containerRef.current,
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 400,
        easing: 'easeOutExpo',
      });
    }
  }, [animated]);

  return (
    <div
      ref={containerRef}
      className={`space-y-2 ${className}`}
      style={animated ? { opacity: 0 } : {}}
    >
      {label && (
        <label className="block text-sm font-semibold text-coffee-700">
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-lg border-2 ${
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-coffee-300 focus:border-coffee-600'
        } focus:outline-none focus:ring-2 focus:ring-coffee-200 transition-all duration-200 text-coffee-900 placeholder-coffee-400`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default Input;

