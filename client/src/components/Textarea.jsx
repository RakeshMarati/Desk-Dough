import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const Textarea = ({
  label,
  placeholder = '',
  value,
  onChange,
  error = '',
  rows = 4,
  className = '',
  animated = true,
  ...props
}) => {
  const textareaRef = useRef(null);
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
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full px-4 py-3 rounded-lg border-2 ${
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-coffee-300 focus:border-coffee-600'
        } focus:outline-none focus:ring-2 focus:ring-coffee-200 transition-all duration-200 text-coffee-900 placeholder-coffee-400 resize-none`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default Textarea;

