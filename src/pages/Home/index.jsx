/**
 * @file index.jsx (Home Page)
 * @description RailYatri 1:1 structural replica. Purely transactional and dense.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/ui/SearchBar';
import { Target, ShieldCheck, Map, Activity, Clock, ArrowRight } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [trainResults, setTrainResults] = useState(null);

  const features = [
    {
      title: 'Live Train Status',
      desc: 'Get exact location and estimated delays instantly.',
      icon: <Activity size={20} />,
      path: '/live-tracking',
    },
    {
      title: 'Seat Availability & PNR',
      desc: 'Verify confirmation probability and boarding charts.',
      icon: <ShieldCheck size={20} />,
      path: '/seat-exchange',
    },
    {
      title: 'GPS Proximity Alarms',
      desc: 'Secure wake-up calls tied to live telemetry.',
      icon: <Target size={20} />,
      path: '/proximity-alerts',
    },
    {
      title: 'Smart Connecting Routes',
      desc: 'Intelligent multi-train paths for waitlisted routes.',
      icon: <Map size={20} />,
      path: '/connecting-journeys',
    }
  ];

  const handleSearch = (query) => {
    setIsSearching(true);
    setTrainResults(null);
    // Simulate real API fetch for trains on specific route
    setTimeout(() => {
      setTrainResults([
        {
          id: '12952',
          name: 'MMCT TEJAS RAJ',
          departure: '16:55',
          arrival: '08:35',
          duration: '15h 40m',
          runningDays: 'M T W T F S S',
          classes: ['1A', '2A', '3A'],
          type: 'Rajdhani'
        },
        {
          id: '12904',
          name: 'GOLDEN TEMPLE M',
          departure: '07:20',
          arrival: '05:05',
          duration: '21h 45m',
          runningDays: 'M T W T F S S',
          classes: ['1A', '2A', '3A', 'SL'],
          type: 'Superfast'
        },
        {
          id: '12926',
          name: 'PASCHIM EXPRESS',
          departure: '16:35',
          arrival: '14:55',
          duration: '22h 20m',
          runningDays: '- T W - F S S',
          classes: ['2A', '3A', 'SL'],
          type: 'Superfast'
        }
      ]);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="w-full pb-16 bg-[#F5F7FA] min-h-screen">
      
      {/* Strict Minimal Hero */}
      <section className="w-full bg-[#0B4F8A] text-center pt-8 pb-32">
        <h1 className="text-3xl font-medium text-white mb-2">
          Train Ticket Booking
        </h1>
        <p className="text-[14px] text-[#E0E7FF] font-medium">
          Authorized IRCTC ticket booking and PNR tracking.
        </p>
      </section>

      {/* Main Search Bar overlaying Hero */}
      <section className="w-full max-w-[1050px] mx-auto px-4 -mt-20">
         <SearchBar onSearch={handleSearch} isSearching={isSearching} />
      </section>

      {/* Conditional Rendering: Train Results OR Default Feature Cards */}
      {trainResults ? (
         <section className="w-full max-w-[1050px] mx-auto mt-8 px-4 animate-in fade-in slide-in-from-bottom-6">
            <h2 className="text-[16px] font-bold text-[#1F2937] mb-4">
               {trainResults.length} Trains found matching your route
            </h2>
            
            <div className="space-y-4">
               {trainResults.map((train, idx) => (
                 <div key={idx} className="bg-white rounded-[6px] border border-[#D1D5DB] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">
                    
                    <div className="px-5 py-3 border-b border-[#F5F7FA] flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <h3 className="text-[16px] font-bold text-[#1F2937] uppercase tracking-wide">{train.name} <span className="text-[#6B7280]">({train.id})</span></h3>
                         <span className="text-[11px] font-bold text-[#0B4F8A] bg-[#EFF6FF] px-2 py-0.5 rounded-[4px] uppercase">{train.type}</span>
                       </div>
                       <p className="text-[12px] font-semibold text-[#6B7280] tracking-widest hidden sm:block">Runs On: {train.runningDays}</p>
                    </div>

                    <div className="p-5 flex flex-col md:flex-row items-center justify-between gap-6">
                       
                       {/* Timing Block */}
                       <div className="flex items-center gap-6 w-full md:w-auto">
                          <div>
                            <p className="text-2xl font-bold text-[#1F2937]">{train.departure}</p>
                            <p className="text-[12px] font-bold text-[#6B7280] uppercase">Departure</p>
                          </div>
                          
                          <div className="flex flex-col items-center px-4 w-[120px]">
                            <p className="text-[11px] font-bold text-[#6B7280] mb-1"><Clock size={10} className="inline mr-1"/>{train.duration}</p>
                            <div className="w-full h-px bg-[#D1D5DB] relative">
                               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                  <ArrowRight size={14} className="text-[#D1D5DB]" />
                               </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-2xl font-bold text-[#1F2937]">{train.arrival}</p>
                            <p className="text-[12px] font-bold text-[#6B7280] uppercase">Arrival</p>
                          </div>
                       </div>

                       {/* Classes Block */}
                       <div className="flex gap-2 w-full md:w-auto flex-wrap">
                          {train.classes.map(cls => (
                             <div key={cls} className="border border-[#D1D5DB] rounded-[4px] p-2 min-w-[70px] cursor-pointer hover:border-[#0B4F8A] hover:bg-[#F9FAFB] transition-colors">
                               <p className="text-[13px] font-bold text-[#0B4F8A] text-center mb-0.5">{cls}</p>
                               <p className="text-[10px] font-bold tracking-wide text-[#16A34A] text-center uppercase">Check</p>
                             </div>
                          ))}
                       </div>

                       {/* Action Button */}
                       <button 
                         className="w-full md:w-auto bg-[#0B4F8A] hover:bg-[#0A3D75] text-white px-6 py-2.5 rounded-[4px] text-[14px] font-semibold shadow-sm transition-colors"
                         onClick={() => navigate('/live-tracking')}
                       >
                         Track Live Status
                       </button>

                    </div>
                 </div>
               ))}
            </div>
         </section>
      ) : (
         <section className="w-full max-w-[1050px] mx-auto mt-12 px-4">
            <h2 className="text-xl font-bold text-[#1F2937] mb-6">Explore Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               {features.map((feature, idx) => (
                 <div 
                   key={idx} 
                   onClick={() => navigate(feature.path)}
                   className="bg-white p-5 rounded-[8px] border border-[#D1D5DB] cursor-pointer hover:-translate-y-0.5 hover:shadow-sm transition-all group flex flex-col h-full"
                 >
                    <div className="w-10 h-10 rounded-[6px] bg-[#F9FAFB] flex items-center justify-center text-[#0B4F8A] mb-4 border border-[#E5E7EB]">
                       {feature.icon}
                    </div>
                    <h3 className="text-[15px] font-bold text-[#1F2937] mb-1.5 leading-snug">{feature.title}</h3>
                    <p className="text-[13px] text-[#6B7280] font-medium leading-[1.6] mb-4 flex-1">{feature.desc}</p>
                    <span className="text-[12px] font-bold text-[#0B4F8A] group-hover:text-[#0A3D75] mt-auto uppercase tracking-wide">
                       View Feature
                    </span>
                 </div>
               ))}
            </div>
         </section>
      )}

    </div>
  );
}
