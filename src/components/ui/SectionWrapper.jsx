/**
 * @file SectionWrapper.jsx
 * @description A reusable wrapper for separating main sections with Headings and descriptions.
 * 
 * WHY THIS FILE EXISTS:
 * Provides the required strict structure "Heading -> Subheading" for every page in the app, saving boilerplate.
 * 
 * WHAT PROBLEM IT SOLVES:
 * - Ensures consistently sized headers across all pages.
 * - Handles max-width and internal spacing elegantly.
 * 
 * WHAT WILL BREAK IF REMOVED:
 * Pages will lose their standard header structure and margin definitions.
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function SectionWrapper({ title, description, children, className, actionContent }) {
  return (
    <div className={cn("w-full space-y-6", className)}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          {title && <h1 className="text-2xl font-bold tracking-tight text-slate-800">{title}</h1>}
          {description && <p className="text-sm font-medium text-slate-500">{description}</p>}
        </div>
        {actionContent && (
          <div className="shrink-0">
            {actionContent}
          </div>
        )}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
