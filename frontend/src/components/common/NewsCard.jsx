import { FiCalendar, FiTag } from 'react-icons/fi';

const NewsCard = ({ title, summary, imageUrl, category, publishedAt, sourceUrl }) => {
  const date = new Date(publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="card group cursor-pointer">
      <div className="relative overflow-hidden h-48 bg-gray-100">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center">
            <span className="text-white/30 text-4xl">📰</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-saffron-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <FiTag className="w-3 h-3" /> {category || 'News'}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          <FiCalendar className="w-3.5 h-3.5" />
          <span>{date}</span>
        </div>
        <h3 className="font-bold text-navy-800 text-base leading-snug mb-2 group-hover:text-saffron-600 transition-colors line-clamp-2">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{summary}</p>
        {sourceUrl && (
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-saffron-600 text-sm font-medium hover:text-saffron-700 transition-colors">
            Read More →
          </a>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
