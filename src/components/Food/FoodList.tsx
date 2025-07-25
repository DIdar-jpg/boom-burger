import React from 'react';
import FoodCard from './FoodCard';

import cardPic from '@/assets/card-1.png'

const foodData = [
  { 
    name: 'Чизбургер',
    price: 250,
    id: '22', 
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus repellat quaerat, perspiciatis perferendis sequi', 
    quantity: 1, 
    weight: 200, 
    imageUrl: cardPic, 
    category: 'Бургер' 
  },
  { 
    name: 'Пепперони',
    price: 250,
    id: '22', 
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus repellat quaerat, perspiciatis perferendis sequi', 
    quantity: 1, 
    weight: 200, 
    imageUrl: cardPic, 
    category: 'Пицца' 
  },
  { 
    name: 'Хот-дог XXL',
    price: 250,
    id: '22', 
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus repellat quaerat, perspiciatis perferendis sequi', 
    quantity: 1, 
    weight: 200, 
    imageUrl: cardPic, 
    category: 'Хотдоги' 
  },
  { 
    name: 'Фри + Наггетсы',
    price: 250,
    id: '22', 
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus repellat quaerat, perspiciatis perferendis sequi', 
    quantity: 1, 
    weight: 200, 
    imageUrl: cardPic, 
    category: 'Фастфуд' 
  },
  { 
    name: 'Двойной бургер',
    price: 250,
    id: '22', 
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus repellat quaerat, perspiciatis perferendis sequi', 
    quantity: 1, 
    weight: 200, 
    imageUrl: cardPic, 
    category: 'Бургер' 
  },
  { 
    name: 'Маргарита',
    price: 250,
    id: '22', 
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus repellat quaerat, perspiciatis perferendis sequi', 
    quantity: 1, 
    weight: 200, 
    imageUrl: cardPic, 
    category: 'Пицца' 
  }
]

interface FoodListProps {
  selectedCategory: string;
}

const FoodList: React.FC<FoodListProps> = ({selectedCategory}) => {

  const filteredFood = foodData.filter(food => food.category === selectedCategory);

  return (
    <div className='flex w-full flex-wrap items-center gap-4 justify-evenly my-8 md:gap-8'>
      {filteredFood.map((food, index) => <FoodCard key={index} {...food} /> )}
    </div>
  );
};
export default FoodList