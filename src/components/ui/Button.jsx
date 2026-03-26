import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for class merging
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Button({ 
  children, 
  variant = 'primary', 
  className, 
  isLoading, 
  disabled, 
  ...props 
}) {
  // Strict RailYatri styling: minimal radiuses, no massive shadows.
  const baseStyles = "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Exact colors from prompt
    primary: "bg-[#0B4F8A] text-white hover:bg-[#0A3D75] border border-transparent tracking-wide text-[15px]",
    secondary: "bg-white text-[#1F2937] hover:bg-[#F5F7FA] border border-[#D1D5DB]",
    danger: "bg-[#FEE2E2] hover:bg-[#FECACA] text-[#B91C1C] border border-[#FCA5A5]",
    outline: "bg-transparent text-[#0B4F8A] border border-[#0B4F8A] hover:bg-[#EFF6FF]"
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Please wait
        </span>
      ) : children}
    </button>
  );
}
