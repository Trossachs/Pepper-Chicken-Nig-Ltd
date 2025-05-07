import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { getSiteSettings } from '@/lib/siteSettings';

const AboutSection: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  
  useEffect(() => {
    // Load site settings
    const siteSettings = getSiteSettings();
    setSettings(siteSettings);
  }, []);

  // Ensure we have the default values even if settings or aboutPage is undefined
  const defaultAboutContent = {
    title: 'Our Story',
    paragraph1: 'Founded in 2008, Pepper Chicken Nigeria Ltd began as a small family-owned restaurant with a passion for authentic Nigerian cuisine. Our founder, Chef Adebayo, wanted to share his grandmother\'s recipes and the rich culinary traditions of Nigeria with the world.',
    paragraph2: 'What started as a modest establishment has now grown into one of the most respected Nigerian restaurants, known for our commitment to authentic flavors, quality ingredients, and exceptional service.',
    paragraph3: 'Today, we continue to honor our traditional recipes while innovating and creating new culinary experiences. Our chefs use only the freshest ingredients, and our spice blends are made in-house to ensure the most authentic taste of Nigeria.',
    image1: 'https://pixabay.com/get/g54c6587f346408284b8421f16ec7151c4122b207ced1466973d46d38851f08262170e010fab17d96a6c8dd3217c1a679c8686574dae3f76f1630d033e0a91475_1280.jpg',
    image2: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
  };
  
  // Use settings.aboutPage if available, otherwise use default content
  const aboutContent = settings?.aboutPage || defaultAboutContent;

  return (
    <div className="flex flex-col lg:flex-row items-center">
      <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
        <h2 className="section-title dark:text-gray-100">
          Our <span>{aboutContent.title.split(' ').slice(1).join(' ') || 'Story'}</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {aboutContent.paragraph1}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {aboutContent.paragraph2}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {aboutContent.paragraph3}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/contact" className="primary-btn">
            Contact Us
          </Link>
          <button className="outlined-btn dark:border-dark-sky-blue dark:text-dark-sky-blue dark:hover:bg-dark-sky-blue dark:hover:text-white">
            Read More
          </button>
        </div>
      </div>
      
      <div className="lg:w-1/2 grid grid-cols-2 gap-4">
        <img 
          src={aboutContent.image1} 
          alt="Our Chef Preparing Food" 
          className="rounded-lg shadow-md dark:shadow-lg dark:shadow-gray-800 w-full h-64 object-cover transition-shadow duration-200"
        />
        
        <img 
          src={aboutContent.image2} 
          alt="Our Restaurant Interior" 
          className="rounded-lg shadow-md dark:shadow-lg dark:shadow-gray-800 w-full h-64 object-cover mt-6 md:mt-12 transition-shadow duration-200"
        />
      </div>
    </div>
  );
};

export default AboutSection;
