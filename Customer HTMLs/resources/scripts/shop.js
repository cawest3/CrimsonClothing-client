let consignmentUrl = "http://localhost:5165/consignment"
let transactionUrl = "http://localhost:5165/transaction"
let adminUrl = "http://localhost:5165/admin"
let customerUrl = "http://localhost:5165/Customer"
let itemUrl = "http://localhost:5165/api/item"
let items = JSON.parse(localStorage.getItem("items")) ? JSON.parse(localStorage.getItem('items')) : []

function HandleOnLoad(){
    GetItems()
    document.addEventListener("DOMContentLoaded", ()=> {
        RenderItems();
    })
}


async function GetItems() {
    try {
      const response = await fetch(itemUrl);
      const data = await response.json();
      localStorage.clear();
      localStorage.setItem('items', JSON.stringify(data));
      console.log(data);
    } catch {
      console.log("error");
    }

  } // Add missing closing brace


function RenderItems(){
    let itemsContainer = document.querySelector("#items-container")
    let innerHTML = ""
    console.log('hi')
    
    items.forEach((item) => {
        if (item.stock = true) {
        innerHTML += `
            <div class="col">
            <div class="card shadow-sm">
                <img src="${item.itemImageSrc}" class="bd-placeholder-img card-img-top" width="100%" height="225">
                <div class="card-body">
                <p class="card-text">${item.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary onclick="EditButton(${item.itemId})"">Add To Cart</button>
                    </div>
                    
                    <small class="text-body-secondary">$${item.price}</small>
                </div>
                </div>
            </div>
            </div>
        `
        }
    })
    itemsContainer.innerHTML = innerHTML
}

function HandleAddToCartClick(itemId){

    console.log("made it to add to cart click")
    let activeUser = JSON.parse(localStorage.getItem("activeUser"))

    let addingItem = items.find((item) => item.itemId == itemId)
    console.log(addingItem)

    activeUser.cart += addingItem.itemId
    console.log(activeUser.cart)
    addingItem.stock = false
    addingItem.inCart = true

    console.log(activeUser)

    //Add in Update Put for the Item
    fetch(`${ItemUrl}/${addingItem.itemId}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(addingItem),
    }).then((response) => {

            console.log(response);
            location.reload()
            location.reload()

        }).catch((error) => {

            console.log(error);

        });

    //add update for user
    fetch(`${CustomerUrl}/${activeUser.customerId}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(activeUser),
    }).then((response) => {

            console.log(response);
            location.reload()
            location.reload()

        }).catch((error) => {

            console.log(error);

        });

}


