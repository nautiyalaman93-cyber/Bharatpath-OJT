import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { User, RefreshCcw, AlertTriangle, ArrowRightLeft, Clock, Info } from 'lucide-react';

export default function SeatExchange() {
  const [activeTab, setActiveTab] = useState('feed');

  const requests = [
    { id: 1, name: 'Aman Nautiyal', from: 'B4 | Lower', to: 'Upper', time: '10m ago', pnr: 'XXXXX4321' },
    { id: 2, name: 'Neha Sharma', from: 'A1 | Upper', to: 'Lower', time: '25m ago', pnr: 'XXXXX9876' },
  ];

  return (
    <div className="w-full pb-16 bg-[#F5F7FA] min-h-screen font-sans">
      
      {/* Premium Header */}
      <section className="bg-[#0B4F8A] py-8 mb-6 shadow-md">
        <div className="max-w-[1050px] mx-auto px-4">
           <div className="flex items-center gap-3 text-white mb-2">
             <ArrowRightLeft size={28} />
             <h1 className="text-2xl font-bold tracking-wide">P2P Seat Exchange</h1>
           </div>
           <p className="text-[14px] text-[#E0E7FF] font-medium max-w-2xl">
             Connect directly with co-passengers on your train to negotiate mutual seat swaps. 
             Find a preferred berth when you couldn't get one during booking.
           </p>
        </div>
      </section>

      <section className="max-w-[1050px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Feed and Disclaimers */}
         <div className="lg:col-span-2 space-y-6">
            
            {/* Critical Disclaimer - To stop misleading people */}
            <div className="bg-[#FEF2F2] border border-[#F87171] rounded-[8px] p-4 flex gap-3 items-start shadow-sm">
               <AlertTriangle className="text-[#DC2626] shrink-0 mt-0.5" size={20} />
               <div>
                  <h4 className="text-[14px] font-bold text-[#991B1B] uppercase tracking-wide mb-1">Important Disclaimer</h4>
                  <p className="text-[13px] text-[#7F1D1D] leading-relaxed font-medium">
                    This is an <strong>unofficial peer-to-peer</strong> connection board. Seat exchanges arranged here are mutual agreements between passengers and <strong>will NOT be updated in the official IRCTC Railway Chart</strong>. Please coordinate directly and verify tickets before swapping.
                  </p>
               </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#D1D5DB] rounded-[8px] overflow-hidden shadow-sm">
               
               <div className="flex bg-[#F8FAFC] border-b border-[#D1D5DB]">
                 <button 
                    onClick={() => setActiveTab('feed')}
                    className={`flex-1 py-3.5 text-[13px] font-bold uppercase transition-all ${activeTab === 'feed' ? 'bg-white text-[#0B4F8A] border-b-2 border-[#0B4F8A]' : 'text-[#64748B] hover:text-[#0F172A] border-b-2 border-transparent hover:bg-white'}`}
                 >
                    Active Requests
                 </button>
                 <button 
                    onClick={() => setActiveTab('my')}
                    className={`flex-1 py-3.5 text-[13px] font-bold uppercase transition-all ${activeTab === 'my' ? 'bg-white text-[#0B4F8A] border-b-2 border-[#0B4F8A]' : 'text-[#64748B] hover:text-[#0F172A] border-b-2 border-transparent hover:bg-white'}`}
                 >
                    My Postings
                 </button>
               </div>

               <div className="divide-y divide-[#E2E8F0]">
                  {activeTab === 'feed' ? (
                     requests.map((req) => (
                       <div key={req.id} className="p-5 flex flex-col sm:flex-row items-center justify-between gap-5 hover:bg-[#F8FAFC] transition-colors">
                         <div className="flex items-start gap-4 w-full">
                           <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#1E3A8A] shrink-0">
                              <User size={24}/>
                           </div>
                           <div className="flex-1">
                             <div className="flex items-center justify-between sm:justify-start gap-3 mb-1.5">
                               <p className="font-bold text-[#0F172A] text-[16px]">{req.name}</p>
                               <span className="flex items-center gap-1 text-[11px] font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-full"><Clock size={10}/> {req.time}</span>
                             </div>
                             
                             <div className="flex items-center gap-2 mt-2 bg-[#F8FAFC] p-2 rounded border border-[#E2E8F0] w-fit">
                                <div className="text-center px-2">
                                   <p className="text-[10px] uppercase text-[#64748B] font-bold mb-0.5">Has</p>
                                   <p className="text-[13px] font-bold text-[#0F172A]">{req.from}</p>
                                </div>
                                <ArrowRightLeft size={14} className="text-[#94A3B8]" />
                                <div className="text-center px-2">
                                   <p className="text-[10px] uppercase text-[#64748B] font-bold mb-0.5">Needs</p>
                                   <p className="text-[13px] font-bold text-[#0B4F8A]">{req.to}</p>
                                </div>
                             </div>

                           </div>
                         </div>
                         <Button className="w-full sm:w-auto mt-4 sm:mt-0 px-6 py-2.5 bg-[#0B4F8A] hover:bg-[#1E3A8A] text-white rounded-[6px] shadow-sm font-semibold transition-all">
                            Connect
                         </Button>
                       </div>
                     ))
                  ) : (
                     <div className="p-10 flex flex-col items-center justify-center text-center">
                        <Info className="text-[#94A3B8] mb-3" size={32} />
                        <h3 className="text-[#0F172A] font-bold text-[15px] mb-1">No Postings Yet</h3>
                        <p className="text-[#64748B] text-[13px]">You haven't submitted any seat exchange requests.</p>
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* Form Panel */}
         <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D1D5DB] shadow-sm h-fit sticky top-24">
            <div className="px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC] rounded-t-[8px]">
               <h3 className="font-bold text-[#0F172A] text-[15px] uppercase flex items-center gap-2 tracking-wide">
                 <RefreshCcw size={16} className="text-[#0B4F8A]"/> New Request
               </h3>
               <p className="text-[12px] text-[#64748B] mt-1">Post your requirement to the train's board.</p>
            </div>
            
            <form className="p-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[12px] font-bold text-[#475569] uppercase tracking-wide mb-2">PNR Number</label>
                <input type="text" placeholder="10-digit PNR" className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-[6px] focus:border-[#0B4F8A] focus:ring-1 focus:ring-[#0B4F8A] outline-none text-[14px] font-semibold text-[#0F172A] transition-all" />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#475569] uppercase tracking-wide mb-2">Your Current Seat</label>
                <input type="text" placeholder="e.g. B4 | 45 (Lower)" className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-[6px] focus:border-[#0B4F8A] focus:ring-1 focus:ring-[#0B4F8A] outline-none text-[14px] font-semibold text-[#0F172A] transition-all" />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#475569] uppercase tracking-wide mb-2">Target Preference</label>
                <select className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-[6px] focus:border-[#0B4F8A] focus:ring-1 focus:ring-[#0B4F8A] outline-none text-[14px] font-semibold text-[#0F172A] cursor-pointer transition-all appearance-none bg-white">
                  <option>Upper Berth</option>
                  <option>Middle Berth</option>
                  <option>Lower Berth</option>
                  <option>Side Lower</option>
                  <option>Side Upper</option>
                </select>
              </div>

              <div className="pt-3">
                 <Button type="submit" className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white py-3 rounded-[6px] shadow-sm font-bold uppercase tracking-wide text-[14px] transition-all">
                   Post Request
                 </Button>
              </div>
            </form>
         </div>
      </section>
    </div>
  );
}
