"use client"; // Mark the component as client-side

import { useState, useEffect } from "react"; // Import hooks
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Import global styles
import { AchievementsProvider } from "@/context/AchievementsContext"; // Import the AchievementsProvider
import NotificationSettings from "@/components/settings/NotificationSettings"; // Import NotificationSettings

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ThemeToggle = ({ onToggle }) => {
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

const SettingsPanel = ({ isOpen, onClose }) => {
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

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light"); // Default theme is light
  const [isSettingsOpen, setSettingsOpen] = useState(false); // State for settings panel

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // Store theme in localStorage
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleSettings = () => {
    setSettingsOpen((prev) => !prev);
  };

  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground p-6 relative">
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
            <AchievementsProvider>{children}</AchievementsProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
