import { mealsDatabase, substitutionsDatabase } from './data/meals.js';

let currentContext = 'busy';
let currentDiet = 'None';
let currentPlan = [];
let dailyBudget = 20;

// DOM Elements
const contextBtns = document.querySelectorAll('.context-btn');
const dietBtns = document.querySelectorAll('.diet-btn');
const generateBtn = document.getElementById('generatePlanBtn');
const budgetInput = document.getElementById('dailyBudget');
const mealCardsContainer = document.getElementById('mealCards');
const groceryItemsContainer = document.getElementById('groceryItems');
const budgetFill = document.getElementById('budgetFill');
const budgetStatus = document.getElementById('budgetStatus');
const aiLoadingOverlay = document.getElementById('aiLoadingOverlay');
const cookingTodoList = document.getElementById('cookingTodoList');
const todoContainer = document.getElementById('todoContainer');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  budgetInput.addEventListener('change', (e) => {
    dailyBudget = parseFloat(e.target.value) || 0;
    updateBudgetDisplay();
  });

  contextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      contextBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentContext = btn.dataset.context;
    });
  });

  dietBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dietBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDiet = btn.dataset.diet;
    });
  });

  generateBtn.addEventListener('click', handleGeneratePlan);
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.ingredient-tag')) {
      document.querySelectorAll('.sub-dropdown').forEach(dropdown => {
        dropdown.classList.remove('show');
      });
    }
  });
});

function handleGeneratePlan() {
  // Show AI loading overlay
  aiLoadingOverlay.classList.add('show');
  
  // Simulate AI Generation time (1.5s to 2.5s)
  const delay = Math.random() * 1000 + 1500;
  
  setTimeout(() => {
    generatePlan();
    aiLoadingOverlay.classList.remove('show');
  }, delay);
}

function generatePlan() {
  const filterMeals = (type) => {
    const filtered = mealsDatabase.filter(m => 
      m.type === type && 
      m.context.includes(currentContext) && 
      m.diets.includes(currentDiet)
    );
    // Fallback if no exact match for diet+context
    if (filtered.length === 0) {
      return mealsDatabase.filter(m => m.type === type && m.context.includes(currentContext));
    }
    return filtered;
  };

  const breakfastOptions = filterMeals('Breakfast');
  const lunchOptions = filterMeals('Lunch');
  const dinnerOptions = filterMeals('Dinner');

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  currentPlan = [
    JSON.parse(JSON.stringify(getRandom(breakfastOptions))),
    JSON.parse(JSON.stringify(getRandom(lunchOptions))),
    JSON.parse(JSON.stringify(getRandom(dinnerOptions)))
  ];

  renderPlan();
  renderTodoList();
}

function renderPlan() {
  mealCardsContainer.innerHTML = '';
  
  currentPlan.forEach((meal, mealIndex) => {
    const card = document.createElement('div');
    card.className = 'meal-card fade-in';
    card.style.animationDelay = `${mealIndex * 0.1}s`;

    let ingredientsHtml = meal.ingredients.map((ing, ingIndex) => {
      const subs = substitutionsDatabase[ing.name];
      let subBtnHtml = '';
      let dropdownHtml = '';
      
      if (subs && subs.length > 0) {
        subBtnHtml = `<button class="substitute-btn" data-meal-idx="${mealIndex}" data-ing-idx="${ingIndex}" title="Substitute ingredient">🔄</button>`;
        dropdownHtml = `<div class="sub-dropdown" id="dropdown-${mealIndex}-${ingIndex}">
          ${subs.map((sub, subIdx) => 
            `<button class="sub-option" data-meal-idx="${mealIndex}" data-ing-idx="${ingIndex}" data-sub-idx="${subIdx}">
              Swap with ${sub.name} ($${sub.price.toFixed(2)})
            </button>`
          ).join('')}
        </div>`;
      }

      return `
        <div class="ingredient-tag">
          ${ing.name}
          ${subBtnHtml}
          ${dropdownHtml}
        </div>
      `;
    }).join('');

    card.innerHTML = `
      <img src="${meal.image}" alt="${meal.name}" class="meal-image">
      <div class="meal-info">
        <div class="meal-header">
          <span class="meal-type">${meal.type}</span>
          <span>⏱️ ${meal.time}m</span>
        </div>
        <h3 class="meal-title">${meal.name}</h3>
        <div class="meal-meta">🔥 ${meal.calories} kcal</div>
        <div class="meal-ingredients">
          ${ingredientsHtml}
        </div>
      </div>
    `;
    
    mealCardsContainer.appendChild(card);
  });

  // Attach substitute event listeners
  document.querySelectorAll('.substitute-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mealIdx = btn.dataset.mealIdx;
      const ingIdx = btn.dataset.ingIdx;
      
      // Close all other dropdowns
      document.querySelectorAll('.sub-dropdown').forEach(dropdown => {
        if (dropdown.id !== `dropdown-${mealIdx}-${ingIdx}`) {
          dropdown.classList.remove('show');
        }
      });
      
      // Toggle current dropdown
      const dropdown = document.getElementById(`dropdown-${mealIdx}-${ingIdx}`);
      dropdown.classList.toggle('show');
    });
  });

  document.querySelectorAll('.sub-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const mealIdx = option.dataset.mealIdx;
      const ingIdx = option.dataset.ingIdx;
      const subIdx = option.dataset.subIdx;
      
      const meal = currentPlan[mealIdx];
      const oldIng = meal.ingredients[ingIdx];
      const newIng = substitutionsDatabase[oldIng.name][subIdx];
      
      // Update ingredient in state
      meal.ingredients[ingIdx] = { ...newIng };
      
      // Re-render
      renderPlan();
    });
  });

  updateGroceryAndBudget();
}

function renderTodoList() {
  todoContainer.innerHTML = '';
  cookingTodoList.style.display = 'block';

  currentPlan.forEach((meal, mealIndex) => {
    if (!meal.steps || meal.steps.length === 0) return;
    
    const section = document.createElement('div');
    section.className = 'todo-meal-section fade-in';
    section.style.animationDelay = `${mealIndex * 0.15}s`;
    
    let stepsHtml = meal.steps.map((step, stepIndex) => `
      <label class="todo-item">
        <input type="checkbox">
        <span class="todo-text">${step}</span>
      </label>
    `).join('');
    
    section.innerHTML = `
      <h3>${meal.type}: ${meal.name}</h3>
      ${stepsHtml}
    `;
    
    todoContainer.appendChild(section);
  });
}

function updateGroceryAndBudget() {
  const allIngredients = currentPlan.flatMap(meal => meal.ingredients);
  
  // Aggregate items
  const groceryMap = new Map();
  let totalCost = 0;
  
  allIngredients.forEach(ing => {
    if (groceryMap.has(ing.name)) {
      const current = groceryMap.get(ing.name);
      groceryMap.set(ing.name, { count: current.count + 1, price: current.price + ing.price });
    } else {
      groceryMap.set(ing.name, { count: 1, price: ing.price });
    }
    totalCost += ing.price;
  });

  // Render Grocery List
  groceryItemsContainer.innerHTML = '';
  if (groceryMap.size === 0) {
    groceryItemsContainer.innerHTML = '<li style="color: var(--text-muted); font-size: 0.9rem;">No items yet.</li>';
  } else {
    for (let [name, data] of groceryMap) {
      const li = document.createElement('li');
      li.className = 'grocery-item fade-in';
      li.innerHTML = `
        <span>${name} ${data.count > 1 ? `x${data.count}` : ''}</span>
        <span class="item-price">$${data.price.toFixed(2)}</span>
      `;
      groceryItemsContainer.appendChild(li);
    }
  }

  // Update Budget
  updateBudgetDisplay(totalCost);
}

function updateBudgetDisplay(cost = null) {
  // If cost is null, calculate it from currentPlan
  let currentCost = cost;
  if (currentCost === null) {
    currentCost = currentPlan.reduce((sum, meal) => 
      sum + meal.ingredients.reduce((mSum, ing) => mSum + ing.price, 0)
    , 0);
  }

  const percentage = Math.min((currentCost / dailyBudget) * 100, 100);
  budgetFill.style.width = `${percentage}%`;
  
  if (currentCost > dailyBudget) {
    budgetFill.classList.add('over');
  } else {
    budgetFill.classList.remove('over');
  }

  budgetStatus.innerHTML = `$${currentCost.toFixed(2)} / $${dailyBudget.toFixed(2)}`;
}
