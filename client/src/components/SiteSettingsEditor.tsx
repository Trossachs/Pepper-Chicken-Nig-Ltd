import React, { useState, useEffect } from 'react';
// @ts-ignore
import { 
  getSiteSettings, 
  updateLogoSettings, 
  updateFooterSettings, 
  updateHomePageSettings,
  updateAboutPageSettings
} from '@/lib/siteSettings';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from '@/components/ImageUploader';

type TabType = 'logo' | 'footer' | 'homepage' | 'about';

const SiteSettingsEditor: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>('logo');
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [editingSlideIndex, setEditingSlideIndex] = useState<number | null>(null);
  const [changesMade, setChangesMade] = useState<boolean>(false);
  const { toast } = useToast();

  // Load site settings
  useEffect(() => {
    const siteSettings = getSiteSettings();
    
    // Ensure aboutPage exists in settings
    if (!siteSettings.aboutPage) {
      siteSettings.aboutPage = {
        title: 'Our Story',
        paragraph1: 'Founded in 2008, Pepper Chicken Nigeria Ltd began as a small family-owned restaurant with a passion for authentic Nigerian cuisine. Our founder, Chef Adebayo, wanted to share his grandmother\'s recipes and the rich culinary traditions of Nigeria with the world.',
        paragraph2: 'What started as a modest establishment has now grown into one of the most respected Nigerian restaurants, known for our commitment to authentic flavors, quality ingredients, and exceptional service.',
        paragraph3: 'Today, we continue to honor our traditional recipes while innovating and creating new culinary experiences. Our chefs use only the freshest ingredients, and our spice blends are made in-house to ensure the most authentic taste of Nigeria.',
        image1: 'https://pixabay.com/get/g54c6587f346408284b8421f16ec7151c4122b207ced1466973d46d38851f08262170e010fab17d96a6c8dd3217c1a679c8686574dae3f76f1630d033e0a91475_1280.jpg',
        image2: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
      };
    }
    
    setSettings(siteSettings);
    setSocialLinks(siteSettings.footer.socialLinks || []);
    setHeroSlides(siteSettings.homePage.heroSlideImages || []);
  }, []);

  if (!settings) {
    return <div>Loading settings...</div>;
  }

  // Handler for logo settings changes
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedSettings = updateLogoSettings({
      [name]: value
    });
    setSettings(updatedSettings);
  };

  // Handler for footer text changes
  const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedSettings = updateFooterSettings({
      [name]: value
    });
    setSettings(updatedSettings);
  };

  // Handler for homepage settings changes
  const handleHomePageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedSettings = updateHomePageSettings({
      [name]: value
    });
    setSettings(updatedSettings);
  };
  
  // Handler for about page settings changes
  const handleAboutPageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedSettings = updateAboutPageSettings({
      [name]: value
    });
    setSettings(updatedSettings);
  };

  // Update a social link
  const handleSocialLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value
    };
    
    setSocialLinks(updatedLinks);
    const updatedSettings = updateFooterSettings({
      socialLinks: updatedLinks
    });
    setSettings(updatedSettings);
  };

  // Add a new social link
  const addSocialLink = () => {
    const newLink = { platform: 'facebook', url: 'https://facebook.com/' };
    const updatedLinks = [...socialLinks, newLink];
    
    setSocialLinks(updatedLinks);
    const updatedSettings = updateFooterSettings({
      socialLinks: updatedLinks
    });
    setSettings(updatedSettings);
    
    toast({
      title: "Social Link Added",
      description: "A new social media link has been added."
    });
  };

  // Remove a social link
  const removeSocialLink = (index: number) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    
    setSocialLinks(updatedLinks);
    const updatedSettings = updateFooterSettings({
      socialLinks: updatedLinks
    });
    setSettings(updatedSettings);
    
    toast({
      title: "Social Link Removed",
      description: "The social media link has been removed."
    });
  };

  // Add a new hero slide
  const addHeroSlide = () => {
    const newSlide = {
      title: 'New Slide',
      subtitle: 'Add a description for this slide',
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
      buttonText: 'Learn More',
      buttonLink: '/about',
      buttonColor: 'bg-wine-red'
    };
    
    const updatedSlides = [...heroSlides, newSlide];
    setHeroSlides(updatedSlides);
    
    const updatedSettings = updateHomePageSettings({
      heroSlideImages: updatedSlides
    });
    setSettings(updatedSettings);
    
    toast({
      title: "Slide Added",
      description: "A new hero slide has been added."
    });
  };

  // Remove a hero slide
  const removeHeroSlide = (index: number) => {
    const updatedSlides = heroSlides.filter((_, i) => i !== index);
    setHeroSlides(updatedSlides);
    
    const updatedSettings = updateHomePageSettings({
      heroSlideImages: updatedSlides
    });
    setSettings(updatedSettings);
    
    toast({
      title: "Slide Removed",
      description: "The hero slide has been removed."
    });
  };

  // Update a hero slide
  const updateHeroSlide = (index: number, field: string, value: any) => {
    const updatedSlides = [...heroSlides];
    updatedSlides[index] = {
      ...updatedSlides[index],
      [field]: value
    };
    
    setHeroSlides(updatedSlides);
    const updatedSettings = updateHomePageSettings({
      heroSlideImages: updatedSlides
    });
    setSettings(updatedSettings);
  };

  // Refresh page to show changes immediately
  const handleRefreshPage = () => {
    toast({
      title: "Settings Updated",
      description: "Your changes have been automatically saved and applied. The page will refresh to show all changes."
    });
    
    // Give the toast time to appear before refreshing
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900 mb-6 transition-colors duration-200">
      <h3 className="text-xl font-bold mb-6 dark:text-gray-100">Website Settings</h3>
      
      {/* Tabs */}
      <div className="border-b dark:border-gray-700 mb-6 transition-colors duration-200">
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 border-b-2 ${
              activeTab === 'logo'
                ? 'border-wine-red text-wine-red dark:text-red-400'
                : 'border-transparent hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100'
            } transition-colors duration-200`}
            onClick={() => setActiveTab('logo')}
          >
            Logo
          </button>
          <button
            className={`py-2 px-4 border-b-2 ${
              activeTab === 'footer'
                ? 'border-wine-red text-wine-red dark:text-red-400'
                : 'border-transparent hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100'
            } transition-colors duration-200`}
            onClick={() => setActiveTab('footer')}
          >
            Footer
          </button>
          <button
            className={`py-2 px-4 border-b-2 ${
              activeTab === 'homepage'
                ? 'border-wine-red text-wine-red dark:text-red-400'
                : 'border-transparent hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100'
            } transition-colors duration-200`}
            onClick={() => setActiveTab('homepage')}
          >
            Home Page
          </button>
          <button
            className={`py-2 px-4 border-b-2 ${
              activeTab === 'about'
                ? 'border-wine-red text-wine-red dark:text-red-400'
                : 'border-transparent hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100'
            } transition-colors duration-200`}
            onClick={() => setActiveTab('about')}
          >
            About Page
          </button>
        </div>
      </div>
      
      {/* Logo Settings Tab */}
      {activeTab === 'logo' && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Logo Text</label>
            <input
              type="text"
              name="text"
              value={settings.logo.text}
              onChange={handleLogoChange}
              className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
              placeholder="Logo Text"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Text displayed when no logo image is set
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Logo Image</label>
            <ImageUploader 
              onImageUploaded={(url) => {
                const updatedSettings = updateLogoSettings({
                  imageUrl: url
                });
                setSettings(updatedSettings);
                toast({
                  title: "Logo Updated",
                  description: "The logo image has been uploaded and set."
                });
              }}
              currentImage={settings.logo.imageUrl}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Upload an image for the logo or leave empty to use text logo instead
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Alt Text</label>
            <input
              type="text"
              name="altText"
              value={settings.logo.altText}
              onChange={handleLogoChange}
              className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
              placeholder="Pepper Chicken Logo"
            />
          </div>
          
          <div className="pt-4">
            <p className="text-sm font-medium mb-2 dark:text-gray-300">Preview:</p>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md transition-colors duration-200">
              {settings.logo.imageUrl ? (
                <img 
                  src={settings.logo.imageUrl} 
                  alt={settings.logo.altText} 
                  className="h-10" 
                />
              ) : (
                <div className="text-2xl font-bold dark:text-gray-100">
                  {settings.logo.text}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Footer Settings Tab */}
      {activeTab === 'footer' && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Copyright Text</label>
            <input
              type="text"
              name="copyrightText"
              value={settings.footer.copyrightText}
              onChange={handleFooterChange}
              className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
              placeholder="© Pepper Chicken Nig Ltd. All rights reserved."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Address</label>
            <input
              type="text"
              name="address"
              value={settings.footer.address}
              onChange={handleFooterChange}
              className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
              placeholder="123 Lekki Road, Lagos, Nigeria"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Phone</label>
            <input
              type="text"
              name="phone"
              value={settings.footer.phone}
              onChange={handleFooterChange}
              className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
              placeholder="+234 801 234 5678"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
            <input
              type="text"
              name="email"
              value={settings.footer.email}
              onChange={handleFooterChange}
              className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
              placeholder="info@pepperchicken.ng"
            />
          </div>
          
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium dark:text-gray-300">Social Media Links</label>
              <button
                onClick={addSocialLink}
                className="text-sm px-2 py-1 bg-dark-sky-blue text-white rounded hover:bg-opacity-90 transition-colors duration-200"
              >
                + Add Link
              </button>
            </div>
            
            {socialLinks.map((link, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <select
                  value={link.platform}
                  onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                  className="p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
                >
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                </select>
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                  className="flex-grow p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
                  placeholder="https://example.com/"
                />
                <button
                  onClick={() => removeSocialLink(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Home Page Settings Tab */}
      {activeTab === 'homepage' && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Hero Title</label>
            <input
              type="text"
              name="heroTitle"
              value={settings.homePage.heroTitle}
              onChange={handleHomePageChange}
              className="w-full p-2 border rounded-md"
              placeholder="Authentic Nigerian Cuisine"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Hero Subtitle</label>
            <input
              type="text"
              name="heroSubtitle"
              value={settings.homePage.heroSubtitle}
              onChange={handleHomePageChange}
              className="w-full p-2 border rounded-md"
              placeholder="Experience the rich flavors of Nigeria"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">CTA Button Text</label>
            <input
              type="text"
              name="ctaButtonText"
              value={settings.homePage.ctaButtonText}
              onChange={handleHomePageChange}
              className="w-full p-2 border rounded-md"
              placeholder="View Our Menu"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">CTA Button Link</label>
            <input
              type="text"
              name="ctaButtonLink"
              value={settings.homePage.ctaButtonLink}
              onChange={handleHomePageChange}
              className="w-full p-2 border rounded-md"
              placeholder="/menu"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Hero Banner Image</label>
            <ImageUploader 
              onImageUploaded={(url) => {
                const updatedSettings = updateHomePageSettings({
                  heroImageUrl: url
                });
                setSettings(updatedSettings);
                toast({
                  title: "Hero Image Updated",
                  description: "The hero banner image has been uploaded and set."
                });
              }}
              currentImage={settings.homePage.heroImageUrl}
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload an image for the hero banner section (recommended size: 1920x1080px)
            </p>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-lg font-medium">Hero Slide Images</label>
              <button
                onClick={addHeroSlide}
                className="text-sm px-2 py-1 bg-dark-sky-blue text-white rounded hover:bg-opacity-90"
              >
                + Add Slide
              </button>
            </div>
            
            <div className="space-y-6 mt-4">
              {heroSlides.map((slide, index) => (
                <div key={index} className="border dark:border-gray-600 rounded-md p-4 bg-gray-50 dark:bg-gray-700 relative transition-colors duration-200">
                  <button
                    onClick={() => removeHeroSlide(index)}
                    className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 bg-white dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-sm transition-colors duration-200"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                  
                  <h4 className="font-bold mb-3 dark:text-gray-200">Slide {index + 1}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => updateHeroSlide(index, 'title', e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder="Slide Title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={slide.subtitle}
                        onChange={(e) => updateHeroSlide(index, 'subtitle', e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder="Slide Subtitle"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Button Text</label>
                      <input
                        type="text"
                        value={slide.buttonText}
                        onChange={(e) => updateHeroSlide(index, 'buttonText', e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder="Explore Menu"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Button Link</label>
                      <input
                        type="text"
                        value={slide.buttonLink}
                        onChange={(e) => updateHeroSlide(index, 'buttonLink', e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder="/menu"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Button Color</label>
                      <select
                        value={slide.buttonColor}
                        onChange={(e) => updateHeroSlide(index, 'buttonColor', e.target.value)}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="bg-wine-red">Wine Red</option>
                        <option value="bg-dark-sky-blue">Sky Blue</option>
                        <option value="bg-green-600">Green</option>
                        <option value="bg-amber-600">Amber</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Slide Image</label>
                      <div className="flex items-start space-x-4">
                        <div className="flex-grow">
                          <ImageUploader 
                            onImageUploaded={(url) => updateHeroSlide(index, 'imageUrl', url)}
                            currentImage={slide.imageUrl}
                          />
                        </div>
                        {slide.imageUrl && (
                          <div className="w-24 h-24 overflow-hidden rounded border">
                            <img 
                              src={slide.imageUrl} 
                              alt={slide.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {heroSlides.length === 0 && (
                <div className="text-center py-8 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 transition-colors duration-200">
                  <p className="text-gray-500 dark:text-gray-400">No slides added yet. Click "Add Slide" to create your first hero slide.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-6 border-t dark:border-gray-700 transition-colors duration-200">
            <h4 className="text-lg font-medium mb-4 dark:text-gray-200">Other Sections</h4>
            
            <div>
              <label className="block text-sm font-medium mb-1">Featured Section Title</label>
              <input
                type="text"
                name="featuredSectionTitle"
                value={settings.homePage.featuredSectionTitle}
                onChange={handleHomePageChange}
                className="w-full p-2 border rounded-md"
                placeholder="Our Specialties"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Featured Section Subtitle</label>
              <input
                type="text"
                name="featuredSectionSubtitle"
                value={settings.homePage.featuredSectionSubtitle}
                onChange={handleHomePageChange}
                className="w-full p-2 border rounded-md"
                placeholder="Taste the best dishes from our kitchen"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Testimonials Section Title</label>
              <input
                type="text"
                name="testimonialsSectionTitle"
                value={settings.homePage.testimonialsSectionTitle}
                onChange={handleHomePageChange}
                className="w-full p-2 border rounded-md"
                placeholder="What Our Customers Say"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* About Page Settings Tab */}
      {activeTab === 'about' && (
        <div className="space-y-5">
          <div className="border-b pb-4 mb-6 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4 dark:text-gray-200">About Story Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Page Title</label>
                <input
                  type="text"
                  name="title"
                  value={settings.aboutPage.title}
                  onChange={handleAboutPageChange}
                  className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
                  placeholder="Our Story"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">First Paragraph</label>
                <textarea
                  name="paragraph1"
                  value={settings.aboutPage.paragraph1}
                  onChange={handleAboutPageChange}
                  className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200 min-h-[100px]"
                  placeholder="Write about the restaurant's history..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Second Paragraph</label>
                <textarea
                  name="paragraph2"
                  value={settings.aboutPage.paragraph2}
                  onChange={handleAboutPageChange}
                  className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200 min-h-[100px]"
                  placeholder="Write about the restaurant's growth..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Third Paragraph</label>
                <textarea
                  name="paragraph3"
                  value={settings.aboutPage.paragraph3}
                  onChange={handleAboutPageChange}
                  className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200 min-h-[100px]"
                  placeholder="Write about the restaurant's values and mission..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">First Image</label>
                <div className="flex flex-col space-y-2">
                  <ImageUploader 
                    onImageUploaded={(url) => {
                      const updatedSettings = updateAboutPageSettings({
                        image1: url
                      });
                      setSettings(updatedSettings);
                      toast({
                        title: "Image Updated",
                        description: "The first about page image has been uploaded and set."
                      });
                    }}
                    currentImage={settings.aboutPage.image1}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Recommended image size: 600x400px
                  </p>
                  {settings.aboutPage.image1 && (
                    <img 
                      src={settings.aboutPage.image1} 
                      alt="About page first image" 
                      className="w-full h-48 object-cover rounded-md mt-2" 
                    />
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Second Image</label>
                <div className="flex flex-col space-y-2">
                  <ImageUploader 
                    onImageUploaded={(url) => {
                      const updatedSettings = updateAboutPageSettings({
                        image2: url
                      });
                      setSettings(updatedSettings);
                      toast({
                        title: "Image Updated",
                        description: "The second about page image has been uploaded and set."
                      });
                    }}
                    currentImage={settings.aboutPage.image2}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Recommended image size: 600x400px
                  </p>
                  {settings.aboutPage.image2 && (
                    <img 
                      src={settings.aboutPage.image2} 
                      alt="About page second image" 
                      className="w-full h-48 object-cover rounded-md mt-2" 
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Visit Us Section */}
          <div className="border-b pb-4 mb-6 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4 dark:text-gray-200">Visit Us Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Section Title</label>
                <input
                  type="text"
                  name="visitTitle"
                  value={settings.aboutPage.visitTitle || 'Visit Us'}
                  onChange={handleAboutPageChange}
                  className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
                  placeholder="Visit Us"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Section Text</label>
                <textarea
                  name="visitText"
                  value={settings.aboutPage.visitText || 'We invite you to visit our restaurant and experience the warmth and flavors of Nigerian cuisine.'}
                  onChange={handleAboutPageChange}
                  className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200 min-h-[80px]"
                  placeholder="We invite you to visit our restaurant..."
                />
              </div>
            </div>
          </div>
          
          {/* Opening Hours Section */}
          <div className="border-b pb-4 mb-6 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4 dark:text-gray-200">Opening Hours</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Section Title</label>
                <input
                  type="text"
                  name="hoursTitle"
                  value={settings.aboutPage.hoursTitle || 'Opening Hours'}
                  onChange={handleAboutPageChange}
                  className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
                  placeholder="Opening Hours"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Monday - Thursday</label>
                <input
                  type="text"
                  name="mondayToThursday"
                  value={settings.aboutPage.mondayToThursday || '11:00 AM - 10:00 PM'}
                  onChange={handleAboutPageChange}
                  className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
                  placeholder="11:00 AM - 10:00 PM"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Friday - Saturday</label>
                <input
                  type="text"
                  name="fridayToSaturday"
                  value={settings.aboutPage.fridayToSaturday || '11:00 AM - 11:00 PM'}
                  onChange={handleAboutPageChange}
                  className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
                  placeholder="11:00 AM - 11:00 PM"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Sunday</label>
                <input
                  type="text"
                  name="sunday"
                  value={settings.aboutPage.sunday || '12:00 PM - 9:00 PM'}
                  onChange={handleAboutPageChange}
                  className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
                  placeholder="12:00 PM - 9:00 PM"
                />
              </div>
            </div>
          </div>
          
          {/* Location Section */}
          <div>
            <h3 className="text-lg font-medium mb-4 dark:text-gray-200">Location Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Section Title</label>
                <input
                  type="text"
                  name="locationTitle"
                  value={settings.aboutPage.locationTitle || 'Location'}
                  onChange={handleAboutPageChange}
                  className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
                  placeholder="Location"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Address</label>
                <input
                  type="text"
                  name="address"
                  value={settings.aboutPage.address || '123 Lekki Road, Lagos, Nigeria'}
                  onChange={handleAboutPageChange}
                  className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
                  placeholder="123 Lekki Road, Lagos, Nigeria"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={settings.aboutPage.phone || '+234 801 234 5678'}
                  onChange={handleAboutPageChange}
                  className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
                  placeholder="+234 801 234 5678"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
                <input
                  type="text"
                  name="email"
                  value={settings.aboutPage.email || 'info@pepperchicken.ng'}
                  onChange={handleAboutPageChange}
                  className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
                  placeholder="info@pepperchicken.ng"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row justify-end items-center gap-3">
        <div className="text-sm text-gray-500 dark:text-gray-400 italic mr-auto">
          All changes are saved automatically
        </div>
        <button
          onClick={handleRefreshPage}
          className="px-4 py-2 bg-wine-red text-white rounded-md hover:bg-opacity-90 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          See Changes
        </button>
      </div>
    </div>
  );
};

export default SiteSettingsEditor;