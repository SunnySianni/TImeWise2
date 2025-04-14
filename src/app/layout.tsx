'use client'; // Mark this file as a client component

import { useState, useEffect, ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NotificationSettings from "@/components/settings/NotificationSettings";
import Navbar from "@/components/common/Navbar";
import { AchievementsProvider } from "@/context/AchievementsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🎨 Theme toggle component
interface ThemeToggleProps {
  onToggle: () => void;
}

const ThemeToggle = ({ onToggle }: ThemeToggleProps) => (
  <button
    onClick={onToggle}
    className="fixed top-4 right-4 p-3 rounded-full bg-primary text-white hover:bg-blue-600 transition-colors"
    aria-label="Toggle theme"
  >
    🌙 / 🌞
  </button>
);

// ⚙️ Settings panel component
interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => (
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

// 🧱 Root layout
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [theme, setTheme] = useState("light");
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleSettings = () => {
    setSettingsOpen((prev) => !prev);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AchievementsProvider>
          <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground p-6 relative">
            <Navbar />

            <ThemeToggle onToggle={toggleTheme} />

            <button
              onClick={toggleSettings}
              className="fixed top-4 left-4 p-3 rounded-full bg-primary text-white hover:bg-blue-600 transition-colors"
              aria-label="Open settings"
            >
              ⚙️
            </button>

            <SettingsPanel isOpen={isSettingsOpen} onClose={toggleSettings} />

            <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-md z-0">
              {children}
            </div>
          </div>
        </AchievementsProvider>
      </body>
    </html>
  );
}
