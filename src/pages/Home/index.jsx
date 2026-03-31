/**
 * @file index.jsx (Home Page)
 * @description God-tier UI RailYatri replica with P2P Seat Exchange explicit explanation.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/ui/SearchBar';
import { api } from '../../services/api';
import { Target, Map, Activity, Clock, ArrowRight, ArrowRightLeft, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [trainResults, setTrainResults] = useState(null);

  const features = [
    {
      title: 'Live Train Status',
      desc: 'Get exact location and estimated delays instantly.',
      icon: <Activity size={24} className="text-[#3B82F6]" />,
      path: '/live-tracking',
    },
    {
      title: 'PNR Status Insight',
      desc: 'Check confirmation chances and current waitlist movement.',
      icon: <FileText size={24} className="text-[#10B981]" />,
      path: '/pnr-status',
    },
    {
      title: 'GPS Proximity Alarms',
      desc: 'Secure wake-up calls tied to live telemetry.',
      icon: <Target size={24} className="text-[#F59E0B]" />,
      path: '/proximity-alerts',
    },
    {
      title: 'Smart Connecting Routes',
      desc: 'Intelligent multi-train paths for waitlisted routes.',
      icon: <Map size={24} className="text-[#8B5CF6]" />,
      path: '/connecting-journeys',
    }
  ];

  const handleSearch = async (query) => {
    setIsSearching(true);
    setTrainResults(null);
    try {
      // Calls the centralized API, which handles mock fallback internally if no API Key is present
      const results = await api.searchTrains(query.fromStation, query.toStation, query.journeyDate);
      setTrainResults(results);
    } catch (error) {
      console.error("Failed to fetch trains:", error);
      // Fallback UI or empty state could go here, for now we will just show empty or mock results
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full pb-16 bg-[#F8FAFC] min-h-screen">
      
      {/* Premium Gradient Hero with Advanced Blur Effects */}
      <section className="w-full bg-gradient-to-br from-[#020617] via-[#0B4F8A] to-[#1E3A8A] text-center pt-16 pb-40 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none mix-blend-overlay"></div>
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-[#3B82F6] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[150%] bg-[#60A5FA] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 mt-6">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 shadow-inner">
             <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse"></span>
             <span className="text-[12px] font-bold text-[#E0E7FF] uppercase tracking-wider">Trusted by 1M+ Travelers</span>
           </div>
           
           <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5 tracking-tight font-sans drop-shadow-xl leading-tight">
             <span className="inline-block mr-2 pb-1 relative">
                <span className="absolute -inset-2 bg-white/20 blur-xl rounded-full"></span>
                <span className="relative">🚅</span>
             </span> 
             BHARAT-PATH 
             <span className="inline-block ml-2 pb-1 relative text-[#93C5FD]">
               <span className="absolute -inset-2 bg-blue-400/20 blur-xl rounded-full"></span>
               <span className="relative">🚉</span>
             </span>
           </h1>
           <p className="text-[17px] md:text-[19px] text-[#E2E8F0] font-medium tracking-wide max-w-2xl mx-auto leading-relaxed drop-shadow">
             Your intelligent dashboard for hyper-accurate IRCTC ticket analytics, live train telematics, and peer-to-peer berth connections.
           </p>
        </div>
      </section>

      {/* Main Search Bar overlaying Hero */}
      <section className="w-full max-w-[1050px] mx-auto px-4 -mt-24 relative z-20">
         <div className="shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[10px] bg-white ring-1 ring-black/5">
            <SearchBar onSearch={handleSearch} isSearching={isSearching} />
         </div>
      </section>

      {/* Conditional Rendering: Train Results OR Default Feature Cards */}
      {trainResults ? (
         <section className="w-full max-w-[1050px] mx-auto mt-10 px-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-extrabold text-[#0F172A] tracking-wide">
                 {trainResults.length} Superior Trains matching your route
              </h2>
              <div className="bg-[#EFF6FF] text-[#1E3A8A] text-[12px] font-bold px-3 py-1 rounded-full border border-[#BFDBFE]">Verified Route</div>
            </div>
            
            <div className="space-y-5">
               {trainResults.map((train, idx) => (
                 <div key={idx} className="bg-white rounded-[10px] border border-[#E2E8F0] hover:-translate-y-1 hover:shadow-xl hover:border-[#CBD5E1] transition-all duration-300 overflow-hidden relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3B82F6] to-[#1E3A8A] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="px-6 py-4 border-b border-[#F1F5F9] flex items-center justify-between bg-[#F8FAFC]">
                       <div className="flex items-center gap-3 w-full sm:w-auto">
                         <h3 className="text-[17px] font-extrabold text-[#0F172A] uppercase tracking-wide flex items-center gap-2">
                           {train.name} 
                           <span className="text-[#64748B] text-[14px] font-bold bg-white border border-[#E2E8F0] px-2 py-0.5 rounded shadow-sm">#{train.id}</span>
                         </h3>
                         <span className="text-[11px] font-bold text-[#1E3A8A] bg-[#DBEAFE] border border-[#BFDBFE] px-2.5 py-0.5 rounded-[4px] uppercase tracking-wider ml-auto sm:ml-0">{train.type}</span>
                       </div>
                       <p className="text-[12px] font-bold text-[#64748B] tracking-widest hidden sm:block">RUNS ON: <span className="text-[#0F172A] font-extrabold">{train.runningDays}</span></p>
                    </div>

                    <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-8">
                       
                       {/* Timing Block */}
                       <div className="flex items-center gap-4 sm:gap-8 w-full md:w-auto">
                          <div className="text-center sm:text-left">
                            <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">{train.departure}</p>
                            <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mt-1">Departure</p>
                          </div>
                          
                          <div className="flex flex-col items-center px-2 sm:px-4 w-[100px] sm:w-[150px]">
                            <p className="text-[11px] font-bold text-[#64748B] mb-2 bg-[#F1F5F9] px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#E2E8F0] shadow-sm"><Clock size={10}/> {train.duration}</p>
                            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#CBD5E1] to-transparent relative">
                               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1">
                                  <div className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
                               </div>
                            </div>
                          </div>

                          <div className="text-center sm:text-right">
                            <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">{train.arrival}</p>
                            <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mt-1">Arrival</p>
                          </div>
                       </div>

                       {/* Classes Block */}
                       <div className="flex gap-2.5 w-full md:w-auto flex-wrap justify-center sm:justify-start">
                          {train.classes.map(cls => (
                             <div key={cls} className="border border-[#CBD5E1] rounded-[6px] p-2.5 min-w-[75px] bg-white cursor-pointer hover:border-[#3B82F6] hover:bg-[#EFF6FF] hover:shadow-md hover:-translate-y-1 transition-all group/btn relative overflow-hidden">
                               <div className="absolute inset-0 bg-gradient-to-b from-white to-[#F8FAFC] opacity-100 group-hover/btn:opacity-0 transition-opacity pointer-events-none"></div>
                               <p className="text-[14px] font-extrabold text-[#1E3A8A] text-center mb-1 relative z-10">{cls}</p>
                               <p className="text-[10px] font-bold tracking-wider text-[#10B981] text-center uppercase relative z-10 flex items-center justify-center gap-1">
                                 Check <ArrowRight size={10} className="opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all"/>
                               </p>
                             </div>
                          ))}
                       </div>

                       {/* Action Button */}
                       <button 
                         className="w-full md:w-auto bg-gradient-to-r from-[#0B4F8A] to-[#1E3A8A] hover:from-[#1E3A8A] hover:to-[#172554] text-white px-8 py-3.5 rounded-[6px] text-[14px] font-bold uppercase tracking-wider shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
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
         <>
           <section className="w-full max-w-[1050px] mx-auto mt-16 px-4 pb-16 border-b border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-[24px] font-extrabold text-[#0F172A] tracking-wide inline-flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#3B82F6] rounded-full inline-block"></span>
                    Explore Premier Features
                 </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {features.map((feature, idx) => (
                   <div 
                     key={idx} 
                     onClick={() => navigate(feature.path)}
                     className="bg-white p-6 rounded-[16px] border border-[#E2E8F0] shadow-sm cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:border-[#93C5FD] transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
                   >
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8FAFC] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#EFF6FF] rounded-bl-full opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none scale-0 group-hover:scale-100 origin-top-right duration-500"></div>
                      
                      <div className="w-14 h-14 rounded-[12px] bg-[#F8FAFC] flex items-center justify-center mb-5 relative z-10 shadow-sm border border-[#F1F5F9] group-hover:bg-white group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                         {feature.icon}
                      </div>
                      <h3 className="text-[17px] font-extrabold text-[#0F172A] mb-2 leading-snug relative z-10 group-hover:text-[#1E3A8A] transition-colors">{feature.title}</h3>
                      <p className="text-[13px] text-[#64748B] font-medium leading-relaxed mb-6 flex-1 relative z-10">{feature.desc}</p>
                      
                      <span className="text-[12px] font-bold text-[#3B82F6] group-hover:text-[#1D4ED8] mt-auto uppercase tracking-widest relative z-10 flex items-center gap-1.5 opacity-80 group-hover:opacity-100">
                         Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                   </div>
                 ))}
              </div>
           </section>

           {/* Dedicated P2P Seat Exchange Explanation Block */}
           <section className="w-full max-w-[1050px] mx-auto mt-16 px-4 pb-12">
              <div className="bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] rounded-[24px] overflow-hidden shadow-2xl relative border border-[#334155]">
                 
                 {/* Decorative background elements inside the card */}
                 <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#3B82F6] blur-[150px] opacity-[0.15] rounded-full pointer-events-none"></div>
                 <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#F59E0B] blur-[120px] opacity-[0.1] rounded-full pointer-events-none"></div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
                    
                    {/* Left Content Area */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                       <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-[#60A5FA] text-[11px] font-bold uppercase tracking-widest mb-6 w-fit backdrop-blur-sm shadow-sm ring-1 ring-white/20">
                          <ArrowRightLeft size={12} /> New Feature
                       </div>
                       
                       <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                         Didn't get your preferred berth? <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#34D399]">Swap it.</span>
                       </h2>
                       
                       <p className="text-[#94A3B8] text-[15px] font-medium leading-relaxed mb-8">
                         Introducing <strong className="text-white">P2P Seat Exchange</strong>. Connect instantly with other verified passengers on your exact train who want to exchange berths. Give up that Upper berth for a Lower one if someone else is willing to trade.
                       </p>

                       <ul className="space-y-4 mb-8">
                          <li className="flex items-start gap-3">
                             <CheckCircle2 size={20} className="text-[#34D399] shrink-0 mt-0.5" />
                             <span className="text-[#E2E8F0] text-[14px] font-medium">Post your current seat & wait for matches.</span>
                          </li>
                          <li className="flex items-start gap-3">
                             <CheckCircle2 size={20} className="text-[#34D399] shrink-0 mt-0.5" />
                             <span className="text-[#E2E8F0] text-[14px] font-medium">Chat securely with co-passengers.</span>
                          </li>
                          <li className="flex items-start gap-3">
                             <CheckCircle2 size={20} className="text-[#34D399] shrink-0 mt-0.5" />
                             <span className="text-[#E2E8F0] text-[14px] font-medium">100% Free & Community driven.</span>
                          </li>
                       </ul>

                       <button 
                         onClick={() => navigate('/seat-exchange')}
                         className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold px-8 py-3.5 rounded-[8px] flex items-center justify-center gap-2 w-fit shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-0.5 transition-all text-[15px] tracking-wide"
                       >
                         Open Seat Exchange Board <ArrowRight size={18} />
                       </button>
                    </div>

                    {/* Right Disclaimer/Visual Area */}
                    <div className="bg-black/20 p-8 md:p-12 border-l border-white/5 flex flex-col items-center justify-center relative">
                       
                       <div className="bg-white rounded-[16px] p-6 shadow-2xl w-full max-w-sm mb-8 transform rotate-2 hover:rotate-0 transition-all duration-300">
                          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E2E8F0]">
                             <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#64748B]">
                                  <ArrowRightLeft size={20} />
                               </div>
                               <div>
                                 <p className="text-[12px] font-bold text-[#64748B] uppercase">Offer</p>
                                 <p className="text-[15px] font-extrabold text-[#0F172A]">B4 | Upper</p>
                               </div>
                             </div>
                             <ArrowRight size={16} className="text-[#CBD5E1]" />
                             <div className="text-right">
                               <p className="text-[12px] font-bold text-[#64748B] uppercase">Needs</p>
                               <p className="text-[15px] font-extrabold text-[#3B82F6]">Lower</p>
                             </div>
                          </div>
                          <button className="w-full bg-[#0F172A] text-white py-2 rounded-[6px] text-[13px] font-bold">Connect via Chat</button>
                       </div>

                       <div className="bg-[#450A0A]/40 border border-[#7F1D1D] rounded-[12px] p-5 w-full max-w-sm backdrop-blur-sm">
                          <h4 className="text-[13px] font-bold text-[#FCA5A5] uppercase tracking-wider mb-2 flex items-center gap-2">
                             <AlertTriangle size={16} /> Absolutely Unofficial
                          </h4>
                          <p className="text-[13px] text-[#FDA4AF] leading-relaxed font-medium">
                            This is purely a peer-to-peer mechanic. Any seat exchange agreed upon here is a <strong className="text-white">mutual understanding</strong> between travelers and <strong className="text-white">DOES NOT reflect in the official IRCTC portal</strong> or chart. Verify identities before swapping.
                          </p>
                       </div>

                    </div>
                 </div>
              </div>
           </section>
         </>
      )}

    </div>
  );
}
