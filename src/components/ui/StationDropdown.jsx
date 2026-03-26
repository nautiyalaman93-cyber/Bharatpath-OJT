import { useState, useRef, useEffect } from 'react';
import { allStations } from '../../mock/mockData';

export default function StationDropdown({ label, value, onChange, placeholder = "Enter location" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = allStations.filter(st => st.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (station) => {
    onChange(station);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div 
        className={`w-full bg-[#F9FAFB] border ${isOpen ? 'border-[#0B4F8A]' : 'border-[#D1D5DB] hover:border-gray-400'} rounded-[4px] px-3 py-2 cursor-text transition-colors`}
        onClick={() => setIsOpen(true)}
      >
        <p className="text-[11px] font-semibold text-[#6B7280] mb-0.5 uppercase tracking-wide">{label}</p>
        <p className={`text-[15px] font-medium truncate ${value ? 'text-[#1F2937]' : 'text-gray-400'}`}>
          {value || placeholder}
        </p>
      </div>

      {isOpen && (
        <div className="absolute top-[100%] mt-1 left-0 w-full z-50 bg-[#FFFFFF] border border-[#D1D5DB] rounded-[4px] shadow-md overflow-hidden">
          <div className="p-2 border-b border-[#D1D5DB] bg-[#F9FAFB]">
            <input 
              type="text" 
              autoFocus 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="Search station..."
              className="w-full bg-white border border-[#D1D5DB] rounded-[3px] px-2 py-1.5 text-sm font-medium text-[#1F2937] outline-none" 
            />
          </div>
          <div className="max-h-[200px] overflow-y-auto">
            {filtered.length > 0 ? filtered.map((st, idx) => (
              <div 
                key={idx} 
                className="px-3 py-2 border-b border-[#F5F7FA] last:border-0 hover:bg-[#F5F7FA] cursor-pointer text-sm font-medium text-[#1F2937]"
                onClick={(e) => { e.stopPropagation(); handleSelect(st); }}
              >
                {st}
              </div>
            )) : (
              <div className="px-3 py-4 text-center text-sm font-medium text-[#6B7280]">No stations matched</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
