const incomeArrKey = "INCOME_KEY";
const expensesArrKey = "EXPENSES_KEY";

let incomeArr = readFromLocalStorage(incomeArrKey);
let expensesArr = readFromLocalStorage(expensesArrKey);
let totalIncome = calculateTotal(incomeArr);
let totalExpenses = calculateTotal(expensesArr);

const elemIncomeList = document.querySelector("#incomeList");
const elemExpensesList = document.querySelector("#expensesList");
const elemDescriptionInput = document.querySelector("#descriptionInput");
const elemAmountInput = document.querySelector("#amountInput");
const elemTypeToggle = document.querySelector("#typeToggle");
const elemSubmitButton = document.querySelector("#submitButton");

const elemDate = document.querySelector("#date");
const elemBalance = document.querySelector("#totalBalance");
const elemIncomeTotal = document.querySelector("#incomeTotal");
const elemExpensesTotal = document.querySelector("#expensesTotal");
const elemTotalPercentage = document.querySelector("#totalPercentage");

//------------------------------------------------

function getInputs() {
  let transaction = {
    description: elemDescriptionInput.value,
    amount: parseFloat(elemAmountInput.value),
  };
  return transaction;
}

function validateInput(transaction) {
  if (
    isFinite(transaction.amount) &&
    transaction.description != null &&
    transaction.description.trim() !== ""
  ) {
    return true;
  } else {
    return false;
  }
}

function addTransaction(transaction) {
  if (elemTypeToggle.value == "income") {
    incomeArr.push(transaction);
    saveToLocalStorage(incomeArrKey, incomeArr);
    totalIncome += transaction.amount;
    addRow(transaction, elemIncomeList);
  } else {
    expensesArr.push(transaction);
    saveToLocalStorage(expensesArrKey, expensesArr);
    totalExpenses += transaction.amount;
  }
}

function submit() {
  let transaction = getInputs();
  if (validateInput(transaction)) {
    addTransaction(transaction);
    displayTotals();
    displayBalance();
    displayTransactions(expensesArr, elemExpensesList);
    clearInputs();
  }
}

function clearInputs() {
  elemDescriptionInput.value = "";
  elemAmountInput.value = "";
}

function saveToLocalStorage(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

function readFromLocalStorage(key) {
  let temp = localStorage.getItem(key);
  return temp !== null ? JSON.parse(temp) : [];
}

function calculateTotal(arr) {
  return arr.reduce((sum, val) => {
    return sum + val.amount;
  }, 0);
}

function addRow(transaction, elemList) {
  const symbol = elemList == elemIncomeList ? "+" : "-";
  elemList.innerHTML += `<li class="transaction__item">
  <p class="transaction__description">${transaction.description}</p>
  <div class="transaction__details">
  <p class="transaction__amount">${symbol}${transaction.amount.toFixed(2)}</p>
  ${
    symbol == "-"
      ? `<div class = 'percentage__container'>
       <p>${parseFloat((transaction.amount / totalIncome) * 100).toFixed(
         0
       )}%</p>
       </div>`
      : ""
  }
  <i class="fa-regular fa-circle-xmark" onclick="deleteTransaction(this)"></i></div></li>`;
}

function indexOfTransaction(element, elemList) {
  return Array.from(elemList.children).indexOf(element.parentNode.parentNode);
}

function deleteTransaction(element) {
  let amount = parseFloat(
    element.parentNode.querySelector(".transaction__amount").innerText
  );
  if (amount > 0) {
    incomeArr.splice(indexOfTransaction(element, elemIncomeList), 1);
    saveToLocalStorage(incomeArrKey, incomeArr);
    totalIncome -= amount;
  } else {
    expensesArr.splice(indexOfTransaction(element, elemExpensesList), 1);
    saveToLocalStorage(expensesArrKey, expensesArr);
    totalExpenses += amount;
  }
  element.parentNode.parentNode.remove();
  displayTotals();
  displayBalance();
  displayTransactions(expensesArr, elemExpensesList);
}

function displayTransactions(arr, elemList) {
  elemList.innerHTML = "";
  arr.forEach((transaction) => {
    addRow(transaction, elemList);
  });
}

function displayDate() {
  elemDate.innerText = `Available Budget in ${new Date().toLocaleString(
    "default",
    { month: "long", year: "numeric" }
  )}:`;
}

function displayTotals() {
  elemIncomeTotal.innerText = `+ ${totalIncome.toFixed(2)}`;
  elemExpensesTotal.innerText = `- ${totalExpenses.toFixed(2)}`;
  elemTotalPercentage.innerText = `${(
    (totalExpenses / totalIncome) *
    100
  ).toFixed(0)}%`;
}

function displayBalance() {
  const balance = (totalIncome - totalExpenses).toFixed(2);
  elemBalance.innerText = balance > 0 ? `+${balance}` : balance;
}

function addEvent(element) {
  element.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      submit();
    }
  });
  element.addEventListener("focus", function () {
    if (elemTypeToggle.value == "income") {
      setBorderColor("var(--clr-income)", element);
    } else {
      setBorderColor("var(--clr-expenses)", element);
    }
  });
  element.addEventListener("blur", function () {
    setBorderColor("", element);
  });
}

function setBorderColor(color, element) {
  element.style.borderColor = color;
}

function toggleClicked(element) {
  if (element.value == "income") {
    setButtonColor("var(--clr-income)", elemSubmitButton);
    setBorderColor("var(--clr-income)", elemTypeToggle);
  } else {
    setButtonColor("var(--clr-expenses)", elemSubmitButton);
    setBorderColor("var(--clr-expenses)", elemTypeToggle);
  }
}

function setButtonColor(color, element) {
  element.style.color = color;
}

addEvent(elemDescriptionInput);
addEvent(elemAmountInput);
displayTransactions(incomeArr, elemIncomeList);
displayTransactions(expensesArr, elemExpensesList);
displayDate();
displayTotals();
displayBalance();
