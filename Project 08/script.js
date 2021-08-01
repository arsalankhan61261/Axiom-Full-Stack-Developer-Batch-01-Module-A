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
        console.log(searchText);
    } else {
        alert('Please enter search keyword')
    };
};

// Event Listeneres
// 1. Listen for form Submit
submit.addEventListener('submit', searchMeal);