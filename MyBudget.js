let incomeArrKey;
let expensesArrKey;

let incomeArr = readFromLocalStorage(incomeArrKey);
let expensesArr = readFromLocalStorage(expensesArrKey);
let totalIncome = calculateTotal(incomeArr);
let totalExpenses = calculateTotal(expensesArr);

let elemToggle;
let elemIncomeList = document.querySelector("#incomeList");
let elemExpensesList = document.querySelector("#expensesList");

let elemDate;

//------------------------------------------------


function getInputs(){
    let elemDescriptionInput = document.querySelector("#descriptionID")
    let elemValueInput = document.querySelector("#valueID")
    let newObj = {description : elemDescriptionInput.value, amount : parseFloat(elemValueInput.value)}
    return newObj
}

function addToArr(obj){
    elemToggle = document.querySelector("#toggle")
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

function updateBalance(totalIncome, totalExpenses){
    return totalIncome - totalExpenses
}

function saveToLocalStorage(key, arr){
    localStorage.setItem(key, JSON.stringify(arr))
}

function submit(){
    let obj = getInputs()
    if (validateInput(obj)){
        addToArr(obj)
        updateBalance(totalIncome, totalExpenses)
        saveToLocalStorage("incomeArrKey", incomeArr)
        saveToLocalStorage("expensesArrKey", expensesArr)
    }
}

function readFromLocalStorage(key) {
  let temp = localStorage.getItem(key);
  return temp !== null ? temp : [{ description: "TEST", amount: 3000 },{ description: "TEST2", amount: 3000 }];
}

function calculateTotal(arr) {
  return arr.reduce((sum, val) => {
    sum += val.amount;
  });
}

function addRow(obj, elemList) {
  let symbol = elemList == elemIncomeList ? "+" : "-";
  elemList.innerHTML += `<li><p style="color:black;">${obj.description}</p><div><p>${symbol} ${obj.amount}</p><i class="fa-regular fa-circle-xmark" onclick="deleteRow(this)"></i></div></li>`;
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

function validateInput(obj){
    console.log(obj)
    if(isFinite(obj.amount) && (obj.description != null) && (obj.description.trim() !== '')){
        return true
    }
    else{
        return false
    }
}



displayRowsFromLocalStorage(incomeArr, elemIncomeList);
displayRowsFromLocalStorage(expensesArr, elemExpensesList);
