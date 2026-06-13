export const mealsDatabase = [
  {
    id: 'm1',
    name: 'Avocado Toast & Egg',
    type: 'Breakfast',
    context: ['busy', 'workout', 'lazy'],
    ingredients: [
      { name: 'Bread', price: 1.5 },
      { name: 'Avocado', price: 2.0 },
      { name: 'Eggs', price: 0.5 }
    ],
    calories: 450,
    time: 10,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&q=80'
  },
  {
    id: 'm2',
    name: 'Protein Oatmeal',
    type: 'Breakfast',
    context: ['workout'],
    ingredients: [
      { name: 'Oats', price: 0.8 },
      { name: 'Protein Powder', price: 1.5 },
      { name: 'Milk', price: 0.5 }
    ],
    calories: 550,
    time: 5,
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&q=80'
  },
  {
    id: 'm3',
    name: 'Lazy Sunday Pancakes',
    type: 'Breakfast',
    context: ['lazy'],
    ingredients: [
      { name: 'Pancake Mix', price: 1.0 },
      { name: 'Maple Syrup', price: 0.5 },
      { name: 'Butter', price: 0.3 }
    ],
    calories: 700,
    time: 20,
    image: 'https://images.unsplash.com/photo-1554520735-0a1429b13173?w=500&q=80'
  },
  {
    id: 'm4',
    name: 'Quick Salad Bowl',
    type: 'Lunch',
    context: ['busy'],
    ingredients: [
      { name: 'Mixed Greens', price: 2.0 },
      { name: 'Cherry Tomatoes', price: 1.0 },
      { name: 'Grilled Chicken', price: 3.5 }
    ],
    calories: 350,
    time: 5,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80'
  },
  {
    id: 'm5',
    name: 'Chicken Rice Bowl',
    type: 'Lunch',
    context: ['workout'],
    ingredients: [
      { name: 'Rice', price: 0.5 },
      { name: 'Chicken Breast', price: 3.5 },
      { name: 'Broccoli', price: 1.5 }
    ],
    calories: 600,
    time: 15,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80'
  },
  {
    id: 'm6',
    name: 'Comfort Mac & Cheese',
    type: 'Lunch',
    context: ['lazy'],
    ingredients: [
      { name: 'Macaroni', price: 1.0 },
      { name: 'Cheddar Cheese', price: 2.0 },
      { name: 'Milk', price: 0.5 }
    ],
    calories: 800,
    time: 20,
    image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=500&q=80'
  },
  {
    id: 'm7',
    name: 'Sheet Pan Salmon',
    type: 'Dinner',
    context: ['busy', 'workout'],
    ingredients: [
      { name: 'Salmon Filet', price: 5.0 },
      { name: 'Asparagus', price: 2.5 },
      { name: 'Lemon', price: 0.5 }
    ],
    calories: 500,
    time: 25,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80'
  },
  {
    id: 'm8',
    name: 'Steak & Sweet Potato',
    type: 'Dinner',
    context: ['workout'],
    ingredients: [
      { name: 'Steak', price: 7.0 },
      { name: 'Sweet Potato', price: 1.0 },
      { name: 'Green Beans', price: 1.5 }
    ],
    calories: 800,
    time: 30,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&q=80'
  },
  {
    id: 'm9',
    name: 'Homemade Pizza',
    type: 'Dinner',
    context: ['lazy'],
    ingredients: [
      { name: 'Pizza Dough', price: 2.0 },
      { name: 'Tomato Sauce', price: 1.0 },
      { name: 'Mozzarella', price: 3.0 },
      { name: 'Pepperoni', price: 2.5 }
    ],
    calories: 1200,
    time: 40,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80'
  }
];

export const substitutionsDatabase = {
  'Bread': [
    { name: 'Gluten-Free Bread', price: 2.5 },
    { name: 'Rice Cakes', price: 1.0 }
  ],
  'Milk': [
    { name: 'Almond Milk', price: 1.5 },
    { name: 'Oat Milk', price: 2.0 }
  ],
  'Eggs': [
    { name: 'Tofu Scramble', price: 1.5 },
    { name: 'Flax Egg', price: 0.5 }
  ],
  'Grilled Chicken': [
    { name: 'Tofu', price: 2.0 },
    { name: 'Chickpeas', price: 1.0 }
  ],
  'Chicken Breast': [
    { name: 'Tempeh', price: 3.0 },
    { name: 'Lentils', price: 1.0 }
  ],
  'Steak': [
    { name: 'Portobello Mushroom', price: 2.5 },
    { name: 'Beyond Meat', price: 5.0 }
  ],
  'Salmon Filet': [
    { name: 'Tofu Filet', price: 2.5 },
    { name: 'White Fish', price: 4.0 }
  ]
};
