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
    loadCartItems()
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

async function loadCartItems() {
    const cartItemsContainer = document.querySelector(".col-lg-7");
    const apiUrl = "http://localhost:5165/transaction"; // Replace with your API URL

    let subtotal = 0;

    try {
        const response = await fetch(apiUrl);
        const cartItems = await response.json();

        cartItems.forEach((item) => {
            subtotal += item.price;
            const cartItemHtml = `
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                                <div>
                                    <img src="${item.imageUrl}" class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                                </div>
                                <div class="ms-3">
                                    <h5>${item.size}</h5>
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center">
                                <div style="width: 80px;">
                                    <h5 class="mb-0">$${item.price}</h5>
                                </div>
                                <a href="#!" style="color: #ec1414;"><i class="fas fa-trash-alt"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            cartItemsContainer.insertAdjacentHTML("list", cartItemHtml);
        });

        const subtotalHtml = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <p>Subtotal</p>
                <p class="mb-0">$${subtotal.toFixed(2)}</p>
            </div>
        `;

        cartItemsContainer.insertAdjacentHTML("list", subtotalHtml);

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