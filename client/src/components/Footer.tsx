import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { getSiteSettings } from '@/lib/siteSettings';

const Footer: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  
  useEffect(() => {
    // Load site settings
    const siteSettings = getSiteSettings();
    setSettings(siteSettings);
  }, []);
  
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    e.currentTarget.reset();
  };

  return (
    <footer className="bg-dark-text dark:bg-gray-900 text-white py-12 transition-colors duration-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold font-playfair mb-4">
              {settings?.logo?.imageUrl ? (
                <img 
                  src={settings.logo.imageUrl} 
                  alt={settings.logo.altText || "Pepper Chicken Logo"}
                  className="h-10"
                />
              ) : (
                <>{settings?.logo?.text || 'Pepper'}<span className="text-wine-red">Chicken</span></>
              )}
            </h2>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              Authentic Nigerian cuisine made with love and tradition. Experience the rich flavors of Nigeria at Pepper Chicken.
            </p>
            <div className="flex space-x-4">
              {settings?.footer?.socialLinks?.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  className="text-gray-300 dark:text-gray-400 hover:text-wine-red transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${link.platform}`}></i>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-wine-red">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/menu" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">Menu</Link></li>
              <li><Link href="/about" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-wine-red">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mr-2 mt-1 text-wine-red"></i>
                <span className="text-gray-300 dark:text-gray-400">{settings?.footer?.address || '24 Admiralty Way, Lekki Phase 1, Lagos'}</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mr-2 mt-1 text-wine-red"></i>
                <span className="text-gray-300 dark:text-gray-400">{settings?.footer?.phone || '+234 812 345 6789'}</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mr-2 mt-1 text-wine-red"></i>
                <span className="text-gray-300 dark:text-gray-400">{settings?.footer?.email || 'info@pepperchicken.ng'}</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-wine-red">Newsletter</h3>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for special offers, new dishes, and more!
            </p>
            <form className="flex" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow p-2 rounded-l-lg focus:outline-none text-dark-text dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 transition-colors duration-200"
                required
              />
              <button 
                type="submit"
                className="bg-wine-red text-white p-2 rounded-r-lg hover:bg-opacity-90 transition-colors"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 dark:border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>{settings?.footer?.copyrightText || `&copy; ${new Date().getFullYear()} Pepper Chicken Nigeria Ltd. All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
