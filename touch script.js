// Day 5 & 7: Global Data and Element Selection
let expenses = []; 

const form = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const dateInput = document.getElementById('expense-date');
const expenseList = document.getElementById('expense-list'); // Day 6: List Container

// Day 5: Save function
function saveExpenses() {
    const expenseJSON = JSON.stringify(expenses);
    localStorage.setItem('expenses', expenseJSON);
}

// Day 7: Load function
function loadExpenses() {
    const saved = localStorage.getItem('expenses');
    
    if (saved) {
        expenses = JSON.parse(saved);
    } else {
        expenses = [];
    }
    
    // We will call updateTotal later on Day 10
    renderExpenses();
}

// Day 6: Render function
function renderExpenses() {
    expenseList.innerHTML = '';
    
    expenses.forEach(expense => {
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
        expenseList.innerHTML += itemHTML;
    });
}

// Day 4 & 5 & 6 & 7: Add Expense Handler
function addExpense(event) {
    event.preventDefault(); // Stop the page from refreshing

    // 1. Get the values
    const name = nameInput.value.trim();
    const amount = amountInput.value;
    const date = dateInput.value;
    
    // Simple validation: If any field is empty, stop.
    if (name === '' || amount === '' || date === '') {
        alert("Please fill out all fields.");
        return; 
    }

    // 2. Create the expense object
    const expense = {
        id: Date.now(),
        name: name,
        amount: parseFloat(amount),
        date: date
    };

    // 3. Update data
    expenses.push(expense); 
    saveExpenses();
    
    // 4. Update display
    renderExpenses(); 
    
    // 5. Clear fields
    nameInput.value = '';
    amountInput.value = '';
    dateInput.value = '';
}

// Event Listener (Day 4)
form.addEventListener('submit', addExpense);

// Initial Load (Day 7)
loadExpenses();
// Day 8: Attach listeners to newly created delete buttons
document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', deleteExpense);
});
// Day 8: Function to delete an expense
function deleteExpense(event) {
    // Get the ID from the custom data attribute we added in renderExpenses
    const idToDelete = parseInt(event.target.dataset.id);

    // 1. Filter the expenses array to keep only items whose ID does NOT match the one we want to delete.
    expenses = expenses.filter(expense => expense.id !== idToDelete);

    // 2. Update storage and display
    saveExpenses();
    renderExpenses();
    const idToDelete = parseInt(event.target.dataset.id); // <--- Use parseInt
}
// Select the total display element
const totalAmountElement = document.getElementById('total-amount');
// Function to calculate and update the total expense amount
function updateTotal() {
    // 1. Calculate the total sum of all amounts in the expenses array
    const total = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0); // Start the sum at 0

    // 2. Format the number to 2 decimal places and update the HTML element
    totalAmountElement.textContent = `Total: $${total.toFixed(2)}`;
}