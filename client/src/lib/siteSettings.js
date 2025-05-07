/**
 * Site Settings Manager
 * 
 * This file provides utilities for managing website appearance settings without a database
 * It stores configuration for footer, logo and home page display in localStorage
 */

// Storage key constants
const SITE_SETTINGS_KEY = 'pepper_chicken_site_settings';

// Default site settings
const DEFAULT_SITE_SETTINGS = {
  // Logo settings
  logo: {
    text: 'Pepper Chicken',
    imageUrl: '', // If empty, text will be used
    altText: 'Pepper Chicken Restaurant Logo'
  },
  
  // Footer settings
  footer: {
    copyrightText: '© Pepper Chicken Nig Ltd. All rights reserved.',
    address: '123 Lekki Road, Lagos, Nigeria',
    phone: '+234 801 234 5678',
    email: 'info@pepperchicken.ng',
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com/pepperchicken' },
      { platform: 'instagram', url: 'https://instagram.com/pepperchicken' },
      { platform: 'twitter', url: 'https://twitter.com/pepperchicken' }
    ]
  },
  
  // About page settings
  aboutPage: {
    title: 'Our Story',
    paragraph1: 'Founded in 2008, Pepper Chicken Nigeria Ltd began as a small family-owned restaurant with a passion for authentic Nigerian cuisine. Our founder, Chef Adebayo, wanted to share his grandmother\'s recipes and the rich culinary traditions of Nigeria with the world.',
    paragraph2: 'What started as a modest establishment has now grown into one of the most respected Nigerian restaurants, known for our commitment to authentic flavors, quality ingredients, and exceptional service.',
    paragraph3: 'Today, we continue to honor our traditional recipes while innovating and creating new culinary experiences. Our chefs use only the freshest ingredients, and our spice blends are made in-house to ensure the most authentic taste of Nigeria.',
    image1: 'https://pixabay.com/get/g54c6587f346408284b8421f16ec7151c4122b207ced1466973d46d38851f08262170e010fab17d96a6c8dd3217c1a679c8686574dae3f76f1630d033e0a91475_1280.jpg',
    image2: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    // Visit Us section
    visitTitle: 'Visit Us',
    visitText: 'We invite you to visit our restaurant and experience the warmth and flavors of Nigerian cuisine. Our staff is ready to welcome you and provide an unforgettable dining experience.',
    // Opening Hours
    hoursTitle: 'Opening Hours',
    mondayToThursday: '11:00 AM - 10:00 PM',
    fridayToSaturday: '11:00 AM - 11:00 PM',
    sunday: '12:00 PM - 9:00 PM',
    // Location
    locationTitle: 'Location',
    address: '123 Lekki Road, Lagos, Nigeria',
    phone: '+234 801 234 5678',
    email: 'info@pepperchicken.ng'
  },
  
  // Home page settings
  homePage: {
    heroTitle: 'Authentic Nigerian Cuisine',
    heroSubtitle: 'Experience the rich flavors of Nigeria',
    heroImageUrl: '', // If empty, default image will be used
    heroSlideImages: [
      {
        title: 'Authentic Nigerian Cuisine',
        subtitle: 'Experience the rich flavors and vibrant spices of Nigerian food at Pepper Chicken',
        imageUrl: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
        buttonText: 'Explore Our Menu',
        buttonLink: '/menu',
        buttonColor: 'bg-wine-red'
      },
      {
        title: 'Warm & Inviting Atmosphere',
        subtitle: 'Join us for a memorable dining experience in our beautiful restaurant',
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
        buttonText: 'Book a Table',
        buttonLink: '/contact',
        buttonColor: 'bg-dark-sky-blue'
      },
      {
        title: 'Culinary Excellence',
        subtitle: 'Our expert chefs bring passion and tradition to every dish',
        imageUrl: 'https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
        buttonText: 'Our Story',
        buttonLink: '/about',
        buttonColor: 'bg-wine-red'
      }
    ],
    ctaButtonText: 'View Our Menu',
    ctaButtonLink: '/menu',
    featuredSectionTitle: 'Our Specialties',
    featuredSectionSubtitle: 'Taste the best dishes from our kitchen',
    testimonialsSectionTitle: 'What Our Customers Say'
  }
};

/**
 * Initialize site settings in localStorage if they don't exist,
 * or update them with any new properties from DEFAULT_SITE_SETTINGS
 */
export function initSiteSettings() {
  // Wrap localStorage access in try-catch to handle potential issues
  // (such as private browsing mode in Safari or localStorage being disabled)
  try {
    if (!localStorage.getItem(SITE_SETTINGS_KEY)) {
      localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(DEFAULT_SITE_SETTINGS));
    } else {
      // Check for and add any missing properties from the default settings
      const currentSettings = JSON.parse(localStorage.getItem(SITE_SETTINGS_KEY));
      let updatedSettings = false;
      
      // Recursive function to check for missing properties at any level of nesting
      const updateMissingProps = (current, defaults, path = '') => {
        if (typeof defaults !== 'object' || defaults === null) return;
        
        Object.keys(defaults).forEach(key => {
          // If property doesn't exist in current settings, add it
          if (current[key] === undefined) {
            current[key] = defaults[key];
            updatedSettings = true;
          } 
          // If property is an object (but not an array), recursively check its properties
          else if (
            typeof defaults[key] === 'object' && 
            defaults[key] !== null && 
            !Array.isArray(defaults[key]) && 
            typeof current[key] === 'object' && 
            current[key] !== null
          ) {
            updateMissingProps(current[key], defaults[key], `${path}.${key}`);
          }
        });
      };
      
      // Apply the recursive property check
      updateMissingProps(currentSettings, DEFAULT_SITE_SETTINGS);
      
      // If we added any properties, save the updated settings
      if (updatedSettings) {
        localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(currentSettings));
      }
    }
  } catch (error) {
    console.error('Error initializing site settings:', error);
    // Return the default settings if localStorage fails
    return DEFAULT_SITE_SETTINGS;
  }
}

/**
 * Get all site settings
 * @returns {Object} The site settings
 */
export function getSiteSettings() {
  try {
    const settingsData = localStorage.getItem(SITE_SETTINGS_KEY);
    if (!settingsData) return DEFAULT_SITE_SETTINGS;
    
    // Attempt to parse data, return defaults if parsing fails
    try {
      return JSON.parse(settingsData);
    } catch (parseError) {
      console.error('Error parsing site settings:', parseError);
      return DEFAULT_SITE_SETTINGS;
    }
  } catch (error) {
    // Handle localStorage access errors (e.g., in private browsing)
    console.error('Error accessing localStorage:', error);
    return DEFAULT_SITE_SETTINGS;
  }
}

/**
 * Update logo settings
 * @param {Object} updates - Logo settings to update
 * @returns {Object} Updated site settings
 */
export function updateLogoSettings(updates) {
  try {
    const settings = getSiteSettings();
    const updatedSettings = {
      ...settings,
      logo: {
        ...settings.logo,
        ...updates
      }
    };
    
    try {
      localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(updatedSettings));
    } catch (storageError) {
      console.error('Error saving logo settings to localStorage:', storageError);
    }
    
    return updatedSettings;
  } catch (error) {
    console.error('Error updating logo settings:', error);
    return DEFAULT_SITE_SETTINGS;
  }
}

/**
 * Update footer settings
 * @param {Object} updates - Footer settings to update
 * @returns {Object} Updated site settings
 */
export function updateFooterSettings(updates) {
  try {
    const settings = getSiteSettings();
    
    // Handle special case for social links which is an array
    let updatedFooter;
    
    if (updates.socialLinks) {
      updatedFooter = {
        ...settings.footer,
        ...updates,
        socialLinks: updates.socialLinks
      };
    } else {
      updatedFooter = {
        ...settings.footer,
        ...updates
      };
    }
    
    const updatedSettings = {
      ...settings,
      footer: updatedFooter
    };
    
    try {
      localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(updatedSettings));
    } catch (storageError) {
      console.error('Error saving footer settings to localStorage:', storageError);
    }
    
    return updatedSettings;
  } catch (error) {
    console.error('Error updating footer settings:', error);
    return DEFAULT_SITE_SETTINGS;
  }
}

/**
 * Update home page settings
 * @param {Object} updates - Home page settings to update
 * @returns {Object} Updated site settings
 */
export function updateHomePageSettings(updates) {
  try {
    const settings = getSiteSettings();
    const updatedSettings = {
      ...settings,
      homePage: {
        ...settings.homePage,
        ...updates
      }
    };
    
    try {
      localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(updatedSettings));
    } catch (storageError) {
      console.error('Error saving homepage settings to localStorage:', storageError);
    }
    
    return updatedSettings;
  } catch (error) {
    console.error('Error updating homepage settings:', error);
    return DEFAULT_SITE_SETTINGS;
  }
}

/**
 * Update about page settings
 * @param {Object} updates - About page settings to update
 * @returns {Object} Updated site settings
 */
export function updateAboutPageSettings(updates) {
  try {
    const settings = getSiteSettings();
    const updatedSettings = {
      ...settings,
      aboutPage: {
        ...settings.aboutPage,
        ...updates
      }
    };
    
    try {
      localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(updatedSettings));
    } catch (storageError) {
      console.error('Error saving about page settings to localStorage:', storageError);
    }
    
    return updatedSettings;
  } catch (error) {
    console.error('Error updating about page settings:', error);
    return DEFAULT_SITE_SETTINGS;
  }
}

/**
 * Reset site settings to defaults
 * @returns {Object} Default site settings
 */
export function resetSiteSettings() {
  try {
    localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(DEFAULT_SITE_SETTINGS));
  } catch (error) {
    console.error('Error resetting site settings:', error);
  }
  return DEFAULT_SITE_SETTINGS;
}

// Initialize site settings on import
initSiteSettings();