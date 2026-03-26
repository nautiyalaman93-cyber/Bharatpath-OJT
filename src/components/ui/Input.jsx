/**
 * @file Input.jsx
 * @description A reusable form input component.
 * 
 * WHY THIS FILE EXISTS:
 * Standardizes text inputs, search boxes, and form fields across the app.
 * 
 * WHAT PROBLEM IT SOLVES:
 * - Applies consistent focus rings, error states, and background colors.
 * - Can be easily wrapped with forwardRef if needed for react-hook-form.
 * 
 * LOGIC DECISIONS:
 * // Provides an optional 'error' prop to automatically style the border red and show an error message below it.
 * 
 * WHAT WILL BREAK IF REMOVED:
 * Forms across the application (like PNR Search or Login) will throw reference errors.
 */

import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Input = forwardRef(({ 
  className, 
  error, 
  label, 
  id, 
  ...props 
}, ref) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={cn(
          "w-full px-4 py-3 bg-[#f5f7fb] border border-slate-200 rounded-xl text-slate-800",
          "placeholder:text-slate-400 transition-all duration-200 outline-none",
          "focus:border-blue-400 focus:ring-2 focus:ring-blue-100 hover:border-slate-300",
          error && "border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50/50",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
