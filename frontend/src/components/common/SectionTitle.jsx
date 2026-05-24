const SectionTitle = ({ tag, title, subtitle, center = false, light = false }) => (
  <div className={center ? 'text-center' : ''}>
    {tag && (
      <span className="inline-block text-xs font-bold text-saffron-600 bg-saffron-50 border border-saffron-200 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
        {tag}
      </span>
    )}
    <h2 className={`text-2xl sm:text-3xl font-bold ${light ? 'text-white' : 'text-navy-800'} leading-tight`}>
      {title}
    </h2>
    <div className={`w-14 h-1 bg-saffron-600 mt-2 rounded-full ${center ? 'mx-auto' : ''}`} />
    {subtitle && (
      <p className={`mt-4 text-base ${light ? 'text-gray-200' : 'text-gray-500'} max-w-2xl ${center ? 'mx-auto' : ''}`}>
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionTitle;
