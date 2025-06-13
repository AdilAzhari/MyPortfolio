import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Code2, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
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
                Alex Chen
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Software Engineer
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
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
              className="md:hidden group p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-110"
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
          <div className="md:hidden">
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;