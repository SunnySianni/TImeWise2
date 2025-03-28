'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Import icons
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu
  const [activeLink, setActiveLink] = useState<string>(''); // Track active link

  const handleLinkClick = (link: string) => {
    setActiveLink(link); // Set active link when clicked
    setIsOpen(false); // Close the menu on mobile
  };

  return (
    <nav className="bg-gray-900 shadow-lg p-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <Link href="/" className="text-white text-3xl font-semibold hover:text-blue-500">
          TimeWise
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link
            href="/"
            className={`text-gray-300 hover:text-white ${activeLink === 'timer' ? 'text-blue-500' : ''}`}
            onClick={() => handleLinkClick('timer')}
          >
            Timer
          </Link>
          <Link
            href="/settings"
            className={`text-gray-300 hover:text-white ${activeLink === 'settings' ? 'text-blue-500' : ''}`}
            onClick={() => handleLinkClick('settings')}
          >
            Settings
          </Link>
          <Link
            href="/achievements"
            className={`text-gray-300 hover:text-white ${activeLink === 'achievements' ? 'text-blue-500' : ''}`}
            onClick={() => handleLinkClick('achievements')}
          >
            Achievements
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)} // Toggle mobile menu state
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />} {/* Toggle menu icon */}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-gray-800 py-6 space-y-6">
          <Link
            href="/"
            className={`text-gray-300 hover:text-white ${activeLink === 'timer' ? 'text-blue-500' : ''}`}
            onClick={() => handleLinkClick('timer')}
          >
            Timer
          </Link>
          <Link
            href="/settings"
            className={`text-gray-300 hover:text-white ${activeLink === 'settings' ? 'text-blue-500' : ''}`}
            onClick={() => handleLinkClick('settings')}
          >
            Settings
          </Link>
          <Link
            href="/achievements"
            className={`text-gray-300 hover:text-white ${activeLink === 'achievements' ? 'text-blue-500' : ''}`}
            onClick={() => handleLinkClick('achievements')}
          >
            Achievements
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
