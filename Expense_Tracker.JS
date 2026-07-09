let transections = [
    {
        id: 1,
        date: "07-07-2026",
        amount: -100,
        status: "Success",
        type: "expense",
    },

    {
        id: 1,
        date: "07-05-2026",
        amount: -100,
        status: "Success",
        type: "expense",
    },

    {
        id: 1,
        date: "07-02-2026",
        amount: -100,
        status: "Success",
        type: "expense",
    },
];

let monthlyIncome = 35000;
let monthlyExpenses = 33000;

const today = new Date().toISOString().split('T')[0];
document.getElementById('incomeDate').value = today
document.getElementById('expenseDate').value = today

function openIncomeModal() {
    document.getElementById('incomeModal').style.display = "block"
    document.body.style.overflow = "hidden"
}

function openExpenseModal() {
    document.getElementById('expenseModal').style.display = "block"
    document.body.style.overflow = "hidden"
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none'
    document.body.style.overflow = "auto"

    if (modalId === 'incomeModal') {
        document.getElementById('incomeForm').reset()
        document.getElementById('incomeDate').value = today
    } else {
        document.getElementById('expenseForm').reset()
        document.getElementById('expenseDate').value = today
    }
}

window.onclick = function (event) {
    const incomeMdal = document.getElementById('incomeModal')
    const expenseMdal = document.getElementById('expenseModal')

    if (event.target === incomeModal) {
        closeModal('incomeModal')
    }
    if (event.target === expenseModal) {
        closeModal('expenseModal')
    }
}

function addIncome() {
    const amount = parseFloat(document.getElementById("incomeAmount").value);
    const category = document.getElementById('incomeCategory').value;
    const discription = document.getElementById('incomeDescription').value
    const date = document.getElementById('incomeDate').value;

    if (!amount || !category || !date) {
        alert('Please fill in all required fields')
        return
    }

    const newTransection = {
        id: transections.length + 1,
        date: date,
        category: category.charAt(0).toUpperCase() + category.slice(1),
        amount: amount,
        status: 'Success',
        type: 'income',
        discription: discription,
    }

    transections.unshift(newTransection)

    monthlyIncome += amount;
    updateDashboard();
    updateTransectionsTable();

    closeModal('incomeModal');
    showNotification('Income added successfully', 'success');

}


function addExpense() {
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    const category = document.getElementById('expenseCategory').value;
    const discription = document.getElementById('expenseDescription').value
    const date = document.getElementById('expenseDate').value;
    
    if (!amount || !category || !date) {
        alert('Please fill in all required fields')
        return
    }

    const newTransection = {
        id: transections.length + 1,
        date: date,
        category: category.charAt(0).toUpperCase() + category.slice(1),
        amount: -amount,
        status: 'Success',
        type: 'expense',
        discription: discription,
    }
    
    transections.unshift(newTransection)
    
    monthlyExpense += amount;
    updateDashboard();
    updateTransectionsTable();

    closeModal('expenseModal');
    showNotification('expense added successfully', 'success');

}

function updateDashboard(){
    document.querySelector('.income-amount').textContent = `${monthlyIncome.toLocaleString()}.00`
    document.querySelector('.expense-amount').textContent = `${monthlyExpense.toLocaleString()}.00`

    let spendingLimit = 300000
    const usedAmunt = monthlyExpenses
    const percentage = (usedAmunt / spendingLimit)*100
    document.querySelector('.spending-limit').textContent = `${(spendingLimit - usedAmunt).toLocaleString()}.00`
    document.querySelector('.progress-fill').style.width = `${Math.min(percentage, 100)}%`
}

function updateTransectionsTable() {
    const tbody = document.querySelector('.transection-table tbody')
    tbody.innerHTML = ''

    const recentTransection
}