import { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const SHORT_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_LABELS = ['S','M','T','W','T','F','S'];

export default function DateSelector({ label, value, onChange, placeholder = "Select Date" }) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    onChange(`${day} ${SHORT_MONTHS[viewMonth]}, ${viewYear}`);
    setIsOpen(false);
  };

  const isToday = (day) => {
    return day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
  };

  const isPast = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {/* Input Facade */}
      <div 
        className={`w-full bg-white border ${isOpen ? 'border-indigo-500 ring-2 ring-indigo-50' : 'border-gray-300 hover:border-gray-400'} rounded-lg px-4 py-3 cursor-pointer transition-all flex items-center justify-between`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-1">{label}</p>
          <p className={`text-base font-semibold truncate ${value ? 'text-gray-900' : 'text-gray-400'}`}>
            {value || placeholder}
          </p>
        </div>
        <CalendarIcon size={20} className="text-gray-400" />
      </div>

      {/* Popover */}
      {isOpen && (
        <div className="absolute top-[110%] left-0 w-[320px] z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-4">
             <span className="font-bold text-gray-900 text-sm">{MONTH_NAMES[viewMonth]} {viewYear}</span>
             <div className="flex gap-2">
               <button type="button" onClick={handlePrev} className="p-1 rounded bg-gray-50 hover:bg-gray-100 text-gray-600"><ChevronLeft size={16}/></button>
               <button type="button" onClick={handleNext} className="p-1 rounded bg-gray-50 hover:bg-gray-100 text-gray-600"><ChevronRight size={16}/></button>
             </div>
          </div>
          
          <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
            {DAY_LABELS.map((d, i) => <div key={i} className="font-bold text-gray-400 text-xs py-1">{d}</div>)}
            
            {/* Empty cells for days before the 1st */}
            {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} />)}
            
            {/* Actual day buttons */}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const todayClass = isToday(day) ? 'bg-indigo-600 text-white shadow-sm' : '';
              const pastClass = isPast(day) ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100';
              
              return (
                <button
                  type="button"
                  key={day}
                  disabled={isPast(day)}
                  onClick={() => handleSelect(day)}
                  className={`font-bold rounded-md py-1.5 transition-colors ${todayClass || pastClass}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
