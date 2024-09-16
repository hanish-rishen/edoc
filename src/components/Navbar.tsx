"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ShinyButton from "@/components/magicui/shiny-button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border border-gray-200 relative">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-black text-2xl font-bold flex items-center py-4" onClick={closeMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span className="align-middle">edoc</span>
        </Link>
        <div className="flex items-center">
          <ul className="hidden lg:flex lg:items-center space-x-4">
            <li>
              <Link href="/" className="block text-gray-800 hover:text-gray-600 font-bold">Home</Link>
            </li>
            <li>
              <Link href="/editor" className="block text-gray-800 hover:text-gray-600 font-bold">Editor</Link>
            </li>
            <li>
              <Link href="/ai-coach" className="block text-gray-800 hover:text-gray-600 font-bold">AI Coach</Link>
            </li>
            <li>
              <Link href="/profile" className="block text-gray-800 hover:text-gray-600 font-bold">Profile</Link>
            </li>
            <li>
              <Link href="/signin">
                <ShinyButton text="Sign In" className="px-4 py-2 font-bold" />
              </Link>
            </li>
          </ul>
          <button
            className="lg:hidden text-gray-800 focus:outline-none ml-4"
            onClick={toggleMenu}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm"
          >
            <div className="flex flex-col h-full justify-center items-center">
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-gray-800"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <ul className="text-center">
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6"
                >
                  <Link href="/" className="text-3xl font-bold text-gray-800 hover:text-gray-600 transition-colors" onClick={closeMenu}>Home</Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <Link href="/editor" className="text-3xl font-bold text-gray-800 hover:text-gray-600 transition-colors" onClick={closeMenu}>Editor</Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <Link href="/ai-coach" className="text-3xl font-bold text-gray-800 hover:text-gray-600 transition-colors" onClick={closeMenu}>AI Coach</Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <Link href="/profile" className="text-3xl font-bold text-gray-800 hover:text-gray-600 transition-colors" onClick={closeMenu}>Profile</Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link href="/signin" onClick={closeMenu}>
                    <ShinyButton text="Sign In" className="px-6 py-3 text-2xl font-bold" />
                  </Link>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;