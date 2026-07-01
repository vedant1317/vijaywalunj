import { FiCalendar, FiArrowRight } from 'react-icons/fi';

const NewsCard = ({ title, summary, imageUrl, category, publishedAt, sourceUrl }) => {
  const date = new Date(publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="group cursor-pointer flex flex-col h-full bg-white relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-navy-100" style={{clipPath:'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'}}>
      <div className="relative overflow-hidden h-56 bg-cream-dark">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />
        ) : (
          <div className="w-full h-full bg-navy-900 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'linear-gradient(var(--saffron) 1px, transparent 1px), linear-gradient(90deg, var(--saffron) 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
            <span className="text-white/30 font-heading text-4xl tracking-widest uppercase font-bold relative z-10 opacity-20 group-hover:opacity-40 transition-opacity">NEWS</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-navy-900 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 border-l-2 border-saffron-600">
          {category || 'Updates'}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col relative z-20 bg-white">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-saffron-600 mb-4 inline-block drop-shadow-sm">
          <FiCalendar className="w-3.5 h-3.5 inline mr-1" />
          {date}
        </div>
        <h3 className="font-heading font-bold text-navy-900 text-xl leading-[1.3] mb-3 group-hover:text-saffron-600 transition-colors line-clamp-2">{title}</h3>
        <p className="text-navy-600 text-sm font-light leading-relaxed line-clamp-3 mb-6 flex-1">{summary}</p>
        <div className="mt-auto">
          {sourceUrl ? (
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold text-navy-900 group-hover:text-saffron-600 transition-colors">
              <span className="mr-2">Read Article</span> <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          ) : (
            <span className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold text-navy-400">
              <span className="mr-2">Press Release</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
