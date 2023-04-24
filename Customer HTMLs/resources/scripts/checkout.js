let itemUrl = "http://localhost:5165/api/item"
let consignmentUrl = "http://localhost:5165/consignment"
let transactionUrl = "http://localhost:5165/transaction"
let adminUrl = "http://localhost:5165/admin"
let customerUrl = "http://localhost:5165/customer"
let transactionProfit = 0;
let activeUser = JSON.parse(localStorage.getItem("activeUser"));
let items = []

function HandleOnLoad(){
  getItems();
  loadItems();
}  


async function getItems() {
  try {
    const response = await fetch(itemUrl);
    const data = await response.json();
    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(data));
    items = data;
    console.log(data);
  } catch {
    console.log(error)
  }
}


function loadItems() {


  console.log(activeUser.cart)
  if (!Array.isArray(activeUser.cart)) {
      // If activeUser.cart is not already an array, convert it from a string to an array
      activeUser.cart = activeUser.cart.split(',');
    } else {
      // If activeUser.cart is already an array, do nothing
    }

    const cart = activeUser.cart

    console.log("in render");
    items = JSON.parse(localStorage.getItem("items"));
    console.log(items);

    const checkoutCart = [];
    cart.forEach(itemId => {
      const matchingItem = items.find(item => item.itemId === Number(itemId));
      if (matchingItem) {
        checkoutCart.push(matchingItem);
      }
    });

    localStorage.setItem("checkoutCart", JSON.stringify(checkoutCart));

    console.log(checkoutCart)
    const cartItemsContainer = document.querySelector(".itemContainer");
    let innerHTML = "";
    let subtotal = 0;
    console.log('hi')
    try {
        checkoutCart.forEach((item) => {
            subtotal += item.price;
              innerHTML += `
                <div class="col-md-4 order-md-2 mb-4">
                <ul class="list-group mb-3">
                  <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 class="my-0">${item.itemName}</h6>
                    </div>
                    <span class="text-muted">Price: $${item.price}</span>
                  </li>
                  </ul>
              `;
            
          });
        cartItemsContainer.innerHTML = innerHTML;
    } catch {
  console.log("error")
}

}

function HandlePlaceOrder(){

    let checkoutCart = JSON.parse(localStorage.getItem("checkoutCart"));
    let activeUser = JSON.parse(localStorage.getItem("activeUser"));

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
            alert("You have checked out!")
            console.log(response);
            location.reload()

        }).catch((error) => {
            console.log(error);
        });
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
            transactions.push(transaction)
        })
        localStorage.setItem('localItems', JSON.stringify(transactions))
    }
    catch{
        console.log("error")
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