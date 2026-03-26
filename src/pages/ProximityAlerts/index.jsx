/**
 * @file index.jsx (Proximity Alerts Page)
 * @description Linear alarm configuration stripped of gradients and rounded heavily.
 */

import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { MapPin } from 'lucide-react';

export default function ProximityAlerts() {
  const [distance, setDistance] = useState(15);
  const [targetStation, setTargetStation] = useState('MMCT | Mumbai Central');
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full pb-16 bg-[#F5F7FA] min-h-screen">
      
      <section className="bg-white border-b border-[#D1D5DB] py-6 mb-8">
        <div className="max-w-[1000px] mx-auto px-4">
           <h1 className="text-xl font-semibold text-[#1F2937]">Destination Alarms</h1>
           <p className="text-[13px] text-[#6B7280]">GPS-triggered wake-up calls based on train proximity.</p>
        </div>
      </section>

      <section className="max-w-[600px] mx-auto px-4">
        <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D1D5DB] overflow-hidden">
           
           <div className="px-6 py-4 border-b border-[#D1D5DB] bg-[#F9FAFB] flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-[#1F2937] uppercase tracking-wide">Configure Alarm</h2>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={isActive} onChange={() => setIsActive(!isActive)} />
                <div className="w-11 h-6 bg-[#D1D5DB] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
              </label>
           </div>

           <div className={`p-6 space-y-6 ${isActive ? 'opacity-100' : 'opacity-40 pointer-events-none transition-opacity'}`}>
              
              <div>
                <label className="block text-[12px] font-bold text-[#6B7280] uppercase tracking-wide mb-2">Target Station Code</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6B7280]">
                     <MapPin size={16} />
                  </div>
                  <input 
                    type="text" 
                    value={targetStation}
                    onChange={(e) => setTargetStation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#F9FAFB] border border-[#D1D5DB] rounded-[4px] focus:outline-none focus:border-[#0B4F8A] font-semibold text-[#1F2937] text-[15px]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-3">
                  <label className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wide">Trigger Radius</label>
                  <p className="text-[18px] font-bold text-[#1F2937]">{distance} km</p>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="50" 
                  value={distance} 
                  onChange={(e) => setDistance(e.target.value)} 
                  className="w-full h-1 bg-[#D1D5DB] rounded-lg appearance-none cursor-pointer accent-[#0B4F8A]" 
                />
                <div className="flex justify-between text-[11px] font-bold text-[#6B7280] uppercase tracking-wide mt-2">
                  <span>5 km</span>
                  <span>50 km</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB]">
                 <Button className="w-full h-[45px] text-[15px] tracking-wide" disabled={!isActive}>
                   SAVE SETTINGS
                 </Button>
              </div>

           </div>
        </div>
      </section>
    </div>
  );
}
