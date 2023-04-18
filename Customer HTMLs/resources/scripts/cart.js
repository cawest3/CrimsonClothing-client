let itemUrl = "http://localhost:5165/item"
let consignmentUrl = "http://localhost:5165/consignment"
let transactionUrl = "http://localhost:5165/transaction"
let adminUrl = "http://localhost:5165/admin"
let customerUrl = "http://localhost:5165/customer"
let checkoutCart = []
let transactionProfit

let activeUser = JSON.parse(localStorage.getItem("activeUser"))

function SetUpUser(){
    activeUser = {
        customerId: activeUser.customerId,
        username: activeUser.username,
        password: activeUser.password,
        cart: activeUser.cart
    }
    
}

function HandleCheckCheckOutClick(){
    cart.forEach((item) => {
        item = {
                itemId: item.itemId,
                itemImageSrc: item.itemImageSrc,
                price: item.price,
                size: item.size,
                stock: false,
                value: item.value,
                profit: item.profit,
                inCart: true
        }
        transactionProfit += item.price
    })

    //Put to update items and Put to update Transactions
}

//new transaction

// function HandleAddToCartClick(itemId){

//     let activeUser = JSON.parse(localStorage.getItem("activeUser"))

//     let addingItem = items.find((item) => item.itemId == itemId)
//     console.log(addingItem)

//     activeUser.cart += addingItem
//     console.log(activeUser.cart)
//     addingItem.stock = false;

//     console.log(activeUser)

// }