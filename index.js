import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase,ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetings={
    databaseURL:"https://items-38a25-default-rtdb.europe-west1.firebasedatabase.app/",
}


const app=initializeApp(appSetings);
const database=getDatabase(app);
const itemInDB=ref(database, "products");

const addButtonEl=document.getElementById("add-button");
const ShoppingList = document.getElementById("shopping_list"); 
const inputField=document.getElementById("input-field");

addButtonEl.addEventListener("click", function(){
    var item=inputField.value;
    push(itemInDB,item);
    resetInputField() 
   // addToShopList(item);
    
    
})

onValue(itemInDB,function(snapshot){
    resetShoppingList()
    if(snapshot.exists()){
    
    let productsArray= Object.entries(snapshot.val())
    for(let i=0; i<productsArray.length;i++){
        let currentProduct=productsArray[i]
        let currentProductId=currentProduct[0]
        let currentProductVal=currentProduct[1]
        addToShopList(currentProductId,currentProductVal)
    }
}
else{
    ShoppingList.innerHTML+=`No items here... yet`;
   
}
    
    //console.log(productsArray)
})

function resetShoppingList(){
    ShoppingList.innerHTML=""
}

function addToShopList(productId, productVal){
   // ShoppingList.innerHTML+=`<li id="${productId}">${productVal}</li>`;
   let newEl = document.createElement("li")
    newEl.textContent = productVal 
    newEl.id=productId   
    newEl.addEventListener("dblclick",function(){
        
        let locationOfProduct= ref(database, `products/${productId}`)
        remove(locationOfProduct)
    })
    ShoppingList.append(newEl)
}

function resetInputField(){
    inputField.value="";
}
 

