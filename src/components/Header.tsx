import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Code2, Download, MapPin, Clock, Calendar } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import AvailabilityCalendar from './AvailabilityCalendar';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAvailable, setIsAvailable] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);

          // Calculate scroll progress
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = (window.scrollY / totalScroll) * 100;
          setScrollProgress(Math.min(currentProgress, 100));

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update time and availability status (reduce update frequency to 30s)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);

      // Availability logic (9 AM - 6 PM local time)
      const hour = now.getHours();
      setIsAvailable(hour >= 9 && hour < 18);
    };

    // Initial update
    updateTime();

    // Update every 30 seconds instead of every second for better performance
    const timer = setInterval(updateTime, 30000);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const downloadResume = () => {
    // Create a temporary download link - you'll need to add your actual resume file
    const link = document.createElement('a');
    link.href = '/resume/Adil_Omer_Resume.pdf'; // Add your resume file to public/resume/
    link.download = 'Adil_Omer_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const navItems = [
    { id: 'about', label: 'About', icon: '👨‍💻' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'contact', label: 'Contact', icon: '📬' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <div className="ml-3">
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                Adil Omer
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Software Engineer
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <span className="text-sm group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Status & Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Availability Status */}
            <button
              onClick={() => setShowCalendar(true)}
              className="flex items-center gap-2 px-3 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-200 transform hover:scale-105"
            >
              <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                {isAvailable ? 'Available' : 'Busy'}
              </span>
              <Calendar className="h-3 w-3 text-gray-500" />
            </button>

            {/* Time & Location */}
            <div className="flex items-center gap-2 px-3 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700">
              <Clock className="h-3 w-3 text-gray-500" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                {formatTime(currentTime)}
              </span>
              <MapPin className="h-3 w-3 text-gray-500 ml-1" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                UAE
              </span>
            </div>

            {/* Resume Download */}
            <button
              onClick={downloadResume}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Download className="h-4 w-4 group-hover:animate-bounce" />
              <span className="text-sm">Resume</span>
            </button>
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="group p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-110"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-200" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 group-hover:text-blue-600 transition-colors duration-200" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden group p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-110"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-red-500 transition-colors duration-200" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 rounded-b-lg shadow-lg">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-center gap-3 w-full text-left px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 rounded-lg"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Status Info */}
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => setShowCalendar(true)}
                    className="flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200"
                  >
                    <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {isAvailable ? 'Available for work' : 'Currently busy'}
                    </span>
                    <Calendar className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {formatTime(currentTime)} UAE
                  </span>
                </div>

                <button
                  onClick={downloadResume}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 opacity-0 transition-opacity duration-300" 
           style={{ opacity: isScrolled ? 1 : 0 }}>
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Availability Calendar Modal */}
      <AvailabilityCalendar 
        isVisible={showCalendar} 
        onClose={() => setShowCalendar(false)} 
      />
    </header>
  );
};

export default Header;