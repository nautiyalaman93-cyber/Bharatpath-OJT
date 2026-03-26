/**
 * @file index.jsx (Seat Exchange Page)
 * @description Flat list of P2P requests aligned exactly with IRCTC-style panels.
 */

import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { User, RefreshCcw } from 'lucide-react';

export default function SeatExchange() {
  const [activeTab, setActiveTab] = useState('feed');

  const requests = [
    { id: 1, name: 'Aman Nautiyal', from: 'B4 | Lower', to: 'Upper', time: '10m ago' },
    { id: 2, name: 'Neha Sharma', from: 'A1 | Upper', to: 'Lower', time: '25m ago' },
  ];

  return (
    <div className="w-full pb-16 bg-[#F5F7FA] min-h-screen">
      
      {/* Header */}
      <section className="bg-white border-b border-[#D1D5DB] py-6 mb-6">
        <div className="max-w-[1000px] mx-auto px-4">
           <h1 className="text-xl font-semibold text-[#1F2937]">Passenger Seat Exchange</h1>
           <p className="text-[13px] text-[#6B7280]">Connect with verified passengers to coordinate berth swaps.</p>
        </div>
      </section>

      <section className="max-w-[1000px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Feed Table */}
         <div className="lg:col-span-2">
            <div className="bg-[#FFFFFF] border border-[#D1D5DB] rounded-[8px] overflow-hidden">
               
               <div className="flex bg-[#F9FAFB] border-b border-[#D1D5DB]">
                 <button 
                    onClick={() => setActiveTab('feed')}
                    className={`px-6 py-3 text-[13px] font-bold uppercase transition-colors ${activeTab === 'feed' ? 'bg-white text-[#0B4F8A] border-t-2 border-[#0B4F8A]' : 'text-[#6B7280] hover:text-[#1F2937] border-t-2 border-transparent'}`}
                 >
                    Active Requests
                 </button>
                 <button 
                    onClick={() => setActiveTab('my')}
                    className={`px-6 py-3 text-[13px] font-bold uppercase transition-colors border-l border-[#D1D5DB] ${activeTab === 'my' ? 'bg-white text-[#0B4F8A] border-t-2 border-[#0B4F8A]' : 'text-[#6B7280] hover:text-[#1F2937] border-t-2 border-transparent'}`}
                 >
                    My Postings
                 </button>
               </div>

               <div className="divide-y divide-[#E5E7EB]">
                  {requests.map((req) => (
                    <div key={req.id} className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-[#F9FAFB]">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-[4px] bg-[#E5E7EB] flex items-center justify-center text-[#6B7280]">
                           <User size={20}/>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-[#1F2937] text-[15px]">{req.name}</p>
                            <span className="text-[12px] font-medium text-[#6B7280]">{req.time}</span>
                          </div>
                          <p className="text-[14px] text-[#475569] font-medium">
                            Has <strong className="text-[#1F2937]">{req.from}</strong> , needs <strong className="text-[#0B4F8A]">{req.to}</strong>
                          </p>
                        </div>
                      </div>
                      <Button className="w-full sm:w-auto h-[36px] px-5 text-[13px]">
                         Message
                      </Button>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Form Panel */}
         <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D1D5DB] h-fit">
            <div className="px-5 py-3 border-b border-[#D1D5DB] bg-[#F9FAFB]">
               <h3 className="font-bold text-[#1F2937] text-[14px] uppercase flex items-center gap-2"><RefreshCcw size={14}/> Submit Request</h3>
            </div>
            
            <form className="p-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[12px] font-bold text-[#6B7280] uppercase mb-1.5">Your Current Seat</label>
                <input type="text" placeholder="e.g. B4 | 45 (Lower)" className="w-full px-3 py-2 bg-[#F9FAFB] border border-[#D1D5DB] rounded-[4px] focus:border-[#0B4F8A] outline-none text-[14px] font-medium text-[#1F2937]" />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#6B7280] uppercase mb-1.5">Target Preference</label>
                <select className="w-full px-3 py-2 bg-[#F9FAFB] border border-[#D1D5DB] rounded-[4px] focus:border-[#0B4F8A] outline-none text-[14px] font-medium text-[#1F2937] cursor-pointer">
                  <option>Upper Berth</option>
                  <option>Middle Berth</option>
                  <option>Lower Berth</option>
                  <option>Side Lower</option>
                </select>
              </div>

              <div className="pt-2">
                 <Button type="submit" className="w-full bg-[#0B4F8A] text-white py-2 rounded-[4px]">
                   Publish Listing
                 </Button>
              </div>
            </form>
         </div>
      </section>
    </div>
  );
}
