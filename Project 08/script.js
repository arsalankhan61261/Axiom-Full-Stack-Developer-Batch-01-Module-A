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
                console.log(data);
                // Update results Heading
                resultsHeading.innerHTML = `<h2>Search results for ${searchText}</h2>`
                // Check if any meals return from API
                if (data.meals === null) {
                resultsHeading.innerHTML = `<h2>No results found for ${searchText}</h2>`
                } else {
                    meals.innerHTML = data.meals.map( meal => `
                        <div  class="meal">
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
};

// Event Listeneres
// 1. Listen for form Submit
submit.addEventListener('submit', searchMeal);