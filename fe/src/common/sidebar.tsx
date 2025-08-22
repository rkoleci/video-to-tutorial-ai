import { X, LayoutDashboard, AlertTriangle, CheckSquare, } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthed } = useAuth()

  if (!isAuthed) {
    return null
  }

  const handleClick = (key: string, route: string) => {
    console.log(key)
    navigate(route);
  };

  const menuItems = [
    {
      key: 'home',
      label: 'Home',
      icon: 'dashboard',
      route: '/home',
    },
    {
      key: 'vital',
      label: 'My Tutorials',
      icon: 'vital',
      route: '/tutorials',
    },
    {
      key: 'help',
      label: 'Help',
      icon: 'help',
      route: '/help',
    },
  ]

  return (
    <div className="pt-10 bg-[#f6f8ff] h-full">
      <div className="flex flex-col h-full w-80 bg-[#ff6767] text-white relative rounded-r-2xl">
        {/* Close button for mobile */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-red-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex flex-col items-center pt-8 pb-8 px-6 relative">
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden mb-6 absolute -top-8 bg-white shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Sundar Gurung</h2>
            <p className="text-white/80 text-sm">sundargurung360@gmail.com</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 space-y-2">
          {menuItems.map(({ key, label, icon, route }) => {
            const activeMenu = location.pathname === route;

            return <button
              key={key}
              onClick={() => handleClick(key, route)}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-colors ${activeMenu
                ? 'bg-white border-2 border-blue-500'
                : 'hover:bg-white/10'
                }`}
            >
              {icon === 'dashboard' && (
                <LayoutDashboard className={`h-5 w-5 ${activeMenu ? 'text-[#ff6767]' : 'text-white'
                  }`} fill="currentColor" />
              )}
              {icon === 'vital' && (
                <AlertTriangle className={`h-5 w-5 ${activeMenu ? 'text-[#ff6767]' : 'text-white'
                  }`} fill="currentColor" />
              )}
              {icon === 'help' && (
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${activeMenu ? 'bg-[#ff6767]' : 'bg-white/30'
                  }`}>
                  <span className="text-xs font-bold text-white">?</span>
                </div>
              )}
              <span className={`text-lg ${activeMenu ? 'text-[#ff6767] font-medium' : 'text-white'
                }`}>{label}</span>
            </button>
          })}
        </nav>


        <button
          onClick={() => handleClick('logout', 'logout')}
          className={`absolute left-4  right-4  bottom-4 flex items-center space-x-3 p-4 rounded-xl transition-colors `}
        >
          <CheckSquare />
          <span className="text-lg">Log out</span>
        </button>
      </div>
    </div>
  );
}
