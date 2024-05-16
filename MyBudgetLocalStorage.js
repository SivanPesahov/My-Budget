const incomeArrKey = "INCOME_KEY";
const expensesArrKey = "EXPENSES_KEY";

function saveToLocalStorage(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
  }
  
  function readFromLocalStorage(key) {
    let temp = localStorage.getItem(key);
    return temp !== null ? JSON.parse(temp) : [];
  }