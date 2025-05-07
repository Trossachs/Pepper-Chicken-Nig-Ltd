import React, { useState, useEffect, useRef } from 'react';
import { meals, MealType } from '@/data/meals';

type Category = 'all' | 'main' | 'soup' | 'sides' | 'drinks';

const categoryNames: Record<Category, string> = {
  all: 'All',
  main: 'Main Dishes',
  soup: 'Soups & Stews',
  sides: 'Sides',
  drinks: 'Drinks'
};

const MenuGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMeals, setFilteredMeals] = useState<MealType[]>(meals);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    filterMeals(searchTerm, activeCategory);
  }, [searchTerm, activeCategory]);

  const filterMeals = (term: string, category: Category) => {
    const filtered = meals.filter(meal => {
      const matchesSearch = 
        meal.name.toLowerCase().includes(term.toLowerCase()) || 
        meal.description.toLowerCase().includes(term.toLowerCase());
      
      const matchesCategory = category === 'all' || meal.category === category;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredMeals(filtered);
  };

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    // Apply animation class
    if (searchInputRef.current) {
      searchInputRef.current.classList.add('search-animation');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.classList.remove('search-animation');
        }
      }, 500);
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative flex items-center">
          <input 
            type="text" 
            id="menu-search" 
            ref={searchInputRef}
            placeholder="Search for dishes..." 
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full py-3 px-4 pr-12 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red transition-colors duration-200"
          />
          <i className="fas fa-search absolute right-4 text-gray-400"></i>
        </div>
      </div>
      
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center mb-8 max-w-2xl mx-auto">
        {Object.entries(categoryNames).map(([key, label]) => (
          <button 
            key={key}
            className={`px-6 py-2 m-1 rounded-full transition-colors ${
              activeCategory === key 
                ? 'bg-wine-red text-white' 
                : 'bg-white text-dark-text dark:bg-gray-800 dark:text-gray-200 hover:bg-wine-red hover:text-white'
            }`}
            onClick={() => handleCategoryChange(key as Category)}
          >
            {label}
          </button>
        ))}
      </div>
      
      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="menu-items">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <div 
              key={meal.id} 
              className="menu-card dark:bg-gray-800 animate-fade-in transition-colors duration-200" 
              data-category={meal.category}
            >
              <img 
                src={meal.image} 
                alt={meal.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold font-playfair text-dark-text dark:text-gray-100">{meal.name}</h3>
                  <span className="font-bold text-wine-red">₦{meal.price.toLocaleString()}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{meal.description}</p>
                <button className="w-full bg-dark-sky-blue text-white py-2 rounded hover:bg-opacity-90 transition-colors">
                  Add to Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
            <p className="text-xl text-gray-600 dark:text-gray-400">No menu items match your search. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuGrid;
