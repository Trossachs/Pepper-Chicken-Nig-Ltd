import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { getSiteSettings } from '@/lib/siteSettings';

interface SlideProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  buttonColor: string;
}

// Default slides - will be replaced with settings if available
const defaultSlides: SlideProps[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: "Authentic Nigerian Cuisine",
    subtitle: "Experience the rich flavors and vibrant spices of Nigerian food at Pepper Chicken",
    buttonText: "Explore Our Menu",
    buttonLink: "/menu",
    buttonColor: "bg-wine-red"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: "Warm & Inviting Atmosphere",
    subtitle: "Join us for a memorable dining experience in our beautiful restaurant",
    buttonText: "Book a Table",
    buttonLink: "/contact",
    buttonColor: "bg-dark-sky-blue"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
    title: "Culinary Excellence",
    subtitle: "Our expert chefs bring passion and tradition to every dish",
    buttonText: "Our Story",
    buttonLink: "/about",
    buttonColor: "bg-wine-red"
  }
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [customizedSlides, setCustomizedSlides] = useState<SlideProps[]>(defaultSlides);

  // Load and apply site settings
  useEffect(() => {
    const siteSettings = getSiteSettings();
    const homePage = siteSettings.homePage;
    
    // Check if we have custom slides in settings
    if (homePage.heroSlideImages && homePage.heroSlideImages.length > 0) {
      // Use custom slides from settings
      setCustomizedSlides(homePage.heroSlideImages);
    } else {
      // Use default slides with possible customizations for the first slide
      const newSlides = [...defaultSlides];
      
      // Customize the first slide with basic site settings
      if (newSlides.length > 0) {
        // Update title and subtitle if available
        newSlides[0].title = homePage.heroTitle || newSlides[0].title;
        newSlides[0].subtitle = homePage.heroSubtitle || newSlides[0].subtitle;
        newSlides[0].buttonText = homePage.ctaButtonText || newSlides[0].buttonText;
        newSlides[0].buttonLink = homePage.ctaButtonLink || newSlides[0].buttonLink;
        
        // Use custom hero image if available
        if (homePage.heroImageUrl) {
          newSlides[0].imageUrl = homePage.heroImageUrl;
        }
      }
      
      setCustomizedSlides(newSlides);
    }
  }, []);

  useEffect(() => {
    if (customizedSlides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % customizedSlides.length);
      }, 5000);
  
      return () => clearInterval(interval);
    }
  }, [customizedSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[80vh] overflow-hidden">
      <div className="hero-slides w-full h-full">
        {customizedSlides.map((slide, index) => (
          <div 
            key={index}
            className={`hero-slide absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={index !== currentSlide}
          >
            <div className="absolute inset-0 bg-black opacity-40 dark:opacity-50 transition-opacity duration-200"></div>
            <img 
              src={slide.imageUrl} 
              alt={slide.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
              <h2 className="text-4xl md:text-6xl font-bold font-playfair text-white mb-4 animate-slide-down">
                {slide.title}
              </h2>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl animate-slide-up">
                {slide.subtitle}
              </p>
              <Link 
                href={slide.buttonLink}
                className={`${slide.buttonColor} text-white font-montserrat font-medium py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all hover:scale-105 animate-fade-in`}
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Hero Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {customizedSlides.map((_, index) => (
          <button 
            key={index}
            className={`hero-dot w-3 h-3 rounded-full bg-white transition-opacity ${
              index === currentSlide ? 'opacity-100' : 'opacity-50 hover:opacity-100'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
