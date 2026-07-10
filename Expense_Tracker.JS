let transections = [
    {
        id: 1,
        date: "2026-07-07",
        category: 'Food',
        amount: -100,
        status: "Success",
        type: "expense",
    },

    {
        id: 1,
        date: "2026-07-05",
        category: 'Food',
        amount: -100,
        status: "Success",
        type: "expense",
    },

    {
        id: 1,
        date: "2026-07-02",
        category: 'Food',
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
    
    
    monthlyExpenses += amount;
    // amount -= monthlyExpenses;
    updateDashboard();
    updateTransectionsTable();
    
    closeModal('expenseModal');
    showNotification('expense added successfully', 'success');
}

function updateDashboard() {
    document.querySelector('.income-amount').textContent = `${monthlyIncome.toLocaleString()}.00`
    document.querySelector('.expense-amount').textContent = `${monthlyExpenses.toLocaleString()}.00`

    let spendingLimit = 300000
    const usedAmount = monthlyExpenses
    const percentage = (usedAmount / spendingLimit) * 100
    document.querySelector('.spending-limit').textContent = `${(spendingLimit - usedAmount).toLocaleString()}.00`
    document.querySelector('.progress-fill').style.width = `${Math.min(percentage, 100)}%`
}

function updateTransectionsTable() {
    const tbody = document.querySelector('.transection-table tbody')
    tbody.innerHTML = ''

    const recentTransection = transections.slice(0, 10)

    recentTransection.forEach((transection) => {
        const row = document.createElement('tr')
        const formattedDate = new Date(transection.date).toLocaleDateString(
            'en-Us',
            {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }
        )

        const amountDisplay = transection.amount > 0 ? `+${transection.amount.toLocaleString()}.00` : `-${Math.abs(transection.amount).toLocaleString()}.00`

        row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${transection.category}</td>
                <td style="color: ${transection.amount > 0 ? '#10b981' : '#ef4444'}">${amountDisplay}</td>
                <td><span class="status-success">${transection.status}</span></td>
                <td><button class="action-btn"><i class="fas fa-ellipsis-h"></i></button></td>
        `
        tbody.appendChild(row)
    })
}

function showNotification(massage, type = 'Success'){
    const notification = document.createElement('div')
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0.15);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
    `
    notification.textContent = massage
    document.body.appendChild(notification)

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease'
        setTimeout(() => {
            document.body.removeChild(notification)
        }, 300);
    }, 3000);
}

const style = document.createElement('style')
style.textContent = `
    @keyframes slideInRight {
        from{transform: translateX(100%); opacity: 0;}
        to {transform: translateX(0); opacity: 1;}
    }
    @keyframes slideOutRight {
        from{transform: translateX(0); opacity: 1;}
        to {transform: translateX(100%); opacity: 0;}
    }
`

document.head.appendChild(style)

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal("incomeModal");
    closeModal("expenseModal");
  }

  if (e.ctrlKey && e.key === "i") {
    e.preventDefault();
    openIncomeModal();
  }

  if (e.ctrlKey && e.key === "e") {
    e.preventDefault();
    openExpenseModal();
  }
});

// Add hover effects to cards
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)";
    this.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    this.style.transition = "all 0.2s ease";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
  });
});

document.addEventListener('DOMContentLoaded', function (){
    updateTransectionsTable()
})