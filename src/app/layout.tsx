'use client'; // Mark this file as a client component

import { useState, useEffect, ReactNode } from "react"; // Import ReactNode for typing children
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Import global styles
import NotificationSettings from "@/components/settings/NotificationSettings"; // Import NotificationSettings
import Navbar from "@/components/common/Navbar"; // Import Navbar
import { AchievementsProvider } from "@/context/AchievementsContext"; // Import AchievementsProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define the type for the ThemeToggle props
interface ThemeToggleProps {
  onToggle: () => void; // onToggle is a function that takes no arguments and returns nothing
}

const ThemeToggle = ({ onToggle }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 p-3 rounded-full bg-primary text-white hover:bg-blue-600 transition-colors"
      aria-label="Toggle theme"
    >
      🌙 / 🌞
    </button>
  );
};

// Define the type for the SettingsPanel props
interface SettingsPanelProps {
  isOpen: boolean; // isOpen is a boolean
  onClose: () => void; // onClose is a function that takes no arguments and returns nothing
}

const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  return (
    <div
      className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 z-10`}
    >
      <button
        onClick={onClose}
        className="p-3 text-gray-600 hover:bg-gray-200"
        aria-label="Close settings"
      >
        ❌
      </button>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="space-y-4">
          <NotificationSettings />
        </div>
      </div>
    </div>
  );
};

// Define the type for the RootLayout props, including children
interface RootLayoutProps {
  children: ReactNode; // ReactNode type for children
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [theme, setTheme] = useState("light");
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  // Load saved theme from localStorage when component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Set the document theme and save it to localStorage whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Toggle settings panel visibility
  const toggleSettings = () => {
    setSettingsOpen((prev) => !prev);
  };

  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AchievementsProvider>
          <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground p-6 relative">
            {/* Navbar */}
            <Navbar />

            {/* Theme toggle button */}
            <ThemeToggle onToggle={toggleTheme} />

            {/* Settings button */}
            <button
              onClick={toggleSettings}
              className="fixed top-4 left-4 p-3 rounded-full bg-primary text-white hover:bg-blue-600 transition-colors"
              aria-label="Open settings"
            >
              ⚙️
            </button>

            {/* Settings panel */}
            <SettingsPanel isOpen={isSettingsOpen} onClose={toggleSettings} />

            {/* Main content */}
            <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-md z-0">
              {children}
            </div>
          </div>
        </AchievementsProvider>
      </body>
    </html>
  );
}
