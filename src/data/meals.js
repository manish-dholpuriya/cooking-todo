export const mealsDatabase = [
  {
    id: 'm1',
    name: 'Avocado Toast & Egg',
    type: 'Breakfast',
    context: ['busy', 'workout', 'lazy'],
    diets: ['None', 'Vegetarian', 'Dairy-Free'],
    ingredients: [
      { name: 'Bread', price: 1.5 },
      { name: 'Avocado', price: 2.0 },
      { name: 'Eggs', price: 0.5 }
    ],
    calories: 450,
    time: 10,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&q=80',
    steps: [
      "Toast the bread until golden brown.",
      "Mash the avocado in a small bowl with a pinch of salt and pepper.",
      "Fry or poach the egg to your liking.",
      "Spread avocado on toast and top with the egg."
    ]
  },
  {
    id: 'm2',
    name: 'Protein Oatmeal',
    type: 'Breakfast',
    context: ['workout'],
    diets: ['None', 'Vegan', 'Vegetarian', 'Gluten-Free'],
    ingredients: [
      { name: 'Oats', price: 0.8 },
      { name: 'Protein Powder', price: 1.5 },
      { name: 'Milk', price: 0.5 }
    ],
    calories: 550,
    time: 5,
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&q=80',
    steps: [
      "Bring milk to a simmer in a small pot.",
      "Stir in oats and reduce heat to low.",
      "Cook for 3-5 minutes until thickened.",
      "Remove from heat and stir in protein powder thoroughly."
    ]
  },
  {
    id: 'm3',
    name: 'Lazy Sunday Pancakes',
    type: 'Breakfast',
    context: ['lazy'],
    diets: ['None', 'Vegetarian'],
    ingredients: [
      { name: 'Pancake Mix', price: 1.0 },
      { name: 'Maple Syrup', price: 0.5 },
      { name: 'Butter', price: 0.3 }
    ],
    calories: 700,
    time: 20,
    image: 'https://images.unsplash.com/photo-1554520735-0a1429b13173?w=500&q=80',
    steps: [
      "Prepare pancake batter according to the mix instructions.",
      "Heat a non-stick skillet over medium heat and melt a little butter.",
      "Pour batter onto the skillet and cook until bubbles form, then flip.",
      "Serve warm with a pat of butter and maple syrup."
    ]
  },
  {
    id: 'm4',
    name: 'Quick Salad Bowl',
    type: 'Lunch',
    context: ['busy'],
    diets: ['None', 'Keto', 'Gluten-Free', 'Dairy-Free'],
    ingredients: [
      { name: 'Mixed Greens', price: 2.0 },
      { name: 'Cherry Tomatoes', price: 1.0 },
      { name: 'Grilled Chicken', price: 3.5 }
    ],
    calories: 350,
    time: 5,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80',
    steps: [
      "Wash and dry mixed greens.",
      "Halve the cherry tomatoes.",
      "Slice the grilled chicken into strips.",
      "Toss all ingredients in a bowl with your favorite dressing."
    ]
  },
  {
    id: 'm5',
    name: 'Chicken Rice Bowl',
    type: 'Lunch',
    context: ['workout'],
    diets: ['None', 'Gluten-Free', 'Dairy-Free'],
    ingredients: [
      { name: 'Rice', price: 0.5 },
      { name: 'Chicken Breast', price: 3.5 },
      { name: 'Broccoli', price: 1.5 }
    ],
    calories: 600,
    time: 15,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80',
    steps: [
      "Cook rice according to package instructions.",
      "Cut chicken breast into cubes and season well.",
      "Pan-fry chicken until cooked through and golden.",
      "Steam broccoli for 4-5 minutes until tender-crisp.",
      "Assemble bowl with rice, chicken, and broccoli."
    ]
  },
  {
    id: 'm6',
    name: 'Comfort Mac & Cheese',
    type: 'Lunch',
    context: ['lazy'],
    diets: ['None', 'Vegetarian'],
    ingredients: [
      { name: 'Macaroni', price: 1.0 },
      { name: 'Cheddar Cheese', price: 2.0 },
      { name: 'Milk', price: 0.5 }
    ],
    calories: 800,
    time: 20,
    image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=500&q=80',
    steps: [
      "Boil macaroni in salted water until al dente.",
      "Drain pasta and return to the warm pot.",
      "Stir in milk and freshly grated cheddar cheese.",
      "Mix continuously over low heat until cheese is melted and creamy."
    ]
  },
  {
    id: 'm7',
    name: 'Sheet Pan Salmon',
    type: 'Dinner',
    context: ['busy', 'workout'],
    diets: ['None', 'Keto', 'Gluten-Free', 'Dairy-Free'],
    ingredients: [
      { name: 'Salmon Filet', price: 5.0 },
      { name: 'Asparagus', price: 2.5 },
      { name: 'Lemon', price: 0.5 }
    ],
    calories: 500,
    time: 25,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80',
    steps: [
      "Preheat oven to 400°F (200°C).",
      "Place salmon filet and asparagus on a baking sheet lined with parchment paper.",
      "Drizzle with olive oil, salt, pepper, and lemon juice.",
      "Bake for 12-15 minutes until salmon is opaque and flakes easily."
    ]
  },
  {
    id: 'm8',
    name: 'Steak & Sweet Potato',
    type: 'Dinner',
    context: ['workout'],
    diets: ['None', 'Gluten-Free', 'Dairy-Free'],
    ingredients: [
      { name: 'Steak', price: 7.0 },
      { name: 'Sweet Potato', price: 1.0 },
      { name: 'Green Beans', price: 1.5 }
    ],
    calories: 800,
    time: 30,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&q=80',
    steps: [
      "Prick sweet potato with a fork and microwave for 5-7 minutes until soft.",
      "Season steak generously with salt and pepper.",
      "Sear steak in a hot skillet for 3-4 minutes per side for medium-rare.",
      "Let steak rest while sautéing green beans in the remaining pan juices.",
      "Slice steak and serve with sweet potato and beans."
    ]
  },
  {
    id: 'm9',
    name: 'Homemade Pizza',
    type: 'Dinner',
    context: ['lazy'],
    diets: ['None', 'Vegetarian'],
    ingredients: [
      { name: 'Pizza Dough', price: 2.0 },
      { name: 'Tomato Sauce', price: 1.0 },
      { name: 'Mozzarella', price: 3.0 },
      { name: 'Pepperoni', price: 2.5 }
    ],
    calories: 1200,
    time: 40,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80',
    steps: [
      "Preheat oven to 450°F (230°C).",
      "Stretch or roll out pizza dough onto a floured surface or baking sheet.",
      "Spread a thin layer of tomato sauce over the dough.",
      "Top with torn mozzarella and pepperoni slices.",
      "Bake for 12-15 minutes until crust is golden and cheese is bubbly."
    ]
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
