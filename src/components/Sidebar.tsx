'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, FolderOpen, Settings, Menu } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`bg-white h-full border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-36 sm:w-40 md:w-44 lg:w-48'
    }`}>
      <button
        className="md:hidden w-full p-3 text-gray-700 hover:bg-gray-100 transition-colors duration-150"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="w-6 h-6 mx-auto" />
      </button>
      <ul className="space-y-2 mt-4 p-3">
        <li>
          <Link href="/" className={`flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded transition-colors duration-150 ${
            isCollapsed ? 'justify-center' : ''
          }`}>
            <Home className={`w-6 h-6 ${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
            {!isCollapsed && <span className="text-sm">Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link href="/projects" className={`flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded transition-colors duration-150 ${
            isCollapsed ? 'justify-center' : ''
          }`}>
            <FolderOpen className={`w-6 h-6 ${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
            {!isCollapsed && <span className="text-sm">Projects</span>}
          </Link>
        </li>
        <li>
          <Link href="/settings" className={`flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded transition-colors duration-150 ${
            isCollapsed ? 'justify-center' : ''
          }`}>
            <Settings className={`w-6 h-6 ${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
            {!isCollapsed && <span className="text-sm">Settings</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;