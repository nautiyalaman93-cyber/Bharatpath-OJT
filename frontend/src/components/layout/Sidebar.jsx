/**
 * @file Sidebar.jsx
 * @description The persistent side navigation bar.
 * Uses CSS custom properties from the BharatPath theme system —
 * automatically adapts between light (saffron accents) and dark mode.
 */

import { NavLink } from 'react-router-dom';
import {
  Home,
  MapPin,
  Ticket,
  BellRing,
  AlertTriangle,
  RefreshCcw,
  Route,
} from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard',           path: '/',                    icon: Home },
    { name: 'Live Tracking',       path: '/live-tracking',       icon: MapPin },
    { name: 'PNR Status',          path: '/pnr-status',          icon: Ticket },
    { name: 'Proximity Alerts',    path: '/proximity-alerts',    icon: BellRing },
    { name: 'Seat Exchange',       path: '/seat-exchange',       icon: RefreshCcw },
    { name: 'Connecting Journeys', path: '/connecting-journeys', icon: Route },
    { name: 'SOS Emergency',       path: '/sos',                 icon: AlertTriangle, isDanger: true },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'w-64' : 'w-[80px]'} bp-glass`}
      style={{
        borderRight: '1px solid var(--border)',
      }}
    >
      <div className="flex flex-col h-full relative">
        
        {/* Surgical Logo Section */}
        <div className="h-[72px] flex items-center px-5 border-b border-[var(--border)] overflow-hidden">
          <div 
            className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 anim-rotate-in"
            style={{ background: 'linear-gradient(135deg, var(--primary), #FF8C42)' }}
          >
        }}
        className="p-6 text-xs text-center"
      >
        <p style={{ color: 'var(--text-secondary)' }} className="font-semibold mb-1">
          BharatPath App
        </p>
        <p>&copy; {new Date().getFullYear()} All rights reserved</p>
      </div>
    </aside>
  );
}
