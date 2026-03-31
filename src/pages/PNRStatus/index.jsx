/**
 * @file index.jsx (PNR Status Page)
 * @description Tabular data readouts for PNR. Flat minimal aesthetic.
 */

import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Search, User } from 'lucide-react';
import { api } from '../../services/api';

export default function PNRStatus() {
  const [pnr, setPnr] = useState('1234567890');
  const [isSearching, setIsSearching] = useState(false);
  const [statusData, setStatusData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setStatusData(null);
    try {
      const data = await api.getPNRStatus(pnr);
      setStatusData(data);
    } catch (error) {
      console.error("Failed to fetch PNR:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full pb-16 bg-[#F5F7FA] min-h-screen">
      
      <section className="bg-gradient-to-r from-[#0B4F8A] to-[#1E3A8A] border-b border-[#D1D5DB] py-10 mb-8 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
        <div className="max-w-[1050px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
           <div className="text-center md:text-left">
             <h1 className="text-2xl font-bold text-white tracking-wide mb-1 flex items-center justify-center md:justify-start gap-2">
                <Search size={24} className="text-[#93C5FD]"/> 
                Check PNR Status
             </h1>
             <p className="text-[14px] text-[#E0E7FF] font-medium">Get accurate probability metrics and current tracking.</p>
           </div>
           
           <form onSubmit={handleSearch} className="flex items-stretch w-full sm:w-[500px] shadow-lg rounded-[8px] overflow-hidden bg-white p-1.5 focus-within:ring-2 focus-within:ring-[#93C5FD] transition-all">
             <div className="relative flex-1 flex items-center bg-[#F8FAFC] rounded-[6px] border border-transparent hover:border-[#E2E8F0] transition-colors">
               <div className="pl-4 pr-2 flex items-center pointer-events-none">
                  <Search size={18} className="text-[#94A3B8]" />
               </div>
               <input 
                 type="text" 
                 value={pnr}
                 onChange={(e) => setPnr(e.target.value)}
                 placeholder="Enter 10 Digit PNR"
                 className="w-full pr-4 py-3 bg-transparent focus:outline-none focus:bg-white text-[16px] font-bold text-[#0F172A] tracking-wider placeholder-[#94A3B8]"
                 required
                 maxLength={10}
               />
             </div>
             <Button type="submit" isLoading={isSearching} className="ml-1.5 rounded-[6px] h-auto px-8 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-[15px] tracking-wide shadow-sm transition-colors">
               SEARCH
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
