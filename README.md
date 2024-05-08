data structure:

    - expenceArr
    - incomeArr
    each cell in evry arr is an obj that has 2 fields: description:string, amount:int

    - totalExpense
    - totalIncome
    each variable contains a sum of the corresponding array

functions:

    - submit() = getInputs(), addToArr(), updateBalance(totalExpene, totalIncome), addRow(newObj, elemList), saveToLocalStorage(key, arr)

    - getInputs() = extracts the values of: name(description), value(amount) => return newObj

    - addToArr() = decide by elemToggle which arr (totalExpense / totalIncome) to push the newObj that getInputs() created and update the corresponding total


    - updateBalance(totalExpene, totalIncome) = update elemBalance (totalExpense - totalIncome)

    - addRow(newObj, elemList) = creates a new div (of row in a list) that contains the newObj.description, newObj.amount - and inserts it to elemList innerHtml - the row contains in addition a button that delets the new row with onClick deleteRow(this)

    - deleteRow(element) = find index of element inside elemList.children.indexOf(element) and splice it from the corresponding array, using element.remove to remove it from the DOM, update sum of corresponding array, updateBalance saveToLocalStorage(key, arr)

    - saveToLocalStorage(key, arr) = saves the updated arr to local storage under its key








    - readFromLocalStorage(key) = checks for each of the arrays if contains any value, if it does, inserts the values that saved on the local storage to the corresponding array

    - calculateTotal(arr) => returns sum of newObj.amount in the array

    - displayRowsFromLocalStorage(arr, elemList) = insert into elemList addRow for the length of arr

    - showDate() = display date

