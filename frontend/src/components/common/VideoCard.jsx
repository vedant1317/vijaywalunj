import { FiPlay } from 'react-icons/fi';

const VideoCard = ({ title, youtubeUrl, youtubeVideoId, thumbnailUrl, description }) => {
  const thumb = thumbnailUrl || `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`;

  return (
    <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="card group block">
      <div className="relative overflow-hidden h-48 bg-black">
        <img src={thumb} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
            <FiPlay className="w-6 h-6 text-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-16" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-navy-800 text-sm leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">{title}</h3>
        {description && <p className="text-gray-500 text-xs mt-1.5 line-clamp-2">{description}</p>}
      </div>
    </a>
  );
};

export default VideoCard;
