let incomeArr = []
let expensesArr = []
let totalIncome
let totalExpenses

let elemToggle
let elemIncomeList
let elemExpensesList

let incomeArrKey
let expensesArrKey

//------------------------------------------------


function getInputs(){
    let elemDescriptionInput = document.querySelector("#descriptionID")
    let elemValueInput = document.querySelector("#valueID")
    let newObj = {description : elemDescriptionInput.value, amount : elemValueInput.value}
    return newObj
}

function addToArr(obj){
    elemToggle = document.querySelector("#toggle")
    if(elemToggle.value == 'plus'){
        incomeArr.push(obj)
        totalIncome += obj.amount
    }
    else{
        expensesArr.push(obj)
        totalExpenses += obj.amount
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
    // if (validateInput(obj)){
        addToArr(obj)
        updateBalance(totalIncome, totalExpenses)
        //addRow()
        saveToLocalStorage("incomeArrKey", incomeArr)
        saveToLocalStorage("expensesArrKey", expensesArr)
    // }
}