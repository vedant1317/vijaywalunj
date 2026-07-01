import { MdPhone, MdEmail, MdLocationOn, MdLocalHospital, MdLocalPolice, MdWarning, MdSecurity, MdAccountBalance, MdInfo } from 'react-icons/md';

const categoryColors = {
  'Hospital': 'bg-green-900/10 border-green-600/30 text-green-700',
  'Police': 'bg-blue-900/10 border-blue-600/30 text-blue-700',
  'Traffic Police': 'bg-yellow-900/10 border-yellow-600/30 text-yellow-700',
  'Emergency Helpline': 'bg-red-900/10 border-red-600/30 text-red-700',
  'Disaster Management': 'bg-orange-900/10 border-orange-600/30 text-orange-700',
  'NMMC': 'bg-purple-900/10 border-purple-600/30 text-purple-700',
  'Other': 'bg-navy-900/10 border-navy-600/30 text-navy-700',
};

const categoryIcons = {
  'Hospital': <MdLocalHospital />,
  'Police': <MdLocalPolice />,
  'Traffic Police': <MdWarning />,
  'Emergency Helpline': <MdWarning />,
  'Disaster Management': <MdSecurity />,
  'NMMC': <MdAccountBalance />,
  'Other': <MdInfo />,
};

const ContactCard = ({ name, phone, email, address, category, notes, isEmergency }) => {
  const colorClass = categoryColors[category] || categoryColors['Other'];
  const icon = categoryIcons[category] || <MdInfo />;

  return (
    <div className={`glass-shard p-6 relative group ${isEmergency ? 'border-red-500/50 bg-red-900/5' : ''}`}>
      {isEmergency && (
        <span className="absolute top-4 right-4 bg-red-600/10 text-red-600 text-[10px] tracking-widest font-bold uppercase px-3 py-1 border border-red-600/20" style={{clipPath:'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)'}}>
          EMERGENCY
        </span>
      )}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 flex items-center justify-center text-xl flex-shrink-0 border ${colorClass} transition-transform group-hover:scale-110`} style={{clipPath:'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)'}}>
            {icon}
          </div>
          <div className="flex-1 min-w-0 pr-12">
            <span className={`inline-block text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 mb-2 ${colorClass}`}>{category}</span>
            <h3 className="font-heading font-bold text-navy-900 text-base leading-tight group-hover:text-saffron-600 transition-colors drop-shadow-sm">{name}</h3>
          </div>
        </div>
        
        <div className="space-y-2 mt-2 pt-4 border-t border-navy-100">
          <a href={`tel:${phone}`} className="flex items-center gap-3 text-sm text-navy-900 font-bold hover:text-saffron-600 transition-colors">
            <div className="w-6 h-6 rounded-full bg-saffron-100 flex items-center justify-center text-saffron-600 shrink-0">
              <MdPhone className="w-3.5 h-3.5" />
            </div>
            <span className="tracking-wide">{phone}</span>
          </a>
          {email && (
            <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-navy-600 hover:text-navy-900 transition-colors">
              <div className="w-6 h-6 rounded-full bg-navy-50 flex items-center justify-center text-navy-500 shrink-0">
                <MdEmail className="w-3 h-3" />
              </div>
              <span className="truncate">{email}</span>
            </a>
          )}
          {address && (
            <div className="flex items-start gap-3 text-xs text-navy-500">
              <div className="w-6 h-6 rounded-full bg-navy-50 flex items-center justify-center text-navy-500 shrink-0 mt-0.5">
                <MdLocationOn className="w-3.5 h-3.5" />
              </div>
              <span className="leading-relaxed">{address}</span>
            </div>
          )}
        </div>
        {notes && <p className="text-[11px] text-navy-400 mt-2 font-light italic">{notes}</p>}
      </div>
    </div>
  );
};

export default ContactCard;
