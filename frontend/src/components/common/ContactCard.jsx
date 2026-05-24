import { MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';

const categoryColors = {
  'Hospital': 'bg-green-50 border-green-200 text-green-700',
  'Police': 'bg-blue-50 border-blue-200 text-blue-700',
  'Traffic Police': 'bg-yellow-50 border-yellow-200 text-yellow-700',
  'Emergency Helpline': 'bg-red-50 border-red-200 text-red-700',
  'Disaster Management': 'bg-orange-50 border-orange-200 text-orange-700',
  'NMMC': 'bg-purple-50 border-purple-200 text-purple-700',
  'Other': 'bg-gray-50 border-gray-200 text-gray-700',
};

const categoryIcons = {
  'Hospital': '🏥',
  'Police': '👮',
  'Traffic Police': '🚦',
  'Emergency Helpline': '🆘',
  'Disaster Management': '⛑️',
  'NMMC': '🏛️',
  'Other': '📋',
};

const ContactCard = ({ name, phone, email, address, category, notes, isEmergency }) => {
  const colorClass = categoryColors[category] || categoryColors['Other'];
  const icon = categoryIcons[category] || '📋';

  return (
    <div className={`card p-5 border ${isEmergency ? 'border-red-300 bg-red-50' : 'border-gray-100'} relative`}>
      {isEmergency && (
        <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">EMERGENCY</span>
      )}
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 rounded-xl border flex items-center justify-center text-xl flex-shrink-0 ${colorClass}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border mb-1 ${colorClass}`}>{category}</span>
          <h3 className="font-bold text-navy-800 text-sm leading-tight mb-2">{name}</h3>
          <div className="space-y-1">
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-sm text-saffron-600 font-semibold hover:text-saffron-700 transition-colors">
              <MdPhone className="w-4 h-4 flex-shrink-0" /> {phone}
            </a>
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-xs text-gray-500 hover:text-navy-700 transition-colors">
                <MdEmail className="w-3.5 h-3.5 flex-shrink-0" /> {email}
              </a>
            )}
            {address && (
              <div className="flex items-start gap-2 text-xs text-gray-500">
                <MdLocationOn className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> {address}
              </div>
            )}
          </div>
          {notes && <p className="text-xs text-gray-400 mt-2 italic">{notes}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
