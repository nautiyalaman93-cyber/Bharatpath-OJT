import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fb]">
      <Topbar />
      
      {/* Clean, well-spaced main container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Outlet />
      </main>
      
      {/* Minimal Product Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-8 mt-12 shrink-0">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 font-medium">
          <p>&copy; 2026 BharatPath Advisory. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <span className="hover:text-blue-600 cursor-pointer transition-colors">Support</span>
             <span className="hover:text-blue-600 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
