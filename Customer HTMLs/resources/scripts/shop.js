let itemUrl = "http://localhost:5165/item"
let consignmentUrl = "http://localhost:5165/consignment"
let transactionUrl = "http://localhost:5165/transaction"
let adminUrl = "http://localhost:5165/admin"
let customerUrl = "http://localhost:5165/customer"

function HandleOnLoad(){
    GetItem()
    RenderItems()
}

async function GetItems(){
    try{
        const response = await fetch(itemUrl)
        const data = await response.json()
        items = []
        data.forEach((item) => {
            item = {
                itemId: item.itemId,
                itemImageSrc: item.itemImageSrc,
                price: item.price,
                size: item.size,
                stock: item.stock,
                value: item.value,
                profit: item.profit,
                inCart: item.inCart
            }
            item.unshift(item)
        })
        
        localStorage.clear()
        localStorage.setItem('localItems', JSON.stringify(items))
    }
    catch{
        console.log("error")
    }
}

function RenderItems(){
    let itemsContainer = document.querySelector("#items-container")
    let innerHTML = ""
    //item.image src
    
    //do fetch for image src and display


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

