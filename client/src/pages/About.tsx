import React, { useState, useEffect } from 'react';
import AboutSection from '@/components/AboutSection';
// @ts-ignore
import { getSiteSettings } from '@/lib/siteSettings';

const About: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  
  useEffect(() => {
    // Load site settings
    const siteSettings = getSiteSettings();
    setSettings(siteSettings);
  }, []);

  // Default values in case settings aren't loaded yet
  const defaultAboutContent = {
    visitTitle: 'Visit Us',
    visitText: 'We invite you to visit our restaurant and experience the warmth and flavors of Nigerian cuisine. Our staff is ready to welcome you and provide an unforgettable dining experience.',
    hoursTitle: 'Opening Hours',
    mondayToThursday: '11:00 AM - 10:00 PM',
    fridayToSaturday: '11:00 AM - 11:00 PM',
    sunday: '12:00 PM - 9:00 PM',
    locationTitle: 'Location',
    address: '123 Lekki Road, Lagos, Nigeria',
    phone: '+234 801 234 5678',
    email: 'info@pepperchicken.ng'
  };
  
  // Use settings if available, otherwise use default content
  const aboutContent = settings?.aboutPage || defaultAboutContent;

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-wine-red dark:text-gray-200">
        About <span className="text-dark-sky-blue">Pepper Chicken</span>
      </h1>
      
      <AboutSection />
      
      <div className="mt-16 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors duration-200">
        <h2 className="text-2xl font-bold mb-4 dark:text-gray-200">{aboutContent.visitTitle}</h2>
        <p className="text-gray-700 dark:text-gray-400 mb-6">
          {aboutContent.visitText}
        </p>
        
        <div className="md:flex md:space-x-6">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-300">{aboutContent.hoursTitle}</h3>
            <table className="w-full text-gray-700 dark:text-gray-400">
              <tbody>
                <tr>
                  <td className="py-1">Monday - Thursday:</td>
                  <td className="py-1">{aboutContent.mondayToThursday}</td>
                </tr>
                <tr>
                  <td className="py-1">Friday - Saturday:</td>
                  <td className="py-1">{aboutContent.fridayToSaturday}</td>
                </tr>
                <tr>
                  <td className="py-1">Sunday:</td>
                  <td className="py-1">{aboutContent.sunday}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-300">{aboutContent.locationTitle}</h3>
            <p className="text-gray-700 dark:text-gray-400 mb-2">
              {aboutContent.address}
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              <strong>Phone:</strong> {aboutContent.phone}<br />
              <strong>Email:</strong> {aboutContent.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;