const incomeArrKey = "INCOME_KEY";
const expensesArrKey = "EXPENSES_KEY";

let incomeArr = readFromLocalStorage(incomeArrKey);
let expensesArr = readFromLocalStorage(expensesArrKey);
let totalIncome = calculateTotal(incomeArr);
let totalExpenses = calculateTotal(expensesArr);


const elemIncomeList = document.querySelector("#incomeList");
const elemExpensesList = document.querySelector("#expensesList");
let elemInput = document.querySelector('#descriptionID')
let elemValue = document.querySelector('#valueID')
let elemToggle = document.querySelector("#toggle")
let elemV = document.querySelector('#vID')

const elemDate = document.querySelector("#timeArea");
const elemBalance = document.querySelector("#totalBalance");
const elemIncomeTotal = document.querySelector("#incomeTotal");
const elemExpensesTotal = document.querySelector("#expensesTotal");

//------------------------------------------------


function getInputs(){
    let elemDescriptionInput = document.querySelector("#descriptionID")
    let elemValueInput = document.querySelector("#valueID")
    let newObj = {description : elemDescriptionInput.value, amount : parseFloat(elemValueInput.value)}
    return newObj
}

function addToArr(obj){
    if(elemToggle.value == 'plus'){
        incomeArr.push(obj)
        totalIncome += obj.amount
        addRow(obj, elemIncomeList)
    }
    else{
        expensesArr.push(obj)
        totalExpenses += obj.amount
        addRow(obj, elemExpensesList)

    }
}

function toggleClicked(element){
    if(element.value == 'plus'){
        changeColorV('green', elemV)
    }
    else{
        changeColorV('red', elemV)
    }
}

function changeColorInput(color, element){
    
    element.style.borderColor = color;
}

function changeColorV(color, element){
    
    element.style.color = color;
}

function updateBalance(totalIncome, totalExpenses){
    return totalIncome - totalExpenses
}

function saveToLocalStorage(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

function submit() {
  let obj = getInputs();
  if (validateInput(obj)) {
    addToArr(obj);
    displayTotals();
    displayBalance();
    saveToLocalStorage("incomeArrKey", incomeArr);
    saveToLocalStorage("expensesArrKey", expensesArr);
  }
}

function validateInput(obj) {
  console.log(obj);
  if (
    isFinite(obj.amount) &&
    obj.description != null &&
    obj.description.trim() !== ""
  ) {
    return true;
  } else {
    return false;
    }
}

function readFromLocalStorage(key) {
  let temp = localStorage.getItem(key);
  return temp !== null
    ? JSON.parse(temp)
    : [
        { description: "TEST", amount: 3000 },
        { description: "TEST2", amount: 3000 },
      ];
}

function calculateTotal(arr) {
  return arr.reduce((sum, val) => {
    return sum + val.amount;
  }, 0);
}

function addRow(obj, elemList) {
  let symbol = elemList == elemIncomeList ? "+" : "-";
  elemList.innerHTML += `<li><p style="color:black;">${
    obj.description
  }</p><div><p class="item_amount">${symbol}${obj.amount.toFixed(
    2
  )}</p><i class="fa-regular fa-circle-xmark" onclick="deleteRow(this)"></i></div></li>`;
}

function deleteRow(element) {
  let amount = parseFloat(
    element.parentNode.querySelector(".item_amount").innerText
  );
  if (amount > 0) {
    incomeArr.splice(
      Array.from(elemIncomeList.children).indexOf(
        element.parentNode.parentNode
      ),
      1
    );
    totalIncome -= amount;
  } else {
    expensesArr.splice(
      Array.from(elemExpensesList.children).indexOf(
        element.parentNode.parentNode
      ),
      1
    );
    totalExpenses += amount;
  }
  element.parentNode.parentNode.remove();
  displayTotals();
  displayBalance();
}

function displayRowsFromLocalStorage(arr, elemList) {
  arr.forEach((obj) => {
    addRow(obj, elemList);
  });
}

function displayDate() {
  elemDate.innerText = `Available Budget in ${new Date().toLocaleString(
    "default",
    { month: "long", year: "numeric" }
  )}`;
}

function displayTotals() {
  elemIncomeTotal.innerText = totalIncome.toFixed(2);
  elemExpensesTotal.innerText = totalExpenses.toFixed(2);
}

function displayBalance() {
  elemBalance.innerText = (totalIncome - totalExpenses).toFixed(2);
}

function addEvent(element){
    element.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            submit()
          }
    })
    element.addEventListener('focus', function() {
        if(elemToggle.value == 'plus'){
            changeColorInput('green', element)
        }
        else{
            changeColorInput('red', element)
        }
    })
    element.addEventListener('blur', function() {
        if(elemToggle.value == 'plus'){
            changeColorInput('', element)
        }
        else{
            changeColorInput('', element)
        }
    })
}

addEvent(elemInput)
addEvent(elemValue)
displayRowsFromLocalStorage(incomeArr, elemIncomeList);
displayRowsFromLocalStorage(expensesArr, elemExpensesList);
displayDate();
displayTotals();
displayBalance();
