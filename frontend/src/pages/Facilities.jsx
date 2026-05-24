import { useState } from 'react';
import SectionTitle from '../components/common/SectionTitle.jsx';
import { FACILITY_ITEMS } from '../data/facilityDocuments.js';
import { FiExternalLink, FiDownload, FiFileText, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const DocumentsList = ({ docs }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
        <span className="flex items-center gap-2"><FiFileText className="w-4 h-4 text-saffron-600" /> Required Documents ({docs.length})</span>
        {open ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
      </button>
      {open && (
        <ul className="px-4 py-3 space-y-1.5 bg-white">
          {docs.map((doc, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="w-5 h-5 bg-saffron-100 text-saffron-700 rounded-full text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
              {doc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FacilityCard = ({ title, description, type, icon, actionLabel, actionUrl, pdfUrl, externalUrl, prerequisiteDocuments }) => (
  <div className="card p-6 flex flex-col h-full border border-gray-100 hover:border-saffron-200 transition-all duration-300">
    <div className="flex items-start gap-4 mb-4">
      <div className="w-14 h-14 bg-saffron-50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">{icon}</div>
      <div>
        <h3 className="font-bold text-navy-800 text-base leading-tight">{title}</h3>
        <span className="inline-block mt-1 text-xs bg-navy-50 text-navy-600 px-2 py-0.5 rounded-full font-medium capitalize">
          {type.replace(/_/g, ' ')}
        </span>
      </div>
    </div>
    <p className="text-gray-500 text-sm leading-relaxed flex-grow">{description}</p>

    {prerequisiteDocuments?.length > 0 && <DocumentsList docs={prerequisiteDocuments} />}

    <div className="mt-4 flex flex-wrap gap-2">
      {(type === 'google_form' || type === 'external_link') && actionUrl && (
        <a href={actionUrl} target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 btn-primary text-sm py-2.5">
          <FiExternalLink className="w-4 h-4" /> {actionLabel}
        </a>
      )}
      {(type === 'pdf_download' || type === 'pdf_with_docs') && (
        <>
          <a href={pdfUrl || '#'} download
            className="flex-1 flex items-center justify-center gap-2 btn-primary text-sm py-2.5">
            <FiDownload className="w-4 h-4" /> {actionLabel}
          </a>
          {externalUrl && (
            <a href={externalUrl} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center justify-center gap-1.5 text-sm text-saffron-600 border border-saffron-300 rounded-lg px-3 py-2.5 hover:bg-saffron-50 transition-colors">
              <FiExternalLink className="w-3.5 h-3.5" /> Official Portal
            </a>
          )}
        </>
      )}
    </div>
  </div>
);

const Facilities = () => (
  <div className="pt-24 pb-16">
    {/* Hero */}
    <div className="bg-gradient-to-r from-navy-800 to-navy-900 text-white py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Citizen Facilities</h1>
        <div className="w-16 h-1 bg-saffron-600 mx-auto mb-4 rounded-full" />
        <p className="text-gray-300 text-base max-w-2xl mx-auto">
          Access government schemes, voter services, women's programs, and downloadable registration forms — all in one place.
        </p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      {/* Google Form Redirects */}
      <div className="mb-12">
        <SectionTitle tag="Organisations" title="Community Organisations" subtitle="Register for welfare organisations led by Vijay Walunj's office." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {FACILITY_ITEMS.filter(f => f.type === 'google_form').map(f => <FacilityCard key={f.id} {...f} />)}
        </div>
      </div>

      {/* Voter Services */}
      <div className="mb-12">
        <SectionTitle tag="Electoral" title="Voter Services" subtitle="Official Electoral Commission portals and forms for voter registration and search." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {FACILITY_ITEMS.filter(f => f.id === 'voter-services' || f.id === 'voter-search' || f.id === 'form-6').map(f => <FacilityCard key={f.id} {...f} />)}
        </div>
      </div>

      {/* Welfare Schemes */}
      <div className="mb-12">
        <SectionTitle tag="Welfare Schemes" title="Government Welfare Schemes" subtitle="Download application forms and view required documents for government welfare programs." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {FACILITY_ITEMS.filter(f => ['senior-citizen-card', 'ayushman-card', 'mahila-bachatgath'].includes(f.id)).map(f => <FacilityCard key={f.id} {...f} />)}
        </div>
      </div>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex gap-4 items-start">
        <span className="text-2xl">ℹ️</span>
        <div>
          <h4 className="font-bold text-navy-800 mb-1">Need assistance with a form?</h4>
          <p className="text-sm text-gray-600">Visit the Vijay Walunj office at Sector 10, Vashi during office hours (Mon–Sat, 10 AM – 6 PM) or call us for guidance on form filling and document submission.</p>
        </div>
      </div>
    </div>
  </div>
);

export default Facilities;
