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