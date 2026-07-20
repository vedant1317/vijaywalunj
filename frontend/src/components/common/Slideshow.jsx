import { useCallback, useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/**
 * Reusable image slideshow / carousel.
 *
 * @param {{ url: string, caption?: string }[]} images
 * @param {number} interval  auto-advance interval in ms (default 4000)
 * @param {string} accentClass  full tailwind bg class for the active dot (e.g. 'bg-saffron-500')
 * @param {React.ReactNode} fallback  rendered when there are no images
 */
const Slideshow = ({ images = [], interval = 4000, accentClass = 'bg-saffron-500', fallback = null }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  const go = useCallback((next) => {
    setIndex((current) => (next + count) % count);
  }, [count]);

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Auto-advance
  const timer = useRef(null);
  useEffect(() => {
    if (paused || count <= 1) return undefined;
    timer.current = setTimeout(() => setIndex((c) => (c + 1) % count), interval);
    return () => clearTimeout(timer.current);
  }, [index, paused, count, interval]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  if (!count) return fallback;

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl bg-ink-900 shadow-lg select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Slides */}
      <div className="relative aspect-video w-full">
        {images.map((img, i) => (
          <div
            key={img.url || i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            aria-hidden={i !== index}
          >
            <img
              src={img.url}
              alt={img.caption || `Slide ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="h-full w-full object-cover"
            />
            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-ink-900/70 px-5 py-3">
                <p className="text-sm font-medium text-white/90">{img.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/85 p-2 text-ink-800 shadow transition hover:bg-white"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/85 p-2 text-ink-800 shadow transition hover:bg-white"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>

          {/* Counter */}
          <div className="absolute right-3 top-3 z-20 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white">
            {index + 1} / {count}
          </div>

          {/* Dots */}
          <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center gap-1.5">
            {images.map((img, i) => (
              <button
                key={img.url || i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? `w-5 ${accentClass}` : 'w-1.5 bg-white/60 hover:bg-white'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Slideshow;
