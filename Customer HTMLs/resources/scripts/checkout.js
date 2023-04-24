let itemUrl = "http://localhost:5165/item"
let consignmentUrl = "http://localhost:5165/consignment"
let transactionUrl = "http://localhost:5165/transaction"
let adminUrl = "http://localhost:5165/admin"
let customerUrl = "http://localhost:5165/customer"
let checkoutCart = []
let transactionProfit = 0;
let transaction 

let activeUser = JSON.parse(localStorage.getItem("activeUser"))


function HandleOnLoad(){
    loadCartItems()
    SetUpUser()
    
}   

function SetUpUser(){
    activeUser = {
        customerId: activeUser.customerId,
        username: activeUser.username,
        password: activeUser.password,
        cart: activeUser.cart
    }
    
}


function HandleCheckCheckOutClick(){

    let transactions = JSON.parse(localStorage.getItem("transactions")) ? JSON.parse(localStorage.getItem('transactions')) : []

    checkoutCart.forEach((item) => {
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

        
}  

 function loadCartItems() {
    const cartItemsContainer = document.querySelector(".items-container");
    let innerHTML = "";
    

    let subtotal = 0;

    try {
        // const response = await fetch(transactionUrl);
        // const cartItems = await response.json();

        cartItems.forEach((item) => {
            subtotal += item.price;
            if (item.inCart === true) {
              innerHTML += `
              <div class="col-md-4 order-md-2 mb-4">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Your cart</span>
                <span class="badge badge-secondary badge-pill">3</span>
              </h4>
              <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Product name</h6>
                    <small class="text-muted">Item Name</small>
                  </div>
                  <span class="text-muted">$12</span>
                </li>
                </ul>
              `;
            }
          });
        cartItemsContainer.insertAdjacentHTML("beforeend", cartItemHtml);

        

        cartItemsContainer.insertAdjacentHTML("beforeend", subtotalHtml);

    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
}
   
    



// async function GetTransactions(){
//     try{
//         const response = await fetch(transactionUrl)
//         const data = await response.json()
//         transaction = []
//         data.forEach((transaction) => {
//             transaction = {
//                 transactionId: transaction.tranactionId,
//                 profit: transaction.profit,
//                 customerId: transaction.customerId,
//             }
//             transactions.unshift(transaction)
//         })
        
//         localStorage.clear()
//         localStorage.setItem('localItems', JSON.stringify(transactions))
//     }
//     catch{
//         console.log("error")
//     }
// }