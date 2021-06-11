// Get DOM Elements
const currencyOne = document.getElementById('currency-one');
const amountCurrencyOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountCurrencyTwo = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const sawp = document.getElementById('swap');

// Fetch Exchange Rates and Update the DOM
function calculate() {
    //Get the currency code for currency 1 and 2
    const currencyOneCode = currencyOne.value;
    const currencyTwoCode = currencyTwo.value;

    // Send request to Exchange rate API for conversion rates for currency one
    fetch(`https://v6.exchangerate-api.com/v6/f28b90085b7571e121761388/pair/${currencyOneCode}/${currencyTwoCode}`)
        .then(res => res.json())
        .then(data => {
            // Get the conversion Rate from Currency One to Currency Two
            const conversionRate = data.conversion_rate;
            // Update the DOM to diplay the conversion rate
            rate.innerText = `1 ${currencyOneCode} = ${conversionRate} ${currencyTwoCode}`;
            // Update the Currency Two Amount
            amountCurrencyTwo.value = (amountCurrencyOne.value * conversionRate).toFixed(2);
        });
};

// Event Listeners
// Recalculate exchange rate when currency 1 changes
currencyOne.addEventListener('change', calculate);
// Recalculate exchange rate when currency amount 1 changes
amountCurrencyOne.addEventListener('input', calculate);
// Recalculate exchange rate when currency 1 changes
currencyTwo.addEventListener('change', calculate);
// Recalculate exchange rate when currency amount 2 changes
amountCurrencyTwo.addEventListener('input', calculate);

sawp.addEventListener('click', () => {
    // Save value of currency one code to temp variable
    const temp = currencyOne.value;
    // Copy currency two code to Currency One
    currencyOne.value = currencyTwo.value;
    // Copy currency One Code from temp variable to Currency Two
    currencyTwo.value = temp;
    // Recalculate Exchange Rate after Swap
    calculate();
})

// Execute calculate function on page load
calculate();