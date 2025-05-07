import React from 'react';
import MenuGrid from '@/components/MenuGrid';

const Menu: React.FC = () => {
  return (
    <section id="menu" className="py-16 bg-neutral-bg dark:bg-gray-900 transition-colors duration-200">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="section-title dark:text-gray-100">
            Our <span>Menu</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400 mb-8">
            Explore our extensive menu of authentic Nigerian dishes, prepared with love and tradition
          </p>
        </div>
        
        <MenuGrid />
      </div>
    </section>
  );
};

export default Menu;
