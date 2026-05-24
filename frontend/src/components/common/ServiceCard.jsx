import { Link } from 'react-router-dom';

const ServiceCard = ({ icon, title, description, linkTo, linkHref, external = false }) => {
  const content = (
    <div className="card p-6 flex flex-col items-start gap-4 group hover:border-saffron-200 border border-transparent transition-all duration-300 h-full">
      <div className="w-14 h-14 bg-saffron-50 rounded-xl flex items-center justify-center text-3xl group-hover:bg-saffron-100 transition-colors shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-navy-800 text-base mb-1 group-hover:text-saffron-600 transition-colors">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
      <div className="mt-auto pt-2">
        <span className="text-saffron-600 text-sm font-semibold group-hover:underline">Access →</span>
      </div>
    </div>
  );

  if (external && linkHref) {
    return <a href={linkHref} target="_blank" rel="noopener noreferrer" className="h-full block">{content}</a>;
  }
  return <Link to={linkTo || '/'} className="h-full block">{content}</Link>;
};

export default ServiceCard;
