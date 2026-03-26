/**
 * @file Sidebar.jsx
 * @description The persistent side navigation bar.
 * 
 * WHY THIS FILE EXISTS:
 * Provides a dedicated navigation menu enabling users to switch between different sections of the app.
 * 
 * WHAT PROBLEM IT SOLVES:
 * - Keeps navigation accessible at all times without page reloads.
 * - Visually indicates the active route so users know their current location.
 * 
 * LOGIC DECISIONS:
 * // We use `NavLink` from `react-router-dom` because it automatically knows if its `to` path matches the current URL.
 * // This makes it trivial to apply active styles (e.g., highlighting the active tab with blue).
 * 
 * WHAT WILL BREAK IF REMOVED:
 * Users will lose the primary method of navigating between pages.
 */

import { NavLink } from 'react-router-dom';
import { 
  Home, 
  MapPin, 
  Ticket, 
  BellRing, 
  AlertTriangle, 
  RefreshCcw, 
  Route 
} from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Live Tracking', path: '/live-tracking', icon: MapPin },
    { name: 'PNR Status', path: '/pnr-status', icon: Ticket },
    { name: 'Proximity Alerts', path: '/proximity-alerts', icon: BellRing },
    { name: 'Seat Exchange', path: '/seat-exchange', icon: RefreshCcw },
    { name: 'Connecting Journeys', path: '/connecting-journeys', icon: Route },
    { name: 'SOS Emergency', path: '/sos', icon: AlertTriangle, isDanger: true },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full overflow-y-auto shadow-sm z-20">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md shadow-blue-500/20">
          <Route className="text-white" size={24} />
        </div>
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-wide">
          BharatPath
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-1.5">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4 mt-2">Main Menu</div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? item.isDanger 
                    ? 'bg-red-50 text-red-600 border border-red-100 shadow-sm'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`
            }
          >
            <item.icon size={20} className={item.isDanger && !location.pathname.includes(item.path) ? 'text-red-500' : ''} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer area inside sidebar */}
      <div className="p-6 border-t border-slate-100 text-xs text-center text-slate-400">
        <p className="font-medium text-slate-500 mb-1">BharatPath App</p>
        <p>&copy; {new Date().getFullYear()} All rights reserved</p>
      </div>
    </aside>
  );
}
