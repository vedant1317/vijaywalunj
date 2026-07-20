import { useState, useEffect } from 'react';
import SectionTitle from '../components/common/SectionTitle.jsx';
import ContactCard from '../components/common/ContactCard.jsx';
import api from '../services/api.js';

const STATIC_CONTACTS = [
  // Hospitals
  { _id: 'c1', name: 'NMMC General Hospital, Vashi', phone: '022-27652000', category: 'Hospital', address: 'Sector 10, Vashi, Navi Mumbai', isEmergency: false },
  { _id: 'c2', name: 'Apollo Hospital Navi Mumbai', phone: '022-39540000', category: 'Hospital', address: 'Plot No. 13, Sector 23, Turbhe, Navi Mumbai', isEmergency: false },
  { _id: 'c3', name: 'Fortis Hiranandani Hospital', phone: '022-39165000', category: 'Hospital', address: 'Mini Sea Shore Road, Sector 10A, Vashi, Navi Mumbai', isEmergency: false },
  { _id: 'c4', name: 'Ambulance (Emergency)', phone: '108', category: 'Hospital', isEmergency: true },
  // Police
  { _id: 'c5', name: 'Vashi Police Station', phone: '022-27652131', category: 'Police', address: 'Sector 10, Vashi, Navi Mumbai', isEmergency: false },
  { _id: 'c6', name: 'Police Emergency', phone: '100', category: 'Police', isEmergency: true },
  { _id: 'c7', name: 'Navi Mumbai Police Commissioner', phone: '022-27572020', category: 'Police', isEmergency: false },
  // Traffic Police
  { _id: 'c8', name: 'Navi Mumbai Traffic Control', phone: '022-27572020', category: 'Traffic Police', isEmergency: false },
  { _id: 'c9', name: 'Traffic Emergency', phone: '103', category: 'Traffic Police', isEmergency: true },
  // Helplines
  { _id: 'c10', name: 'Nirbhaya Women Helpline', phone: '1091', category: 'Emergency Helpline', isEmergency: true },
  { _id: 'c11', name: 'Child Helpline', phone: '1098', category: 'Emergency Helpline', isEmergency: true },
  { _id: 'c12', name: 'Senior Citizen Helpline', phone: '14567', category: 'Emergency Helpline', isEmergency: false },
  { _id: 'c13', name: 'Anti-Corruption Helpline', phone: '1064', category: 'Emergency Helpline', isEmergency: false },
  // Disaster Management
  { _id: 'c14', name: 'Disaster Management (Maharashtra)', phone: '1077', category: 'Disaster Management', isEmergency: true },
  { _id: 'c15', name: 'Fire Brigade Emergency', phone: '101', category: 'Disaster Management', isEmergency: true },
  { _id: 'c16', name: 'NDRF Helpline', phone: '011-24363260', category: 'Disaster Management', isEmergency: false },
  // NMMC
  { _id: 'c17', name: 'NMMC Control Room', phone: '1800-22-0033', category: 'NMMC', isEmergency: true, notes: 'Toll-free 24x7' },
  { _id: 'c18', name: 'NMMC Water Supply', phone: '022-27568000', category: 'NMMC', isEmergency: false },
  { _id: 'c19', name: 'NMMC Solid Waste / Garbage', phone: '022-27568000', category: 'NMMC', isEmergency: false },
  { _id: 'c20', name: 'NMMC Street Light', phone: '022-27568000', category: 'NMMC', isEmergency: false },
];

const CATEGORIES = ['All', 'Hospital', 'Police', 'Traffic Police', 'Emergency Helpline', 'Disaster Management', 'NMMC'];

const ImportantContacts = () => {
  const [contacts, setContacts] = useState(STATIC_CONTACTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/contacts').then(({ data }) => { if (data?.length) setContacts(data); }).catch(() => {});
  }, []);

  const filtered = contacts.filter(c => {
    const matchCat = activeCategory === 'All' || c.category === activeCategory;
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search);
    return matchCat && matchSearch;
  });

  const emergencyContacts = filtered.filter(c => c.isEmergency);
  const regularContacts = filtered.filter(c => !c.isEmergency);

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <div className="bg-ink-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Important Contacts</h1>
          <div className="w-16 h-1 bg-saffron-600 mx-auto mb-4 rounded-full" />
          <p className="text-ink-300 text-base max-w-2xl mx-auto">
            Emergency numbers, hospital contacts, police stations, NMMC helplines — all important contacts for Vashi and Navi Mumbai.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or phone..."
            className="input-field flex-grow sm:max-w-xs"
          />
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${activeCategory === cat ? 'bg-saffron-600 text-white shadow-md' : 'bg-white border border-ink-200 text-ink-600 hover:border-saffron-300 hover:text-saffron-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        {emergencyContacts.length > 0 && (
          <div className="mb-10">
            <SectionTitle tag="⚠️ Emergency" title="Emergency Numbers" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
              {emergencyContacts.map(c => <ContactCard key={c._id} {...c} />)}
            </div>
          </div>
        )}

        {/* Regular Contacts */}
        {regularContacts.length > 0 && (
          <div>
            <SectionTitle tag="Contacts" title="All Contacts" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {regularContacts.map(c => <ContactCard key={c._id} {...c} />)}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-ink-400">
            <div className="text-5xl mb-3">🔍</div>
            <p>No contacts found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportantContacts;
