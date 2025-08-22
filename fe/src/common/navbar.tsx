import { Search, Bell, Menu } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onSearch?: (query: string) => void;
  onMenuItemClick: () => void;
}

export default function Navbar({ onSearch, onMenuItemClick }: NavbarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 relative">
      <div className="flex items-center flex-start ">
        {/* Left side - Title */}
        <div className="flex items-center w-4 md:w-64">
        <button 
            onClick={onMenuItemClick} 
            className="block lg:hidden mr-3 p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <h5 className="text-2xl font-bold hidden lg:block">
            <span className="text-red-400">Dash</span>
            <span className="text-gray-800">board</span>
          </h5>
        </div>

        {/* Center - Search Input */}
        <div className="flex-1 max-w-2xl mx-8 ps-8">
          <div className="relative flex items-center border-2 border-blue-400 rounded-xl overflow-hidden shadow-xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Paste youtube video url here..."
              className="w-full pl-4 pr-16 py-2 bg-white text-gray-600 placeholder-gray-400 focus:outline-none border-0"
            />

            <div
              onClick={handleSearch}
              className="absolute right-1 top-1 bottom-1 px-4 bg-red-400 hover:bg-red-500 text-white cursor-pointer rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <Search className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm font-light select-none">
          Created by: Rei Koleci
        </div>

      </div>
    </nav>
  );
}