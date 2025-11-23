// =======================================================
// DAY 1, 3, 4, 9, 11: GLOBAL VARIABLES & ELEMENT SELECTION
// =======================================================
let expenses = []; 

const form = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const dateInput = document.getElementById('expense-date');
const expenseList = document.getElementById('expense-list');
const totalAmountElement = document.getElementById('total-amount'); 
const exportButton = document.getElementById('export-btn'); // Day 11

// =======================================================
// DAY 9: UPDATE TOTAL
// =======================================================
function updateTotal() {
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
    const saved = localStorage.getItem('expenses'); // Define 'saved' here
    
    if (saved) {
        expenses = JSON.parse(saved);
    } else {
        expenses = [];
        updateTotal(); // Day 10: Ensures total is $0.00 if no data is found
    }
    
    renderExpenses();
    updateTotal(); 
}

// =======================================================
// DAY 8 & 10: DELETE FUNCTION
// =======================================================
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
// DAY 4, 5, 9, 10: ADD EXPENSE HANDLER
// =======================================================
function addExpense(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const amount = amountInput.value;
    const date = dateInput.value;
    
    // Day 10: Basic Validation
    if (name === '' || amount === '' || date === '') {
        alert("Please fill out all fields.");
        return; 
    }

    // Day 10: Amount Validation
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

// =======================================================
// DAY 11 & 12: EXPORT FUNCTION
// =======================================================
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

// =======================================================
// DAY 4 & 7 & 11: INITIALIZATION
// =======================================================
form.addEventListener('submit', addExpense);
exportButton.addEventListener('click', exportData); 
loadExpenses();
