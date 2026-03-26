/**
 * @file index.jsx (Connecting Journeys Page)
 * @description Flat structured routing matching enterprise booking UX.
 */

import { useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';

export default function ConnectingJourneys() {
  const [fromStation] = useState('New Delhi (NDLS)');
  const [toStation] = useState('Ernakulam (ERS)');

  return (
    <div className="w-full pb-16 bg-[#F5F7FA] min-h-screen">
      
      {/* Header */}
      <section className="bg-white border-b border-[#D1D5DB] py-6 mb-6">
        <div className="max-w-[1000px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
           <div>
             <h1 className="text-xl font-semibold text-[#1F2937]">Connecting Routes</h1>
             <p className="text-[13px] text-[#6B7280]">Alternative multi-train connections</p>
           </div>
           
           <div className="flex items-center gap-4 bg-[#F9FAFB] border border-[#D1D5DB] px-4 py-2 mt-4 sm:mt-0 rounded-[4px]">
              <span className="text-[14px] font-bold text-[#1F2937]">{fromStation}</span>
              <ArrowRight size={16} className="text-[#6B7280]" />
              <span className="text-[14px] font-bold text-[#1F2937]">{toStation}</span>
           </div>
        </div>
      </section>

      <section className="max-w-[1000px] mx-auto px-4">
        <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D1D5DB]">
           
           <div className="px-5 py-4 border-b border-[#D1D5DB] bg-[#F9FAFB] flex justify-between items-center">
              <h2 className="text-[15px] font-bold text-[#1F2937]">Option 1: via Vadodara</h2>
              <span className="bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC] text-[11px] font-bold uppercase rounded-[4px] px-2 py-0.5">High Reliability</span>
           </div>

           <div className="p-6">
             <div className="relative pl-[28px] border-l-2 border-dashed border-[#D1D5DB] py-1 space-y-6">
               
               {/* Leg 1 */}
               <div className="relative">
                  <div className="absolute -left-[37px] top-6 w-[16px] h-[16px] rounded-full border-[2px] border-[#0B4F8A] bg-white"></div>
                  
                  <div className="bg-[#F9FAFB] rounded-[6px] p-4 border border-[#E5E7EB]">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[11px] font-bold uppercase text-[#6B7280] mb-0.5">Train 1 • 12952 Rajdhani</p>
                        <h4 className="font-semibold text-[#1F2937] text-[15px]">New Delhi → Vadodara</h4>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#0B4F8A] text-[14px]">16:25 - 03:52</p>
                      </div>
                    </div>
                  </div>
               </div>

               {/* Layover */}
               <div className="relative">
                  <div className="absolute -left-[37px] top-1/2 -translate-y-1/2 bg-white rounded-full p-0.5 border border-[#D1D5DB]">
                     <Clock size={12} className="text-[#D97706]"/>
                  </div>
                  
                  <div className="pl-3 py-1">
                     <p className="text-[#D97706] font-bold text-[13px]">
                        2h 15m Layover at <span className="uppercase tracking-wide">Vadodara Jn</span>
                     </p>
                  </div>
               </div>

               {/* Leg 2 */}
               <div className="relative">
                  <div className="absolute -left-[37px] top-6 w-[16px] h-[16px] rounded-full border-[4px] border-[#0B4F8A] bg-white"></div>
                  
                  <div className="bg-[#F9FAFB] rounded-[6px] p-4 border border-[#E5E7EB]">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[11px] font-bold uppercase text-[#6B7280] mb-0.5">Train 2 • 16345 Netravati</p>
                        <h4 className="font-semibold text-[#1F2937] text-[15px]">Vadodara → Ernakulam</h4>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#0B4F8A] text-[14px]">06:07 - 14:15</p>
                      </div>
                    </div>
                  </div>
               </div>

             </div>

             <div className="mt-8 bg-[#F9FAFB] p-4 rounded-[6px] border border-[#D1D5DB] flex items-center justify-between">
                <div>
                   <p className="text-[11px] font-bold text-[#6B7280] uppercase">Total Duration</p>
                   <p className="text-lg font-bold text-[#1F2937]">45h 50m</p>
                </div>
                <button className="bg-[#0B4F8A] text-white px-5 py-2 rounded-[4px] text-[14px] font-semibold hover:bg-[#0A3D75]">
                   Book Now
                </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
