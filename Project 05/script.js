// Get DOM Elements
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const filterBtn = document.getElementById('filter');
const sortBtn = document.getElementById('sort');
const sumBtn = document.getElementById('sum');

// Initialize user data array
let data = [];

// Fetch Random User from randomuser.me API
async function getRandomUser() {
    // Wait for the results from API
    const res = await fetch('https://randomuser.me/api/')
    // Wait for response to convert into JSON
    const data = await res.json();

    console.log(data);
};

getRandomUser();