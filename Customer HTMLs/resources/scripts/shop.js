// Item (price, size, stock, value, profit) 
// Consignment (user, price, cost) 
// Transaction (user, profit) 
// Admin(username, password)  
// Customer(username, password, storecredit) 

let itemUrl = ""
let consignmentUrl = ""
let transactionUrl = ""
let adminUrl = ""
let customerUrl = ""

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
                price: item.price,
                size: item.size,
                stock: item.stock,
                value: item.value,
                profit: item.profit
            }
            item.unshift(item)
        })
        
        localStorage.clear()
        localStorage.setItem('localSongs', JSON.stringify(items))
    }
    catch{
        console.log("error")
    }
}

function RenderItems(){
    let itemsContainer = document.querySelector("#items-container")
    let innerHTML = ""
    //item.image src
    
    items.forEach((item) => {
        if (item.stock = true) {
        innerHTML += `
            <div class="col">
            <div class="card shadow-sm">
                <img src="${item.imageSrc}" class="bd-placeholder-img card-img-top" width="100%" height="225">
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
    
}

