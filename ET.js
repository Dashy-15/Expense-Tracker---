const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;

    if (amount && category) {
        const expense = { amount, category };
        addExpense(expense);
        //saveExpense(expense);

        // Clear input fields
        form.reset();
    }
});
function addExpense(expense) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        ${expense.category}: $${expense.amount}
        <div>
            <button class="btn btn-warning btn-sm mr-2 edit-btn">Edit</button>
            <button class="btn btn-danger btn-sm delete-btn">Delete</button>
        </div>
    `;
    
    // Add event listeners for edit and delete buttons
    li.querySelector('.delete-btn').addEventListener('click', () => {
        deleteExpense(expense, li);
    });

    li.querySelector('.edit-btn').addEventListener('click', () => {
        editExpense(expense, li);
    });

    expenseList.appendChild(li);
}
function deleteExpense(expense, listItem) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(e => e.amount !== expense.amount || e.category !== expense.category);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    listItem.remove();
}

function editExpense(expense, listItem) {
    document.getElementById('amount').value = expense.amount;
    document.getElementById('category').value = expense.category;
    deleteExpense(expense, listItem);
}
