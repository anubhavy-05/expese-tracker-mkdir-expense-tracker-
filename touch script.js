// Select the form and inputs
const form = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const dateInput = document.getElementById('expense-date');
// Listen for the form submission
form.addEventListener('submit', addExpense);
// Function to handle adding a new expense
function addExpense(event) {

}
event.preventDefault(); // Stop the page from refreshing
// 1. Get the values from the input fields
const name = nameInput.value.trim();
const amount = amountInput.value;
const date = dateInput.value;
// 2. Log the values to the console for testing
console.log('New Expense:', { name, amount, date });
// Global array to store all expenses
let expenses = []; 
// const form = document.getElementById('expense-form'); (Your existing code starts here)
// 3. Create the expense object
const expense = {
    id: Date.now(), // Unique ID based on the current time (milliseconds)
    name: name,
    amount: parseFloat(amount), // Convert the string amount to a number
    date: date
};

// 4. Add the new object to the global array
expenses.push(expense);