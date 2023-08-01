let profitOrLoss = 0;
let transactionArr = [];

let minSaving = prompt("Enter the minimum saving amount");

let loss;
function update_income() {
  let incomeElement = document.querySelector('.income span');
  let expenseElement = document.querySelector('.expense span');
  let profitElement = document.querySelector('.profit span');
  let savingElement = document.querySelector('.savings span');
  let transactionlist = document.querySelector('.content ul');
  let itemdiscreption = document.querySelector('#description');
  let discreptionData = itemdiscreption.value;
  let amountElement = document.getElementById('amount');
  let amountData = parseFloat(amountElement.value); // Parse as a floating-point number
  
  if(discreptionData=="" || amountData=="")
  {
    alert("Enter a valid discreption and amount");
    return;
  }

  if (amountData < 0) {
    let expense = parseFloat(expenseElement.textContent);
    expense += amountData;
    expenseElement.textContent = expense.toFixed(2); // Display expenses with 2 decimal places
  } else {
    let income = parseFloat(incomeElement.textContent);
    income += amountData;
    incomeElement.textContent = income.toFixed(2); // Display income with 2 decimal places
  }

  profitOrLoss += amountData;
  if (profitOrLoss > 0) {
    profitElement.style.color = 'green';
  } else {
    profitElement.style.color = 'red';
  }
  

  if (profitOrLoss > minSaving) {
    savingElement.style.color = 'green';
    savingElement.textContent = profitOrLoss.toFixed(2);
  } else {
    savingElement.style.color = 'red';
    loss=minSaving-profitOrLoss;
    savingElement.textContent = loss.toFixed(2);
  }
  
  profitElement.textContent = profitOrLoss.toFixed(2); // Display profit/loss with 2 decimal places
  
  let amountData2 = discreptionData + " -----> "+amountData;
  itemdiscreption.value=" ";
  amountElement.value=" ";
  transactionArr.push(amountData2);
  
  transactionlist.innerHTML="";
  for(let i=0;i<transactionArr.length;i++){
        let listItem = document.createElement('li');
        listItem.textContent=transactionArr[i];
        transactionlist.appendChild(listItem);
  }

}

function reset() {
  let expenseElement = document.querySelector('.expense span');
  let profitElement = document.querySelector('.profit span');
  let incomeElement = document.querySelector('.income span');
  let transactionlist = document.querySelector('.content ul');
  let savingElement = document.querySelector('.savings span');
  transactionlist.innerHTML="";
  expenseElement.textContent = '00.00'; // Fixed the displayed format
  profitElement.textContent = '00.00'; // Fixed the displayed format
  incomeElement.textContent = '00.00'; // Fixed the displayed format
  savingElement.textContent = '00.00'; // Fixed the displayed format
  profitOrLoss=0;
  transactionArr=[]
}
function sendViaEmail() {
  let email=document.getElementById('getemail');
  let emaildata=email.value;
  if (emaildata.includes('@')){
    alert('Send the data via email... to '+emaildata);
  } else {
    alert("Please enter a valid email address.");
  }
}

console.log('hey');
