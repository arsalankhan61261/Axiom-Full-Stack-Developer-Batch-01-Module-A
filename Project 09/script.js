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
    // { id: 1, reason: 'Salary', amount: 5000 },
    // { id: 2, reason: 'Breakfast', amount: -20 },
    // { id: 3, reason: 'Lunch', amount: -30 },
    // { id: 4, reason: 'Dinner', amount: -60 },
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
        ${transaction.reason} <span>${(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(transaction.amount))}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>   
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
    // Update all balance values
    updateBalance();
};

// Initialize the application
init();

// Function to update all balances
function updateBalance() {
    // Create a new array with just the amounts from the transactions array
    const transactionAmounts = transactions.map( transaction => transaction.amount);
    // console.log(transactions);
    // console.log(transactionAmounts);
    
    // Calculate balance value
    const totalBalance = transactionAmounts.reduce( (acc, amount) => ( acc += amount ), 0 );
    // console.log(totalBalance);

    // Calculate total Credit Balance
    const creditBalance = transactionAmounts
                            .filter(amount => amount > 0)
                            .reduce( (acc, amount) => ( acc += amount ), 0 );
    // console.log(creditBalance);

    // Calculate total Debit Balance
    const debitBalance = transactionAmounts
                            .filter(amount => amount < 0)
                            .reduce( (acc, amount) => ( acc += amount ), 0 );
    // console.log(debitBalance);

    // Update values in the DOM for overall balance, credit balance and debit balance
    // And convert amounts with commas
    balance.innerText = `$${(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(totalBalance))}`;
    moneyCredit.innerText = `$${(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(creditBalance))}`;
    moneyDebit.innerText = `$${(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(debitBalance))}`;
};

// Function to create a random ID
function createID() {
    return Math.floor(Math.random() * 100000000000);
};

// Function to add a transaction from the form
function addTransaction(e) {
    // Stop page reloading on click add transaction button
    e.preventDefault();
    // Check if form has valid data
    if ( reason.value.trim() === '' || amount.value.trim() === '' ) {
        // Display error message if form is not complete
        alert('Please provide a valid reason and transaction amount')
    } else {
        // Create an object for the transaction containing id,
        // text for the reason and the transaction amount
        const transaction = {
            id: createID(),
            reason: reason.value,
            amount: +amount.value
        }
        // Push the new transaction into the transactions array
        transactions.push(transaction);
        // Display the new transaction in the DOM
        displayTransaction(transaction);
        // Update all balances
        updateBalance();
        // Clear form fields
        reason.value = '';
        amount.value = ''; 
    }
};

// Function to delete a transaction from the history
function deleteTransaction(id) {
    transactions = transactions.filter( transaction => transaction.id !== id );
    // Initialize the app again to update the DOM
    init(); 
};

// Event Listeners
// 1. Listen for form submit to add a transaction
form.addEventListener('submit', addTransaction);