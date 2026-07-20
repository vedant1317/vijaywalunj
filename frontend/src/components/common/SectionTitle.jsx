const SectionTitle = ({ tag, title, subtitle, center = false, light = false }) => (
  <div className={`${center ? 'flex flex-col items-center text-center' : ''} mb-8`}>
    {tag && (
      <div className="flex items-center gap-3 mb-4">
        {!center && <div className="w-8 h-[1px] bg-saffron-600"></div>}
        <span className="inline-block text-[10px] items-center font-bold text-saffron-600 uppercase tracking-widest px-3 py-1 bg-saffron-600/10 border border-saffron-600/20" style={{clipPath:'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)'}}>
          {tag}
        </span>
        {center && <div className="w-8 h-[1px] bg-saffron-600"></div>}
      </div>
    )}
    <h2 className={`text-4xl sm:text-5xl font-heading font-bold ${light ? 'text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]' : 'text-ink-900 drop-shadow-sm'} leading-tight tracking-tight`}>
      {title}
    </h2>
    <div className={`mt-4 ${center ? 'mx-auto flex gap-1 justify-center' : 'flex gap-1'}`}>
      <div className="w-16 h-1 bg-saffron-600"></div>
      <div className="w-2 h-1 bg-saffron-400"></div>
    </div>
    {subtitle && (
      <p className={`mt-6 text-sm font-light leading-relaxed ${light ? 'text-ink-200' : 'text-ink-600'} max-w-2xl ${center ? 'mx-auto' : ''}`}>
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionTitle;
