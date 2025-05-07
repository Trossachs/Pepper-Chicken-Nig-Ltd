import React from 'react';

interface TestimonialProps {
  quote: string;
  name: string;
  location: string;
  rating: number;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "The Jollof Rice and Chicken was absolutely delicious! It reminded me of my grandmother's cooking. Authentic Nigerian flavors that transported me back home.",
    name: "Chioma A.",
    location: "Lagos, Nigeria",
    rating: 5
  },
  {
    quote: "I brought my foreign colleagues here and they were blown away by the flavors. The Egusi soup with pounded yam was a massive hit! Great service and atmosphere too.",
    name: "Oluwaseun O.",
    location: "Abuja, Nigeria",
    rating: 5
  },
  {
    quote: "My first time trying Nigerian cuisine and I'm hooked! The staff was very helpful in explaining the menu. The Suya was perfectly spiced and the Zobo drink was refreshing.",
    name: "Michael T.",
    location: "London, UK",
    rating: 4.5
  }
];

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, name, location, rating }) => {
  // Create stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    return stars;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
      <div className="flex items-center mb-4">
        <div className="text-wine-red">
          {renderStars()}
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 italic mb-6">
        "{quote}"
      </p>
      <div className="flex items-center">
        <div>
          <h4 className="font-bold text-dark-text dark:text-gray-200">{name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-500">{location}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-bg dark:bg-gray-950 transition-colors duration-200">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title dark:text-gray-100">
            Customer <span>Testimonials</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            What our valued customers have to say about their dining experience at Pepper Chicken
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
