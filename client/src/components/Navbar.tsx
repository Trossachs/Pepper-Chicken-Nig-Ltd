import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { getSiteSettings } from '@/lib/siteSettings';
import ThemeToggle from '@/components/ThemeToggle';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [settings, setSettings] = useState<any>(null);
  
  useEffect(() => {
    // Load site settings
    const siteSettings = getSiteSettings();
    setSettings(siteSettings);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <nav className="container-custom py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            {settings?.logo?.imageUrl ? (
              <img 
                src={settings.logo.imageUrl} 
                alt={settings.logo.altText || "Pepper Chicken Logo"}
                className="h-10"
              />
            ) : (
              <h1 className="text-2xl md:text-3xl font-bold font-playfair text-wine-red dark:text-wine-red cursor-pointer">
                {settings?.logo?.text || 'Pepper Chicken'}
              </h1>
            )}
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 font-montserrat dark:text-gray-100">
          <Link href="/" className={`nav-link ${isActive('/') ? 'text-wine-red' : ''}`}>
            Home
          </Link>
          <Link href="/menu" className={`nav-link ${isActive('/menu') ? 'text-wine-red' : ''}`}>
            Menu
          </Link>
          <Link href="/about" className={`nav-link ${isActive('/about') ? 'text-wine-red' : ''}`}>
            About Us
          </Link>
          <Link href="/contact" className={`nav-link ${isActive('/contact') ? 'text-wine-red' : ''}`}>
            Contact
          </Link>
          <Link href="/admin" className={`nav-link opacity-50 hover:opacity-100 ${isActive('/admin') ? 'text-wine-red opacity-100' : ''}`}>
            <i className="fas fa-cog mr-1"></i>
            <span className="text-sm">Admin</span>
          </Link>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
        
        {/* Order Button */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle className="md:block hidden" />
          <Link href="/contact">
            <button className="primary-btn">
              Order Now
            </button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden text-dark-text focus:outline-none"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
        </button>
      </nav>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block animate-slide-down' : 'hidden'} bg-white dark:bg-gray-800 transition-colors duration-200`}>
        <div className="container-custom py-3 flex flex-col space-y-4 font-montserrat">
          <Link href="/" className="py-2 px-4 hover:bg-neutral-bg dark:hover:bg-gray-700 dark:text-gray-100 rounded transition-colors" onClick={closeMobileMenu}>
            Home
          </Link>
          <Link href="/menu" className="py-2 px-4 hover:bg-neutral-bg dark:hover:bg-gray-700 dark:text-gray-100 rounded transition-colors" onClick={closeMobileMenu}>
            Menu
          </Link>
          <Link href="/about" className="py-2 px-4 hover:bg-neutral-bg dark:hover:bg-gray-700 dark:text-gray-100 rounded transition-colors" onClick={closeMobileMenu}>
            About Us
          </Link>
          <Link href="/contact" className="py-2 px-4 hover:bg-neutral-bg dark:hover:bg-gray-700 dark:text-gray-100 rounded transition-colors" onClick={closeMobileMenu}>
            Contact
          </Link>
          <Link href="/admin" className="py-2 px-4 hover:bg-neutral-bg dark:hover:bg-gray-700 dark:text-gray-100 rounded transition-colors opacity-50" onClick={closeMobileMenu}>
            <i className="fas fa-cog mr-1"></i> Admin
          </Link>
          <div className="flex items-center px-4 py-2 dark:text-gray-100">
            <span className="mr-3">Theme:</span>
            <ThemeToggle />
          </div>
          <Link href="/contact" onClick={closeMobileMenu}>
            <button className="primary-btn self-start ml-4">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
