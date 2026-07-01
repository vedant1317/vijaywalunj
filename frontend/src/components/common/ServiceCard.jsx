import { Link } from 'react-router-dom';

const ServiceCard = ({ icon, title, description, linkTo, linkHref, external = false }) => {
  const content = (
    <div className="glass-shard p-8 flex flex-col items-start gap-6 group h-full">
      <div className="text-[10px] tracking-widest uppercase font-bold text-saffron-600 bg-saffron-100/50 px-3 py-1 border border-saffron-200/50 group-hover:bg-saffron-600 group-hover:text-white transition-colors" style={{clipPath:'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)'}}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-heading font-bold text-navy-900 text-xl mb-3 group-hover:text-saffron-600 transition-colors leading-tight">{title}</h3>
        <p className="text-navy-600 text-sm font-light leading-relaxed">{description}</p>
      </div>
      <div className="mt-auto pt-4 flex items-center justify-between w-full opacity-60 group-hover:opacity-100 transition-opacity">
        <div className="w-8 h-[1px] bg-saffron-600 transition-all duration-300 group-hover:w-16"></div>
        <span className="text-saffron-600 text-[10px] uppercase font-bold tracking-widest group-hover:-translate-x-2 transition-transform">Explore +</span>
      </div>
    </div>
  );

  if (external && linkHref) {
    return <a href={linkHref} target="_blank" rel="noopener noreferrer" className="h-full block">{content}</a>;
  }
  return <Link to={linkTo || '/'} className="h-full block">{content}</Link>;
};

export default ServiceCard;
