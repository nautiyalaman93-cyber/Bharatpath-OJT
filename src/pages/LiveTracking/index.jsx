/**
 * @file index.jsx (Live Tracking Page)
 * @description Rigid data-driven live tracking board devoid of UI flair.
 */

import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Train as TrainIcon, Clock, Activity, MapPin } from 'lucide-react';

export default function LiveTracking() {
  const [trainNumber, setTrainNumber] = useState('12952');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 800);
  };

  const routeStations = [
    { name: 'New Delhi (NDLS)', time: '16:25', status: 'Departed', active: false, passed: true },
    { name: 'Kota Jn (KOTA)', time: '21:00', status: 'Departed', active: false, passed: true },
    { name: 'Ratlam Jn (RTM)', time: '00:15', status: 'Departed', active: false, passed: true },
    { name: 'Vadodara Jn (BRC)', time: '03:52', status: 'Arriving Now', active: true, passed: false },
    { name: 'Surat (ST)', time: '05:43', status: 'Expected', active: false, passed: false },
    { name: 'Borivali (BVI)', time: '08:40', status: 'Expected', active: false, passed: false },
    { name: 'Mumbai Central (MMCT)', time: '09:35', status: 'Destination', active: false, passed: false },
  ];

  return (
    <div className="w-full pb-16 bg-[#F5F7FA] min-h-screen">
      
      <section className="bg-white border-b border-[#D1D5DB] py-6 mb-6">
        <div className="max-w-[1000px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
           <div>
             <h1 className="text-xl font-semibold text-[#1F2937]">Live Train Status</h1>
             <p className="text-[13px] text-[#6B7280]">Real-time GPS tracking for exact delay statistics</p>
           </div>
           
           <form onSubmit={handleSearch} className="flex items-center w-full sm:w-[400px]">
             <div className="relative flex-1">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TrainIcon size={16} className="text-[#6B7280]" />
               </div>
               <input 
                 type="text" 
                 value={trainNumber}
                 onChange={(e) => setTrainNumber(e.target.value)}
                 placeholder="Train Number"
                 className="w-full pl-9 pr-3 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] rounded-l-md focus:outline-none focus:bg-white text-[15px] font-medium text-[#1F2937] rounded-none"
                 required
               />
             </div>
             <Button type="submit" isLoading={isSearching} className="rounded-l-none h-[42px] px-6">
               Check
             </Button>
           </form>
        </div>
      </section>

      {hasSearched && (
        <section className="max-w-[1000px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* Timeline */}
           <div className="lg:col-span-2 bg-[#FFFFFF] rounded-[8px] border border-[#D1D5DB]">
              <div className="px-5 py-4 border-b border-[#D1D5DB] bg-[#F9FAFB]">
                 <h2 className="text-[15px] font-bold text-[#1F2937]">Train Route & Progress</h2>
              </div>
              
              <div className="p-6 relative">
                {/* Vertical Spine */}
                <div className="absolute top-8 bottom-8 left-[35px] w-[3px] bg-[#E5E7EB]"></div>
                <div className="absolute top-8 left-[35px] w-[3px] bg-[#16A34A] z-0" style={{ height: '60%' }}></div>

                {routeStations.map((station, idx) => (
                  <div key={idx} className="relative z-10 flex gap-5 items-center mb-6 last:mb-0">
                    <div className={`w-[22px] h-[22px] rounded-full border-[3px] flex items-center justify-center bg-white ${station.active ? 'border-[#0B4F8A]' : station.passed ? 'border-[#16A34A]' : 'border-[#D1D5DB]'}`}>
                       {station.active && <div className="w-[10px] h-[10px] bg-[#0B4F8A] rounded-full"></div>}
                    </div>
                    
                    <div className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] px-4 py-3 flex justify-between items-center">
                       <div>
                         <p className={`font-semibold text-[15px] ${station.active ? 'text-[#0B4F8A]' : 'text-[#1F2937]'}`}>{station.name}</p>
                         <p className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wide mt-0.5">{station.status}</p>
                       </div>
                       <p className={`text-[15px] font-semibold ${station.active ? 'text-[#0B4F8A]' : 'text-[#475569]'}`}>
                          {station.time}
                       </p>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Metrics Panel */}
           <div className="space-y-4">
              
              <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D1D5DB] p-5 text-center">
                <p className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wide mb-1">• 12952 MUMBAI RAJDHANI</p>
                <h3 className="text-2xl font-bold text-[#1F2937] mb-4">Vadodara Jn</h3>
                
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="border border-[#E5E7EB] p-3 rounded-[6px] bg-[#F9FAFB]">
                    <p className="text-[11px] font-bold text-[#6B7280] uppercase">Speed</p>
                    <p className="text-lg font-bold text-[#1F2937]">112 km/h</p>
                  </div>
                  <div className="border border-[#E5E7EB] p-3 rounded-[6px] bg-[#F9FAFB]">
                    <p className="text-[11px] font-bold text-[#6B7280] uppercase">Remaining</p>
                    <p className="text-lg font-bold text-[#1F2937]">392 km</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D1D5DB] p-4 text-center">
                   <Clock className="mx-auto text-[#16A34A] mb-1.5" size={20}/>
                   <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wide">Punctuality</p>
                   <p className="text-[14px] font-bold text-[#16A34A] mt-0.5">On Time</p>
                 </div>
                 <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D1D5DB] p-4 text-center">
                   <Activity className="mx-auto text-[#D97706] mb-1.5" size={20}/>
                   <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wide">Overall Delay</p>
                   <p className="text-[14px] font-bold text-[#D97706] mt-0.5">25 Mins</p>
                 </div>
              </div>

           </div>
        </section>
      )}
    </div>
  );
}
