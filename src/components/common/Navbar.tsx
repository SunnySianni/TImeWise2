'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Import icons
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <Link href="/" className="text-white text-2xl font-bold">
          TimeWise
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-300 hover:text-white">Timer</Link>
          <Link href="/settings" className="text-gray-300 hover:text-white">Settings</Link>
          <Link href="/achievements" className="text-gray-300 hover:text-white">Achievements</Link>
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
        <div className="md:hidden flex flex-col items-center bg-gray-700 py-4 space-y-4">
          <Link href="/" className="text-gray-300 hover:text-white">Timer</Link>
          <Link href="/settings" className="text-gray-300 hover:text-white">Settings</Link>
          <Link href="/achievements" className="text-gray-300 hover:text-white">Achievements</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
