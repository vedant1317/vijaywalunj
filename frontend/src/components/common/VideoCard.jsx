import { FiPlay } from 'react-icons/fi';

const VideoCard = ({ title, youtubeUrl, youtubeVideoId, thumbnailUrl, description }) => {
  const thumb = thumbnailUrl || `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`;

  return (
    <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="block relative group overflow-hidden bg-navy-900 border border-saffron-600/30 transition-all duration-500 hover:border-saffron-400" style={{clipPath:'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)'}}>
      <div className="relative overflow-hidden h-56 bg-black">
        <img src={thumb} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Glassy Play Button */}
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:bg-saffron-600/90 group-hover:border-saffron-400 group-hover:scale-110 transition-all duration-500" style={{clipPath:'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)'}}>
            <FiPlay className="w-6 h-6 text-white ml-1.5 opacity-80 group-hover:opacity-100" />
          </div>
        </div>
      </div>
      <div className="p-5 bg-navy-900/90 backdrop-blur-sm relative z-10">
        <h3 className="font-heading font-bold text-white text-base leading-snug line-clamp-2 group-hover:text-saffron-400 transition-colors drop-shadow-sm">{title}</h3>
        {description && <p className="text-navy-300 text-xs font-light mt-2 line-clamp-2">{description}</p>}
      </div>
    </a>
  );
};

export default VideoCard;
