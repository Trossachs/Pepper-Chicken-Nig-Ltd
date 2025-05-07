import React from 'react';
import { Link } from 'wouter';
import { meals } from '@/data/meals';

const FeaturedDishes: React.FC = () => {
  // Get the first 3 featured meals
  const featuredMeals = meals
    .filter(meal => meal.featured)
    .slice(0, 3);

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title dark:text-gray-100">
            Our Signature <span>Dishes</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Discover our most beloved authentic Nigerian dishes prepared with traditional techniques and the freshest ingredients
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredMeals.map((meal) => (
            <div key={meal.id} className="menu-card dark:bg-gray-800 dark:shadow-xl transition-colors duration-200">
              <img 
                src={meal.image} 
                alt={meal.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold font-playfair mb-2 text-wine-red">{meal.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{meal.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-dark-text dark:text-gray-200 font-bold">₦{meal.price.toLocaleString()}</span>
                  <button className="secondary-btn">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/menu" className="primary-btn inline-block px-8 py-3">
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
