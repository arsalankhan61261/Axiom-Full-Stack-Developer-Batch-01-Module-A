// Get DOM Elements
const filter = document.getElementById('filter-container');
const newsFeed = document.getElementById('news-feed-container');
const loader = document.getElementById('loader');

// Global Variables for number of posts to fetch per API call and current page
let limit = 5;
let page = 1;

// Function to asynchronously fetch posts from API
async function fetchPosts() {
    // Fetch posts from the JSON Placeholder API
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    // console.log(data);
    return data;
};

// Function to render the posts fetched from API
async function renderPosts() {
    // Fetch the data from the API that we want to render
    const posts = await fetchPosts();
    // console.log(posts);
    // For each object in the posts array, render the post
    posts.forEach( post => {
        // Create a new div for the post
        const postDiv = document.createElement('div');
        // Assign the post class to this div
        postDiv.classList.add('post');
        // Create the inner content for the main post div
        postDiv.innerHTML = `
            <div class="post-id">id${post.id}</div>
            <div class="post-content">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;
        // Render the postDiv in the DOM
        newsFeed.appendChild(postDiv);
    });
};

renderPosts();