import React, { useState } from 'react';

import FoodCategories from './FoodCategories.tsx'
import FoodList from './FoodList.tsx'

const Food: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('burger');
  return (
    <section className='container'>
      <FoodCategories onSelectCategory={setSelectedCategory} />
      <FoodList selectedCategory={selectedCategory} />
    </section>
  );
};
export default Food