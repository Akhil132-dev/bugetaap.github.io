class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  // submit budget method

  submitBudgetFrom() {
    const value = this.budgetInput.value;

    if (value === "" || value < 0) {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p>value can not be empty of nagative </p>`;

      const self = this;
      setTimeout(() => {
        self.budgetFeedback.classList.remove('showItem');

      }, 4000);
    }
    else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = "";
      this.showBalance();
    }
  }
  //show Belence
  showBalance() {
    const expense = this.totalExpenes();
    const toatl = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = toatl;
    if (toatl < 0) {
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    }
    else if (toatl > 0) {
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showGreen');
    }
    else if (toatl === 0) {
      this.balance.classList.remove('showRed', 'showGreen');
      this.balance.classList.add('showBlack');
    }
  }
  //submit expensefrom
  submitExpenseFrom() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    if (expenseValue === '' || amountValue === '' || amountValue < 0) {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>value can not be empty of nagative </p>`;
      const self = this;
      setTimeout(() => {
        self.expenseFeedback.classList.remove('showItem');

      }, 4000);






    } else {
      let amount = parseInt(amountValue);
      this.expenseInput.value = '';
      this.amountInput.value = '';
      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount,
      }
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
    }
  }
  //addexpense
  addExpense(expense) {
    const div = document.createElement('div')

    div.classList.add('expense')
    div.innerHTML = `   <div class="expense-item d-flex justify-content-between align-items-baseline">

<h6 class="expense-title mb-0 text-uppercase list-item">-${expense.title} </h6>
<h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

<div class="expense-icons list-item">

 <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
  <i class="fas fa-edit"></i>
 </a>
 <a href="#" class="delete-icon" data-id="${expense.id}">
  <i class="fas fa-trash"></i>
 </a>
</div>
</div>`;
    this.expenseList.appendChild(div);
  }
  //total expenes
  totalExpenes() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce((acc, curr) => {

        acc += curr.amount;
        return acc;
      }, 0)
    }
    this.expenseAmount.textContent = total;
    return total
  }
  //edit expense
  editExpense(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    // remove from dom
    this.expenseList.removeChild(parent);
    //show value 

    // remove from the list
    let expese = this.itemList.filter((item) => {
      return item.id === id;
    });
    console.log(expese)
    this.expenseInput.value = expese[0].title;
    this.amountInput.value = expese[0].amount;
    let templist = this.itemList.filter((item) => {
      return item.id !== id;
    });
    this.itemList = templist;
    this.showBalance();
  }
  // delet expense
  deleteExpense(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    // remove from dom
    this.expenseList.removeChild(parent);
    let expese = this.itemList.filter((item) => {
      return item.id === id;
    });
    let templist = this.itemList.filter((item) => {
      return item.id !== id;
    });
    this.itemList = templist;
    this.showBalance();
  }

}
function eventListenters() {
  const budgetFrom = document.getElementById('budget-form');
  const expenseFrom = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  // new  instance of ui classs

  const ui = new UI();

  // buget form click
  budgetFrom.addEventListener('submit', function (event) {
    event.preventDefault();
    ui.submitBudgetFrom();
  })
  // expense from 
  expenseFrom.addEventListener('submit', function (event) {
    event.preventDefault();
    ui.submitExpenseFrom();
  })
  // click
  expenseList.addEventListener('click', function (event) {
    if (event.target.parentElement.classList.contains('edit-icon')) {
      ui.editExpense(event.target.parentElement);
    }
    else if (event.target.parentElement.classList.contains('delete-icon')) {
      ui.deleteExpense(event.target.parentElement);
    }
  })

}
document.addEventListener('DOMContentLoaded', function () {
  eventListenters();
})