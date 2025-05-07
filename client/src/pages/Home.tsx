import React from 'react';
import HeroSlider from '@/components/HeroSlider';
import FeaturedDishes from '@/components/FeaturedDishes';
import Testimonials from '@/components/Testimonials';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSlider />
      <FeaturedDishes />
      <Testimonials />
    </div>
  );
};

export default Home;
