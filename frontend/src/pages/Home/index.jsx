/**
 * @file index.jsx (Home Page)
 * @description BharatPath home — theme-aware hero, stats row, animated feature cards.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/ui/SearchBar';
import { api } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import {
  Target, Map, Activity, Clock, ArrowRight, FileText,
  Zap, Users, Star, TrendingUp, Train, CheckCircle2,
} from 'lucide-react';

const stats = [
  { icon: TrendingUp, label: 'PNR Checks', value: '1.2M+' },
  { icon: Train,      label: 'Trains Tracked', value: '8,000+' },
  { icon: Users,      label: 'Active Users', value: '45K' },
  { icon: Star,       label: 'App Rating', value: '4.8 ★' },
];

const features = [
  {
    title: 'Live Train Status',
    desc: 'Get exact location, platform info, and delay estimates in real time.',
    icon: Activity,
    badge: 'Live',
    badgeColor: '#22C55E',
    badgeBg: 'rgba(34,197,94,0.10)',
    iconColor: '#3B82F6',
    iconBg: 'rgba(59,130,246,0.10)',
    path: '/live-tracking',
  },
  {
    title: 'PNR Status Insight',
    desc: 'Confirm booking status, track waitlist movement, and chart preparation.',
    icon: FileText,
    badge: 'Instant',
    badgeColor: '#10B981',
    badgeBg: 'rgba(16,185,129,0.10)',
    iconColor: '#10B981',
    iconBg: 'rgba(16,185,129,0.10)',
    path: '/pnr-status',
  },
  {
    title: 'GPS Proximity Alarm',
    desc: 'Sleep without worry. Wake up automatically as you approach your station.',
    icon: Target,
    badge: 'Smart',
    badgeColor: '#E05A00',
    badgeBg: 'rgba(224,90,0,0.10)',
    iconColor: '#E05A00',
    iconBg: 'rgba(224,90,0,0.10)',
    path: '/proximity-alerts',
  },
  {
    title: 'Seat Swap Exchange',
    desc: 'Find co-passengers willing to swap. No middlemen, no hassle.',
    icon: Map,
    badge: 'P2P',
    badgeColor: '#8B5CF6',
    badgeBg: 'rgba(139,92,246,0.10)',
    iconColor: '#8B5CF6',
    iconBg: 'rgba(139,92,246,0.10)',
    path: '/seat-exchange',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isSearching, setIsSearching] = useState(false);
  const [trainResults, setTrainResults] = useState(null);

  const handleSearch = async (query) => {
    setIsSearching(true);
    setTrainResults(null);
    try {
      const results = await api.searchTrains(query.fromStation, query.toStation, query.journeyDate);
      setTrainResults(results);
    } catch (error) {
      console.error('Failed to fetch trains:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full pb-20 min-h-screen" style={{ background: 'var(--bg-page)' }}>

      {/* ═══ Hero Section — Theme Aware ═══ */}
      <section
        className="w-full text-center pt-20 pb-48 relative overflow-hidden bp-particles bp-hero-dark"
      >
        {/* Ambient glow — dark mode only */}
        {isDark && <>
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(255,140,66,0.05)' }} />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[150%] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(59,130,246,0.06)' }} />
        </>}

        {/* Light mode ambient */}
        {!isDark && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[60%] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(224,90,0,0.07)' }} />
        )}

        {/* Floating particles */}
        <div className="bp-particle bp-particle--1" />
        <div className="bp-particle bp-particle--2" />
        <div className="bp-particle bp-particle--3" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 mt-4">
          {/* Badge */}
          <div className="anim-fade-up">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 text-[12px] font-bold tracking-widest uppercase"
              style={isDark ? {
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.70)',
                backdropFilter: 'blur(8px)',
              } : {
                background: 'rgba(224,90,0,0.08)',
                border: '1px solid rgba(224,90,0,0.20)',
                color: 'var(--primary)',
              }}
            >
              <Zap size={12} />
              Intelligent Railway Dashboard
            </div>
          </div>

          {/* Main heading */}
          <h1
            className="text-5xl md:text-[64px] font-extrabold mb-5 tracking-tight leading-[1.05] anim-fade-up anim-delay-1"
            style={{
              fontFamily: "'Poppins', sans-serif",
              background: isDark
                ? 'linear-gradient(135deg, #FFFFFF 0%, #FF8C42 40%, #58A6FF 70%, #FFFFFF 100%)'
                : 'linear-gradient(135deg, #0F0D0B 0%, #E05A00 45%, #1E3A8A 100%)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradient-shift 5s ease infinite',
            }}
          >
            BHARAT·PATH
          </h1>

          <p
            className="text-[16px] md:text-[18px] font-medium max-w-xl mx-auto leading-relaxed anim-fade-up anim-delay-2"
            style={{ color: isDark ? 'rgba(232,221,212,0.70)' : 'var(--text-secondary)' }}
          >
            Real-time IRCTC insights, live train telematics, and peer seat swaps — all in one dashboard.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center justify-center gap-3 mt-8 anim-fade-up anim-delay-3">
            <button
              onClick={() => navigate('/pnr-status')}
              className="bp-btn bp-btn--primary"
              style={{ padding: '12px 28px', fontSize: '14px', borderRadius: '12px' }}
            >
              Check PNR Status
            </button>
            <button
              onClick={() => navigate('/live-tracking')}
              className="bp-btn bp-btn--secondary"
              style={{ padding: '12px 28px', fontSize: '14px', borderRadius: '12px' }}
            >
              Live Tracking →
            </button>
          </div>
        </div>
      </section>

      {/* ═══ Stats Row ═══ */}
      <section className="w-full max-w-[1050px] mx-auto px-4 -mt-6 relative z-20 anim-fade-up anim-delay-2">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bp-stat-chip">
                <Icon size={15} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ Search Bar ═══ */}
      <section className="w-full max-w-[1050px] mx-auto px-4 relative z-20 anim-fade-up anim-delay-3" style={{ marginTop: '-12px' }}>
        <div
          className="rounded-2xl"
          style={{
            background: 'var(--bg-surface)',
            boxShadow: isDark
              ? '0 0 0 1px rgba(255,140,66,0.12), 0 16px 64px rgba(0,0,0,0.5)'
              : '0 8px 40px rgba(0,0,0,0.10), 0 0 0 1px rgba(224,90,0,0.08)',
            border: '1px solid var(--border)',
          }}
        >
          <SearchBar onSearch={handleSearch} isSearching={isSearching} />
        </div>
      </section>

      {/* ═══ Results OR Feature Cards ═══ */}
      {trainResults ? (
        <section className="w-full max-w-[1050px] mx-auto mt-10 px-4 anim-fade-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="bp-section-label">
                <CheckCircle2 size={12} />
                Results
              </span>
              <h2
                className="text-[20px] font-extrabold"
                style={{ color: 'var(--text-heading)', fontFamily: "'Poppins', sans-serif" }}
              >
                {trainResults.length} trains found
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {trainResults.map((train, idx) => (
              <div key={idx} className={`bp-card overflow-hidden relative group anim-fade-up anim-delay-${idx + 1}`}>
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{ background: 'linear-gradient(180deg, var(--primary), transparent)' }}
                />

                <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-light)', background: 'var(--bg-surface-2)' }}>
                  <div className="flex items-center gap-3">
                    <h3 className="text-[16px] font-extrabold uppercase tracking-wide flex items-center gap-2" style={{ color: 'var(--text-heading)', fontFamily: "'Poppins', sans-serif" }}>
                      {train.name || train.trainName}
                      <span className="text-[12px] font-bold border px-2 py-0.5 rounded" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)', background: 'var(--bg-card)', fontFamily: "'Inter', monospace" }}>
                        #{train.id || train.trainNumber}
                      </span>
                    </h3>
                    {train.type && (
                      <span className="text-[11px] font-bold border px-2.5 py-0.5 rounded uppercase tracking-wider" style={{ background: 'var(--secondary-light)', color: '#1E88E5', borderColor: 'rgba(30,136,229,0.30)' }}>
                        {train.type}
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-heading)', fontFamily: "'Poppins', sans-serif" }}>{train.departure}</p>
                      <p className="text-[11px] font-bold uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>Departure</p>
                    </div>
                    <div className="flex flex-col items-center w-[100px]">
                      <p className="text-[11px] font-semibold mb-2 flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                        <Clock size={10} /> {train.duration}
                      </p>
                      <div className="w-full h-[2px] relative" style={{ background: 'var(--border)' }}>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: 'var(--primary)', boxShadow: '0 0 6px var(--primary-glow)' }} />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-heading)', fontFamily: "'Poppins', sans-serif" }}>{train.arrival}</p>
                      <p className="text-[11px] font-bold uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>Arrival</p>
                    </div>
                  </div>
                  <button
                    className="bp-btn bp-btn--primary"
                    style={{ padding: '10px 24px', fontSize: '13px', borderRadius: '10px' }}
                    onClick={() => navigate('/live-tracking')}
                  >
                    Track Live <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="w-full max-w-[1050px] mx-auto mt-16 px-4 pb-8">
          <div className="flex items-center gap-3 mb-10 anim-fade-up">
            <span className="bp-section-label">Features</span>
            <h2 className="text-[22px] font-extrabold tracking-wide" style={{ color: 'var(--text-heading)', fontFamily: "'Poppins', sans-serif" }}>
              Everything you need on your journey
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  onClick={() => navigate(feature.path)}
                  className={`bp-card p-6 cursor-pointer group flex flex-col h-full relative overflow-hidden anim-fade-up anim-delay-${idx + 1}`}
                >
                  {/* Hover gradient sweep */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at top right, ${feature.iconBg}, transparent 65%)` }}
                  />

                  {/* Badge */}
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div
                      className="bp-icon-box w-11 h-11 anim-breathe"
                      style={{ background: feature.iconBg, border: '1px solid var(--border-light)', animationDelay: `${idx * 0.4}s` }}
                    >
                      <Icon size={20} color={feature.iconColor} />
                    </div>
                    <span
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{ background: feature.badgeBg, color: feature.badgeColor, border: `1px solid ${feature.badgeColor}33` }}
                    >
                      {feature.badge}
                    </span>
                  </div>

                  <h3
                    className="text-[15px] font-bold mb-2 leading-snug relative z-10"
                    style={{ color: 'var(--text-heading)', fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed mb-5 flex-1 relative z-10" style={{ color: 'var(--text-secondary)' }}>
                    {feature.desc}
                  </p>

                  <span
                    className="text-[12px] font-bold mt-auto uppercase tracking-widest relative z-10 flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300"
                    style={{ color: feature.iconColor }}
                  >
                    Explore <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
