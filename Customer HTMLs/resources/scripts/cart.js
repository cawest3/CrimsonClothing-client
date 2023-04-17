let itemUrl = ""
let consignmentUrl = ""
let transactionUrl = ""
let adminUrl = ""
let customerUrl = ""
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