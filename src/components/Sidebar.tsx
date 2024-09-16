'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Home, FolderOpen, Settings, Code, ChevronRight, ChevronLeft } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`relative bg-white h-full border-r border-gray-200 transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}>
      <button 
        onClick={toggleSidebar} 
        className="absolute -right-4 top-4 bg-white text-gray-700 hover:bg-gray-100 p-2 rounded-full border border-gray-200 transition-colors duration-150 z-10"
      >
        {isExpanded ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
      </button>
      <ul className="space-y-2 mt-12 p-3">
        <li>
          <Link href="/" className="flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded transition-colors duration-150">
            <Home className="w-6 h-6 min-w-[24px]" />
            {isExpanded && <span className="ml-3">Home</span>}
          </Link>
        </li>
        <li>
          <Link href="/projects" className="flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded transition-colors duration-150">
            <FolderOpen className="w-6 h-6 min-w-[24px]" />
            {isExpanded && <span className="ml-3">Projects</span>}
          </Link>
        </li>
        <li>
          <Link href="/problems" className="flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded transition-colors duration-150">
            <Code className="w-6 h-6 min-w-[24px]" />
            {isExpanded && <span className="ml-3">Problems</span>}
          </Link>
        </li>
        <li>
          <Link href="/settings" className="flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded transition-colors duration-150">
            <Settings className="w-6 h-6 min-w-[24px]" />
            {isExpanded && <span className="ml-3">Settings</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;