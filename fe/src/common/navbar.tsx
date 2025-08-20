import { Search, Bell, Calendar, UserPlus, Menu } from 'lucide-react';

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start h-16">
          {/* Hamburger Menu Button (Mobile Only) + Logo */}
          <div className="flex items-center space-x-4    bg-red-400  ">
            {/* Hamburger menu button for mobile */} 
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
 
          </div>

          <div className='w-64 bg-white hidden lg:block'>
           <p className='text-black'> Dashboard</p>
          </div>

          {/* Search Bar - Full width on mobile, centered on desktop */}
          <div className="flex-1 md:flex-none md:w-96 mx-4 md:mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search your task here..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-400 focus:border-red-400 sm:text-sm"
              />
            </div>
          </div>

        
        </div>
      </div>

     
    </nav>
  );
}