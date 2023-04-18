let itemUrl = "http://localhost:5165/item"
let consignmentUrl = "http://localhost:5165/consignment"
let transactionUrl = "http://localhost:5165/transaction"
let adminUrl = "http://localhost:5165/admin"
let customerUrl = "http://localhost:5165/customer"
let checkoutCart = []
let transactionProfit
let transaction 

let activeUser = JSON.parse(localStorage.getItem("activeUser"))


function handleOnLoad(){
    SetUpUser()
    GetTransactions()
}   

function SetUpUser(){
    activeUser = {
        customerId: activeUser.customerId,
        username: activeUser.username,
        password: activeUser.password,
        cart: activeUser.cart
    }
    
}

async function GetTransactions(){
    try{
        const response = await fetch(transactionUrl)
        const data = await response.json()
        transaction = []
        data.forEach((transaction) => {
            transaction = {
                transactionId: transaction.tranactionId,
                profit: transaction.profit,
                customerId: transaction.customerId,
            }
            transactions.unshift(transaction)
        })
        
        localStorage.clear()
        localStorage.setItem('localItems', JSON.stringify(transactions))
    }
    catch{
        console.log("error")
    }
}

function HandleCheckCheckOutClick(){

    let transactions = JSON.parse(localStorage.getItem("transactions")) ? JSON.parse(localStorage.getItem('transactions')) : []

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

        fetch(`${itemUrl}, ${item.itemId}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item, item.itemId),
        }).then((response) => {
    
                console.log(response);
                location.reload()
                location.reload()
    
            }).catch((error) => {
    
                console.log(error);
    
            });

        transactionProfit += item.price

    })

    transaction = {
        tranactionId: transactions.length + 1, 
        profit: transactionProfit,
        customerId: activeUser.customerId
    }

    fetch(`${transactionUrl}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
    }).then((response) => {

            console.log(response);
            location.reload()
            location.reload()

        }).catch((error) => {

            console.log(error);

        });


    //Put to update items and Put to update Transactions
}