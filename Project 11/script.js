// Get DOM Elements
const filter = document.getElementById('filter-container');
const newsFeed = document.getElementById('news-feed-container');
const loader = document.getElementById('loader');

// Global Variables for number of posts to fetch per API call and current page
let limit = 5;
let page = 1;

// Function to asynchronously fetch posts from API
async function fetchPosts() {
    // Fetch posts from the JSON placeholder API
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();

    console.log(data);

    return data;
};

fetchPosts();