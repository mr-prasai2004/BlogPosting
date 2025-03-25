import React, { useState } from 'react';
import { Home, LogIn, UserPlus, Layout, User, Settings, Pen } from 'lucide-react';

// Layout Component
const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`${isSidebarOpen ? 'block' : 'hidden'} text-2xl font-bold text-gray-800`}>BlogSpace</h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {isSidebarOpen ? '←' : '→'}
          </button>
        </div>
        <nav className="mt-10">
          <SidebarItem icon={<Home />} text="Dashboard" isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={<Pen />} text="Create Post" isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={<User />} text="Profile" isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={<Settings />} text="Settings" isSidebarOpen={isSidebarOpen} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-md p-4 flex justify-end items-center">
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <img 
              src="/api/placeholder/40/40" 
              alt="Profile" 
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;