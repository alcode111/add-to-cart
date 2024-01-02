import { initializeApp } from 
"https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from 
"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-30064-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingItemsInDB = ref(database, "shoppingItems")

const inputFieldEl = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const shoppingItemsUlEl = document.getElementById("shopping-items")

addButton.addEventListener('click', function() {
    let userInput = inputFieldEl.value

    push(shoppingItemsInDB, userInput)

    clearInputFieldEl()
})

onValue(shoppingItemsInDB, function(snapshot) {
    let shoppingItemsArray = Object.entries(snapshot.val())

    cleanShoppingItemsUlEl()

    for(let i = 0; i < shoppingItemsArray.length; i++) {
        let currentItemID = shoppingItemsArray[i][0]
        let currentItemValue = shoppingItemsArray[i][1]

        appendShoppingItemsToShoppingItemsUlEl(currentItemValue, currentItemID)
    }
})

function appendShoppingItemsToShoppingItemsUlEl(itemValue, itemID) {
    let newLi = document.createElement("li")
    newLi.textContent = itemValue
    shoppingItemsUlEl.append(newLi)

    newLi.addEventListener('click', function() {
        let shoppingItemExactLocationInDB = ref(database, `shoppingItems/${itemID}`)
        remove(shoppingItemExactLocationInDB)
    })
}

function cleanShoppingItemsUlEl() {
    shoppingItemsUlEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}