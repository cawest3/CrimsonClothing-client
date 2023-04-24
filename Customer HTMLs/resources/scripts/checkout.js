let itemUrl = "http://localhost:5165/item"
let consignmentUrl = "http://localhost:5165/consignment"
let transactionUrl = "http://localhost:5165/transaction"
let adminUrl = "http://localhost:5165/admin"
let customerUrl = "http://localhost:5165/customer"
let transactionProfit = 0;
let activeUser = JSON.parse(localStorage.getItem("activeUser"));

function HandleOnLoad(){
    loadItems();
}  

function loadItems() {
    const cart = activeUser.cart
    console.log(activeUser.cart)
    if (!Array.isArray(activeUser.cart)) {
        // If activeUser.cart is not already an array, convert it from a string to an array
        activeUser.cart = activeUser.cart.split(',');
      } else {
        // If activeUser.cart is already an array, do nothing
      }

    const cartItemsContainer = document.querySelector(".items-container");
    let innerHTML = "";
    let subtotal = 0;

    try {
        cart.forEach((item) => {
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
        cartItemsContainer.innerHTML = innerHTML;
    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
}


//     // get reference to the shopping cart element
//     const checkoutCart = document.getElementById('cart');

//     // get reference to the checkout element
//     const checkout = document.getElementById('checkout');

//     // loop through each item in the shopping cart
//     for (let i = 0; i < checkoutCart.children.length; i++) {
//     // create a new checkout item element
//     const checkoutItem = document.createElement('div');
//     checkoutItem.classList.add('checkout-item');

//     // copy over the item name and price from the shopping cart
//     const itemName = checkoutCart.children[i].querySelector('.item-name').textContent;
//     const itemPrice = checkoutCart.children[i].querySelector('.item-price').textContent;

//     // create a new element for the item name and append it to the checkout item
//     const itemNameElement = document.createElement('span');
//     itemNameElement.classList.add('checkout-item-name');
//     itemNameElement.textContent = itemName;
//     checkoutItem.appendChild(itemNameElement);

//     // create a new element for the item price and append it to the checkout item
//     const itemPriceElement = document.createElement('span');
//     itemPriceElement.classList.add('checkout-item-price');
//     itemPriceElement.textContent = itemPrice;
//     checkoutItem.appendChild(itemPriceElement);

//     // append the checkout item to the checkout element
//     checkout.appendChild(checkoutItem);
// }



// function HandleCheckCheckOutClick(){

//     let transactions = JSON.parse(localStorage.getItem("transactions")) ? JSON.parse(localStorage.getItem('transactions')) : []

//     checkoutCart.forEach((item) => {
//         item = {
//                 itemId: item.itemId,
//                 itemImageSrc: item.itemImageSrc,
//                 price: item.price,
//                 size: item.size,
//                 stock: false,
//                 value: item.value,
//                 profit: item.profit,
//                 inCart: true
//         }

//         fetch(`${itemUrl}, ${item.itemId}`, {
//             method: "PUT",
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(item, item.itemId),
//         }).then((response) => {
    
//                 console.log(response);
//                 location.reload()
//                 location.reload()
    
//             }).catch((error) => {
    
//                 console.log(error);
    
//             });

//         transactionProfit += item.price

//     })

//     transaction = {
//         profit: transactionProfit,
//         customerId: activeUser.customerId
//     }

//     fetch(`${transactionUrl}`, {
//         method: "POST",
//         headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(transaction),
//     }).then((response) => {

//             console.log(response);
//             location.reload()
//             location.reload()

//         }).catch((error) => {

//             console.log(error);

//         });

        
// }  

 
   

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