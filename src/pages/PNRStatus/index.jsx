/**
 * @file index.jsx (PNR Status Page)
 * @description Tabular data readouts for PNR. Flat minimal aesthetic.
 */

import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Search, User } from 'lucide-react';

export default function PNRStatus() {
  const [pnr, setPnr] = useState('1234567890');
  const [isSearching, setIsSearching] = useState(false);
  const [statusData, setStatusData] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setStatusData(true);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="w-full pb-16 bg-[#F5F7FA] min-h-screen">
      
      <section className="bg-white border-b border-[#D1D5DB] py-6 mb-6">
        <div className="max-w-[1000px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
           <div>
             <h1 className="text-xl font-semibold text-[#1F2937]">Check PNR Status</h1>
             <p className="text-[13px] text-[#6B7280]">Real-time confirmation and boarding chart intelligence.</p>
           </div>
           
           <form onSubmit={handleSearch} className="flex items-center w-full sm:w-[450px]">
             <div className="relative flex-1">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-[#6B7280]" />
               </div>
               <input 
                 type="text" 
                 value={pnr}
                 onChange={(e) => setPnr(e.target.value)}
                 placeholder="Enter 10 Digit PNR"
                 className="w-full pl-9 pr-3 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] focus:outline-none focus:bg-white text-[15px] font-medium text-[#1F2937] rounded-l-md"
                 required
                 maxLength={10}
               />
             </div>
             <Button type="submit" isLoading={isSearching} className="rounded-l-none h-[42px] px-6">
               Get Status
             </Button>
           </form>
        </div>
      </section>

      {statusData && (
        <section className="max-w-[1000px] mx-auto px-4 space-y-6">
           
           {/* Brief Box */}
           <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D1D5DB] flex flex-col sm:flex-row items-center justify-between px-6 py-5">
             <div>
               <div className="flex items-center gap-3 mb-1">
                 <h2 className="text-[18px] font-bold text-[#1F2937]">12952 Mumbai Rajdhani</h2>
                 <span className="text-[12px] font-bold bg-[#E5E7EB] text-[#475569] px-2 py-0.5 rounded-[4px]">AC 3-Tier</span>
               </div>
               <p className="text-[14px] text-[#6B7280] font-medium border-l-[3px] border-[#0B4F8A] pl-2">NDLS (New Delhi) → MMCT (Mumbai Central)</p>
             </div>
             <div className="bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC] px-4 py-2 mt-4 sm:mt-0 rounded-[6px]">
                <p className="text-[14px] font-bold uppercase tracking-wide">Chart Prepared</p>
             </div>
           </div>

           {/* Table */}
           <div className="bg-[#FFFFFF] rounded-[8px] border border-[#D1D5DB] overflow-hidden">
             <div className="px-5 py-3 border-b border-[#D1D5DB] bg-[#F9FAFB]">
                <h3 className="font-bold text-[#1F2937] text-[15px]">Passenger Information</h3>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-[#F5F7FA] text-[12px] uppercase font-bold text-[#6B7280] border-b border-[#E5E7EB]">
                     <th className="px-5 py-3">Sr. No.</th>
                     <th className="px-5 py-3 text-center">Booking Status</th>
                     <th className="px-5 py-3 text-center">Current Status</th>
                     <th className="px-5 py-3 text-right">Coach / Seat</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-[#E5E7EB] text-[14px] font-medium text-[#1F2937]">
                   {[
                     { book: 'CNF', check: 'CNF', location: 'B4 | 45 | Lower' },
                     { book: 'CNF', check: 'CNF', location: 'B4 | 46 | Middle' }
                   ].map((p, i) => (
                     <tr key={i} className="hover:bg-[#F9FAFB] transition-colors">
                       <td className="px-5 py-4 flex items-center gap-2 font-bold text-[#0B4F8A]">
                         <User size={14} className="text-[#6B7280]"/> Passenger {i+1}
                       </td>
                       <td className="px-5 py-4 text-center text-[#6B7280]">{p.book}</td>
                       <td className="px-5 py-4 text-center">
                         <span className="font-bold text-[#16A34A]">{p.check}</span>
                       </td>
                       <td className="px-5 py-4 text-right font-bold">{p.location}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>

        </section>
      )}
    </div>
  );
}
