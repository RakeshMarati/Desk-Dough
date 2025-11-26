import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  animated = true,
  ...props
}) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (animated && buttonRef.current) {
      anime({
        targets: buttonRef.current,
        scale: [0.95, 1],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutExpo',
      });
    }
  }, [animated]);

  const baseStyles =
    'font-semibold rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

  const variants = {
    primary: 'bg-coffee-600 text-white hover:bg-coffee-700 shadow-lg hover:shadow-xl',
    secondary:
      'bg-white text-coffee-700 border-2 border-coffee-600 hover:bg-coffee-50 shadow-lg hover:shadow-xl',
    outline:
      'bg-transparent text-coffee-700 border-2 border-coffee-600 hover:bg-coffee-600 hover:text-white',
    ghost: 'bg-transparent text-coffee-700 hover:bg-coffee-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

