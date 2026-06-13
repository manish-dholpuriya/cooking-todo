import { mealsDatabase, substitutionsDatabase } from './data/meals.js';

let currentContext = 'busy';
let currentPlan = [];
let dailyBudget = 20;

// DOM Elements
const contextBtns = document.querySelectorAll('.context-btn');
const generateBtn = document.getElementById('generatePlanBtn');
const budgetInput = document.getElementById('dailyBudget');
const mealCardsContainer = document.getElementById('mealCards');
const groceryItemsContainer = document.getElementById('groceryItems');
const budgetFill = document.getElementById('budgetFill');
const budgetStatus = document.getElementById('budgetStatus');

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

  generateBtn.addEventListener('click', generatePlan);
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.ingredient-tag')) {
      document.querySelectorAll('.sub-dropdown').forEach(dropdown => {
        dropdown.classList.remove('show');
      });
    }
  });
});

function generatePlan() {
  const breakfastOptions = mealsDatabase.filter(m => m.type === 'Breakfast' && m.context.includes(currentContext));
  const lunchOptions = mealsDatabase.filter(m => m.type === 'Lunch' && m.context.includes(currentContext));
  const dinnerOptions = mealsDatabase.filter(m => m.type === 'Dinner' && m.context.includes(currentContext));

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Deep copy to allow per-session substitutions without altering DB
  currentPlan = [
    JSON.parse(JSON.stringify(getRandom(breakfastOptions))),
    JSON.parse(JSON.stringify(getRandom(lunchOptions))),
    JSON.parse(JSON.stringify(getRandom(dinnerOptions)))
  ];

  renderPlan();
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
