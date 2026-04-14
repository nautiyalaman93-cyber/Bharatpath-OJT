import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const SHORT_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_LABELS = ['S','M','T','W','T','F','S'];

export default function DateSelector({ label, value, onChange }) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  // Get first day of month (0=Sun) and total days
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handlePrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleSelect = (day) => {
    onChange(`${day} ${SHORT_MONTHS[viewMonth]}`);
  };

  const isToday = (day) => {
    return day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
  };

  const isPast = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  };

  // Can't go before current month
  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div className="w-[300px] rounded-xl shadow-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canGoPrev}
            className="p-1 rounded transition-colors"
            style={{
              background: 'var(--bg-surface-2)',
              color: canGoPrev ? 'var(--text-primary)' : 'var(--text-muted)',
              opacity: canGoPrev ? 1 : 0.4,
            }}
          >
            <ChevronLeft size={16}/>
          </button>
          <button type="button" onClick={handleNext} className="p-1 rounded" style={{ background: 'var(--bg-surface-2)', color: 'var(--text-primary)' }}>
            <ChevronRight size={16}/>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
        {DAY_LABELS.map((d, i) => <div key={i} className="font-bold text-xs py-1" style={{ color: 'var(--text-muted)' }}>{d}</div>)}

        {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} />)}

        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const isT = isToday(day);
          const isP = isPast(day);

          return (
            <button
              type="button"
              key={day}
              disabled={isP}
              onClick={() => handleSelect(day)}
              className="font-bold rounded-md py-1.5 transition-colors"
              style={{
                background: isT ? 'var(--primary)' : 'transparent',
                color: isT ? '#fff' : isP ? 'var(--text-muted)' : 'var(--text-primary)',
                cursor: isP ? 'not-allowed' : 'pointer',
                opacity: isP ? 0.4 : 1,
              }}
              onMouseEnter={(e) => { if (!isT && !isP) e.currentTarget.style.background = 'var(--bg-hover)'; }}
              onMouseLeave={(e) => { if (!isT && !isP) e.currentTarget.style.background = 'transparent'; }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
