// Get DOM Elements
const balance = document.getElementById('balance');
const moneyCredit = document.getElementById('money-credit');
const moneyDebit = document.getElementById('money-debit');
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');

// Temporary array of transactions - to be replaced with local storage
const Transactions = [
    { id: 1, reason: 'Salary', amount: 5000 },
    { id: 2, reason: 'Breakfast', amount: -20 },
    { id: 3, reason: 'Lunch', amount: -30 },
    { id: 4, reason: 'Dinner', amount: -60 },
];

// Get transaction data from storage
let transactions = Transactions;

// Function to display transactions in DOM - History section
function displayTransaction(transaction) {
    // Calculate if transaction is Credit or Debit
    const type = transaction.amount > 0 ? '+' : '-';
    // Create a list item for the transaction
    const transactionLI = document.createElement('li');
    // Determine class based on transaction type. If positive, then credit, otherwise debit
    transactionLI.classList.add( transaction.amount > 0 ? 'credit' : 'debit' );
    // Assign the inner HTML for the transaction li
    transactionLI.innerHTML = `
        ${transaction.reason} <span>${type}${transaction.amount}</span>
        <button class="delete-btn">X</button>   
    `;
    // Add the list item in the DOM under the transaction history list
    list.appendChild(transactionLI);
};

// Function to Initialize the application
function init() {
    // Clear all transaction history
    list.innerHTML = '';
    // Display all transactions in data base in the DOM
    transactions.forEach(displayTransaction);
};

// Initialize the application
init();