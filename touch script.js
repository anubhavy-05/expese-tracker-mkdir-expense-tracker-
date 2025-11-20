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
// Function to save the current expenses array to Local Storage
function saveExpenses() {
    // Convert the JavaScript array into a JSON string
    const expenseJSON = JSON.stringify(expenses);

    // Save the JSON string to Local Storage under the key 'expenses'
    localStorage.setItem('expenses', expenseJSON);
    // 4. Add the new object to the global array
expenses.push(expense); 

// 5. Save the updated array to Local Storage
saveExpenses(); // <--- ADD THIS LINE

// console.log('New Expense:', { name, amount, date }); 
// ... rest of the function
}
// Select the display container
const expenseList = document.getElementById('expense-list');
// Function to draw all expenses to the screen
function renderExpenses() {

}
// 1. Clear the list container to prevent duplicates
expenseList.innerHTML = '';
// 2. Loop through the array
expenses.forEach(expense => {
    // This code will run for every item in the expenses array
});
const itemHTML = `
    <div class="expense-item" data-id="${expense.id}">
        <div class="expense-info">
            <h4>${expense.name}</h4>
            <small>${expense.date}</small>
        </div>
        <div class="expense-cost">
            <span>$${expense.amount.toFixed(2)}</span>
            <button class="delete-btn" data-id="${expense.id}">&times;</button>
        </div>
    </div>
`;
// The toFixed(2) ensures the amount has two decimal places (e.g., 5.00)
expenseList.innerHTML += itemHTML;
// 5. Save the updated array to Local Storage
saveExpenses();

// 6. Update the display on the screen
renderExpenses(); // <--- ADD THIS LINE
// Function to retrieve and load expenses from Local Storage
function loadExpenses() {

}
const saved = localStorage.getItem('expenses');