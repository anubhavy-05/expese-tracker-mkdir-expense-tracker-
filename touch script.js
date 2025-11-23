// =======================================================
// DAY 1, 3, 4, 9: GLOBAL VARIABLES & ELEMENT SELECTION
// =======================================================
let expenses = []; 

const form = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const dateInput = document.getElementById('expense-date');
const expenseList = document.getElementById('expense-list');
const totalAmountElement = document.getElementById('total-amount'); // Day 9: Total Element

// =======================================================
// DAY 9: UPDATE TOTAL
// =======================================================
function updateTotal() {
    // Uses .reduce() to sum all expense amounts
    const total = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0); 

    totalAmountElement.textContent = `Total: $${total.toFixed(2)}`;
}

// =======================================================
// DAY 5: SAVE FUNCTION
// =======================================================
function saveExpenses() {
    const expenseJSON = JSON.stringify(expenses);
    localStorage.setItem('expenses', expenseJSON);
}

// =======================================================
// DAY 7: LOAD FUNCTION
// =======================================================
function loadExpenses() {
    const saved = localStorage.getItem('expenses');
    
    if (saved) {
        expenses = JSON.parse(saved);
    } else {
        expenses = [];
    }
    
    renderExpenses();
    updateTotal(); // Day 9: Call after loading
}

// =======================================================
// DAY 8: DELETE FUNCTION
// =======================================================
function deleteExpense(event) {
    // Get the ID from the custom data attribute
    const idToDelete = parseInt(event.target.dataset.id); 

    // Filter out the expense with the matching ID
    expenses = expenses.filter(expense => expense.id !== idToDelete);

    // Update storage and display
    saveExpenses();
    renderExpenses();
    updateTotal(); // Day 9: Call after deleting
}

// =======================================================
// DAY 6 & 8: RENDER FUNCTION (The List Builder)
// =======================================================
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

    // Day 8: Attach listeners *after* buttons are created
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteExpense);
    });
}

// =======================================================
// DAY 4 & 5 & 9: ADD EXPENSE HANDLER
// =======================================================
function addExpense(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const amount = amountInput.value;
    const date = dateInput.value;
    
    // Validation
    if (name === '' || amount === '' || date === '') {
        alert("Please fill out all fields.");
        return; 
    }

    const expense = {
        id: Date.now(),
        name: name,
        amount: parseFloat(amount),
        date: date
    };

    expenses.push(expense); 
    saveExpenses();
    
    // Update display and total
    renderExpenses();
    updateTotal(); // Day 9: Call after adding
    
    // Clear fields
    nameInput.value = '';
    amountInput.value = '';
    dateInput.value = '';
}

// =======================================================
// DAY 4 & 7: INITIALIZATION
// =======================================================
form.addEventListener('submit', addExpense);
loadExpenses(); // Loads data and calls render/updateTotal
// Add this validation
if (parseFloat(amount) <= 0 || isNaN(parseFloat(amount))) {
    alert("Please enter a valid positive amount.");
    return;
}
if (saved) {
    // ... (existing code)
} else {
    expenses = [];
    updateTotal(); // <-- NEW: Ensure total is $0.00 if no data is found
}
// Wrap the entire logic in a confirmation
if (confirm('Are you sure you want to delete this expense?')) {
    const idToDelete = parseInt(event.target.dataset.id);

    expenses = expenses.filter(expense => expense.id !== idToDelete);

    saveExpenses();
    renderExpenses();
    updateTotal(); 
}
const exportButton = document.getElementById('export-btn');
// Add event listener (near form.addEventListener)
exportButton.addEventListener('click', exportData); 

// Define function structure (near your other functions)
function exportData() {
    // Day 12 will handle the download logic here
    console.log("Export button clicked!");
}
if (expenses.length === 0) {
    alert("The list is empty. Nothing to export.");
    return;
}

const data = JSON.stringify(expenses, null, 2); // 2 spaces for nice formatting
const blob = new Blob([data], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
// Create a dynamic file name: expense_data_2025-11-23.json
a.download = 'expense_data_' + new Date().toISOString().slice(0, 10) + '.json';
a.href = url;