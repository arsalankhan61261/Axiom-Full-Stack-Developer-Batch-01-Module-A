// DOM Elements
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const generate = document.getElementById('generate');
const resultsHeading = document.getElementById('results-heading');
const meals = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');

// Function to search the meal using the API
function searchMeal(e) {
    //Prevent form submission and redirect
    e.preventDefault();
    // Get the value from search input field
    const searchText = search.value;
    // Check if search input field is empty
    if (searchText.trim()) {
        // console.log(searchText);
        // Fetch Data from API
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                // Update results Heading
                resultsHeading.innerHTML = `<h2>Search results for ${searchText}</h2>`
                // Check if any meals return from API
                if (data.meals === null) {
                resultsHeading.innerHTML = `<h2>Sorry no results found for ${searchText}</h2>`
                meals.innerHTML = '';
                } else {
                    meals.innerHTML = data.meals.map( meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `)
                    .join('')
                }
            });
        // Clear the search text
        search.value = '';
    } else {
        alert('Please enter search keyword')
    };
    // Remove previous selected meal info
    selectedMeal.innerHTML = '';
};

// Function to get details of selected meal
function getMeal(mealId) {
    // Fetch details of meal using the mealId
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const meal = data.meals[0]
        console.log(meal);

        // Render the UI
        displayMealDetails(meal);
    });
}

// Function to render meal details in UI
function displayMealDetails(meal) {
    // console.log(meal);
    // Clear search results
    meals.innerHTML = '';
    resultsHeading.innerHTML = '';

    // Array to hold ingredients & measurements
    const ingredients = [];
    // Loop over ingredients attributes
    for ( let i = 1; i <= 20; i++ ) {
        // Check if ingredient exists
        if ( meal[`strIngredient${i}`] ) {
            // Push all the ingredients and measurements into the ingredients array
            ingredients.push(`${meal[`strIngredient${i}`]}: ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    };
    console.log(ingredients);

    // Render data into UI
    selectedMeal.innerHTML = `
        <div class="selected-meal-details">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class"selected-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : '' }
                ${meal.strArea ? `<p>${meal.strArea}</p>` : '' }
            </div>
            <div class="selected-meal-instructions">
                <p>${meal.strInstructions}</p>
                <h3>Ingredients</h3>
                <ul>
                    ${ingredients.map( ingredient => `<li>${ingredient}</li>` ).join('')}
                </ul>
            </div>
        </div>
    `;
};

// Function to get the random meal using the API
function randomMeal() {
    // Clear search results
    meals.innerHTML = '';
    resultsHeading.innerHTML = '';
    // Remove previous selected meal info
    selectedMeal.innerHTML = '';

    // Fetch details of meal using the random meal API
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const mealName = data.meals[0].strMeal;
        console.log(mealName);
        // Update results Heading
        resultsHeading.innerHTML = `<h2>Results for Random Meal</h2>`
        
        // Show random mealin UI        
                    meals.innerHTML = data.meals.map( meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `)
                    .join('')
    })
};

// Event Listeneres
// 1. Listen for form Submit
submit.addEventListener('submit', searchMeal);

// 2. Listen for click on Meals
meals.addEventListener('click', e => {
    // Find and return only if clicked on a meal-info div
    const mealInfo = e.path.find(item => {
        if ( item.classList ) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });
    // console.log(mealInfo);
    // Check if meal info exists
    if (mealInfo) {
        // Get the data-mealid attribute
        const mealId = mealInfo.getAttribute('data-mealid');
        // console.log(mealId);

        // Fetch details of meal
        getMeal(mealId);
    }
});

// 3. Listen for Random button
generate.addEventListener('click', randomMeal);

