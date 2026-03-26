/**
 * @file Card.jsx
 * @description Flexible container components for grouping information.
 * 
 * WHY THIS FILE EXISTS:
 * Almost every data point in the dashboard (train stats, tickets) will be displayed inside a card shape.
 * 
 * WHAT PROBLEM IT SOLVES:
 * - Ensures uniform padding, border radius, and backgrounds for floating containers.
 * - Exports Card, CardHeader, CardTitle, and CardContent for composability.
 * 
 * LOGIC DECISIONS:
 * // Splitting the card into sub-components (Card, CardHeader, CardContent) 
 * // allows maximum flexibility for the developer to structure the insides.
 * 
 * WHAT WILL BREAK IF REMOVED:
 * High-level layout structural integrity will be lost everywhere cards are used.
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Card({ className, children, ...props }) {
  return (
    <div 
      className={cn("bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200", className)} 
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn("px-6 py-5 border-b border-slate-100", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn("text-lg font-bold text-slate-800", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}
