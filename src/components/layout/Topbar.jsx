import { Link, useLocation } from 'react-router-dom';
import { Train } from 'lucide-react';

export default function Topbar() {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/pnr-status', label: 'PNR Status' },
    { path: '/live-tracking', label: 'Live Status' },
    { path: '/sos', label: 'SOS Emergency' },
  ];

  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#D1D5DB] sticky top-0 z-50">
      <div className="max-w-[1000px] mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Strict Corporate Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-[4px] bg-[#0B4F8A] flex items-center justify-center text-white">
             <Train size={18} />
          </div>
          <span className="text-[18px] font-bold text-[#1F2937] tracking-tight">BharatPath</span>
        </Link>
        
        {/* Navigation - Ultra Minimal RailYatri text links */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const isSOS = link.path === '/sos';
            
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[14px] font-bold uppercase tracking-wide transition-colors ${
                  isActive
                    ? (isSOS ? 'text-[#B91C1C]' : 'text-[#0B4F8A] pb-[19px] border-b-[3px] border-[#0B4F8A] pt-[22px]')
                    : (isSOS ? 'text-[#B91C1C] hover:text-[#7f1d1d]' : 'text-[#475569] hover:text-[#1F2937]')
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
