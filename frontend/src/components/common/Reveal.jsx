import { useEffect, useRef, useState } from 'react';

/**
 * Reveals its children with a subtle fade + rise the first time they scroll into
 * view. Animates only `opacity` and `transform` (compositor-friendly) and skips
 * the motion entirely when the user prefers reduced motion.
 *
 * @param {React.ElementType} as        wrapper element/component (default 'div')
 * @param {number}            delay      stagger delay in ms
 * @param {string}            className  extra classes for the wrapper
 */
const Reveal = ({ children, as: Tag = 'div', delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
      className={`transition-all duration-700 ease-out ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
