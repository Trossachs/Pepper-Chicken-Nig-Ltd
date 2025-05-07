import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className={`p-2 rounded-full focus:outline-none transition-all duration-300 transform hover:scale-110 ${className} ${
        theme === 'dark' 
          ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600 hover:text-yellow-200' 
          : 'bg-blue-50 text-gray-700 hover:bg-blue-100'
      }`}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <i className="fas fa-sun text-lg animate-spin-slow"></i>
      ) : (
        <i className="fas fa-moon text-lg"></i>
      )}
    </button>
  );
};

export default ThemeToggle;