import { X, LayoutDashboard, AlertTriangle, CheckSquare, List, Settings, HelpCircle, LogOut } from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <div className="flex flex-col h-full w-64 bg-red-400 text-white">
      {/* Close button for mobile */}
      <div className="flex items-center justify-between p-4 lg:hidden">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-red-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

  
      {/* Navigation Menu */}
      <nav className="flex-1 px-6">
        a
      </nav>

      {/* Logout button at bottom */}
      <div className="p-6">
      
      </div>
    </div>
  );
}