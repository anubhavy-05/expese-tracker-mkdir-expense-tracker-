
/**
 * Simple Expense Tracker Application
 * Core Logic: Add, Load, Delete Expenses using JavaScript and Local Storage.
 */
let expenses = []; 
const form = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const dateInput = document.getElementById('expense-date');
const expenseList = document.getElementById('expense-list');
const totalAmountElement = document.getElementById('total-amount'); 
const exportButton = document.getElementById('export-btn');
function updateTotal() {
    const total = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0); 

    totalAmountElement.textContent = `Total: $${total.toFixed(2)}`;
}
function saveExpenses() {
    const expenseJSON = JSON.stringify(expenses);
    localStorage.setItem('expenses', expenseJSON);
}
function loadExpenses() {
    const saved = localStorage.getItem('expenses'); // Define 'saved' here
    
    if (saved) {
        expenses = JSON.parse(saved);
    } else {
        expenses = [];
        updateTotal(); 
    }
    
    renderExpenses();
    updateTotal(); 
}
function deleteExpense(event) {
    // Day 10: Confirmation dialog
    if (confirm('Are you sure you want to delete this expense?')) { 
        const idToDelete = parseInt(event.target.dataset.id); 

        expenses = expenses.filter(expense => expense.id !== idToDelete);

        saveExpenses();
        renderExpenses();
        updateTotal(); 
    }
}
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
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteExpense);
    });
}

function addExpense(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const amount = amountInput.value;
    const date = dateInput.value;
    
    if (name === '' || amount === '' || date === '') {
        alert("Please fill out all fields.");
        return; 
    }

    if (parseFloat(amount) <= 0 || isNaN(parseFloat(amount))) {
        alert("Please enter a valid positive amount.");
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
    
    renderExpenses();
    updateTotal();
    
    // Clear fields
    nameInput.value = '';
    amountInput.value = '';
    dateInput.value = '';
}
function exportData() {
    if (expenses.length === 0) {
        alert("The list is empty. Nothing to export.");
        return;
    }
    const data = JSON.stringify(expenses, null, 2); 
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.download = 'expense_data_' + new Date().toISOString().slice(0, 10) + '.json';
    a.href = url;

    document.body.appendChild(a); 
    a.click(); 

    document.body.removeChild(a); 
    URL.revokeObjectURL(url);
}

form.addEventListener('submit', addExpense);
exportButton.addEventListener('click', exportData); 
loadExpenses();
