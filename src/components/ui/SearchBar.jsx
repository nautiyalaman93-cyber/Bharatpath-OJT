import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, Search } from 'lucide-react';
import StationDropdown from './StationDropdown';
import { Button } from './Button';

export default function SearchBar({ onSearch, isSearching }) {
  const navigate = useNavigate();
  const [fromStation, setFromStation] = useState('NEW DELHI | NDLS');
  const [toStation, setToStation] = useState('MUMBAI CENTRAL | MMCT');
  const [journeyDate, setJourneyDate] = useState('26 Mar');

  // Strict Swap Logic
  const handleSwap = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fromStation && toStation && journeyDate) {
      if (onSearch) {
        onSearch({ fromStation, toStation, journeyDate });
      } else {
        navigate('/live-tracking');
      }
    }
  };

  const dates = ['26 Mar', '27 Mar', '28 Mar', '29 Mar'];

  return (
    <div className="w-full relative z-40 bg-[#FFFFFF] rounded-[8px] border border-[#D1D5DB] p-4">
       
       <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center gap-0 w-full mb-4">
          
          <div className="w-full lg:flex-1 relative">
             <StationDropdown 
               label="From" 
               value={fromStation} 
               onChange={setFromStation} 
             />
             
             {/* Center Swap Button */}
             <button 
               type="button"
               onClick={handleSwap}
               className="hidden lg:flex absolute -right-[16px] top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-[#D1D5DB] rounded-full items-center justify-center text-[#6B7280] hover:bg-[#F5F7FA] hover:text-[#0B4F8A] shadow-sm transition-colors"
               title="Swap Stations"
             >
               <ArrowLeftRight size={14} />
             </button>
          </div>

          {/* Mobile Swap */}
          <button 
             type="button"
             onClick={handleSwap}
             className="flex lg:hidden w-8 h-8 my-2 bg-[#F9FAFB] border border-[#D1D5DB] rounded-full items-center justify-center text-[#6B7280]"
          >
             <ArrowLeftRight size={14} className="rotate-90" />
          </button>

          <div className="w-full lg:flex-1 pl-0 lg:pl-[12px]">
             <StationDropdown 
               label="To" 
               value={toStation} 
               onChange={setToStation} 
             />
          </div>

          <div className="w-full lg:w-auto flex items-center justify-between border border-[#D1D5DB] bg-[#F9FAFB] rounded-[4px] p-0.5 ml-0 lg:ml-4 mt-4 lg:mt-0 overflow-hidden">
             {dates.map((d) => (
               <div 
                 key={d}
                 onClick={() => setJourneyDate(d)}
                 className={`px-4 py-3 cursor-pointer text-sm font-semibold text-center border-r last:border-0 border-[#D1D5DB] transition-colors ${journeyDate === d ? 'bg-[#0B4F8A] text-white' : 'text-[#1F2937] hover:bg-gray-100'}`}
               >
                 {d}
               </div>
             ))}
          </div>

          <div className="w-full lg:w-[150px] ml-0 lg:ml-4 mt-4 lg:mt-0 h-full self-stretch flex">
             <Button 
               type="submit" 
               variant="primary"
               isLoading={isSearching}
               className="w-full h-full rounded-[4px] text-base"
               style={{ height: 'auto' }}
             >
               SEARCH
             </Button>
          </div>
       </form>

       <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-[#F5F7FA]">
          <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#475569] font-medium">
             <input type="checkbox" className="accent-[#0B4F8A] w-4 h-4" /> AC Only
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#475569] font-medium">
             <input type="checkbox" className="accent-[#0B4F8A] w-4 h-4" /> Confirmed Seats
          </label>
          
          <div className="flex items-center gap-2 ml-auto">
             <select className="bg-transparent border border-[#D1D5DB] text-[13px] text-[#475569] rounded px-2 py-1 outline-none">
                <option>All Classes</option>
                <option>1A (First AC)</option>
                <option>2A (Second AC)</option>
                <option>3A (Third AC)</option>
                <option>SL (Sleeper)</option>
             </select>
             <select className="bg-transparent border border-[#D1D5DB] text-[13px] text-[#475569] rounded px-2 py-1 outline-none">
                <option>General Quota</option>
                <option>Tatkal</option>
                <option>Ladies</option>
             </select>
          </div>
       </div>

    </div>
  );
}
