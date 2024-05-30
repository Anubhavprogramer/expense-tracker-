document.addEventListener('DOMContentLoaded', () => {
  const incomeElement = document.querySelector('.income span');
  const expenseElement = document.querySelector('.expense span');
  const savingElement = document.querySelector('.savings span');
  const currentElement = document.querySelector('.current span');
  const transactionList = document.querySelector('.content-List'); // Ensure this matches the HTML class
  const itemDescription = document.querySelector('#description');
  const expense = document.getElementById('expense');
  const income = document.getElementById('income');

  // Initial savings value
  let minSaving = 100;
  savingElement.textContent = minSaving.toFixed(2);

  let transactionArr = [];

  // Update income and expense
  document.querySelector('.add-transaction').addEventListener('click', (e) => {
    e.preventDefault();
    updateIncome();
  });

  function updateIncome() {
    let descriptionData = itemDescription.value.trim();
    let expenseValue = parseFloat(expense.value) || 0; // Parse as a floating-point number
    let incomeValue = parseFloat(income.value) || 0; // Parse as a floating-point number

    if (descriptionData === '' || (expenseValue === 0 && incomeValue === 0)) {
      alert('Please enter description and amount properly');
      return;
    }

    if (expenseValue < 0 || incomeValue < 0) {
      alert('Please enter a positive number');
      return;
    }

    let oldExpense = parseFloat(expenseElement.textContent) || 0;
    let oldIncome = parseFloat(incomeElement.textContent) || 0;

    if (expenseValue !== 0) {
      oldExpense += expenseValue;
      expenseElement.textContent = oldExpense.toFixed(2);
    }

    if (incomeValue !== 0) {
      oldIncome += incomeValue;
      incomeElement.textContent = oldIncome.toFixed(2);
    }

    let current = oldIncome - oldExpense;
    currentElement.textContent = current.toFixed(2);

    // Savings management
    if (oldIncome < oldExpense) {
      let tempSavings = minSaving - oldExpense + oldIncome;
      savingElement.textContent = tempSavings.toFixed(2);
    } else {
      savingElement.textContent = minSaving.toFixed(2);
    }

    // Log the transaction
    let transaction = { description: descriptionData, amount: incomeValue || expenseValue };
    transactionArr.push(transaction);

    let listItem = document.createElement('li');
    listItem.textContent = `${transaction.description} -----> ${transaction.amount.toFixed(2)}`;
    transactionList.appendChild(listItem);

    // Clear input fields after processing
    itemDescription.value = "";
    expense.value = "";
    income.value = "";
  }

  // Function to send data via email
  document.querySelector('.for-email').addEventListener('click', sendViaEmail);

  function sendViaEmail() {
    let email = document.getElementById('getemail');
    let emaildata = email.value;
    if (emaildata.includes('@')) {
      alert('Send the data via email... to ' + emaildata);
    } else {
      alert("Please enter a valid email address.");
    }
  }

  console.log('minSaving', minSaving);
});
