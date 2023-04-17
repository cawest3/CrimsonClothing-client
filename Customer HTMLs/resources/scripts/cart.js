let itemUrl = ""
let consignmentUrl = ""
let transactionUrl = ""
let adminUrl = ""
let customerUrl = ""
let checkoutCart = []
let transactionProfit

let activeUser = JSON.parse(localStorage.getItem("activeUser"))

function HandleOnLoad(){
    SetUpUser()
    GetTransactions()
    RenderCart()
}

function RenderCart(){
    let CartContainer = document.querySelector("#cart-container")
    let innerHTML = ""
    //item.image src
    items.forEach((item) => {
        if (item.stock = true) {
        innerHTML += `
                <div class="card mb-3">
                <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                    <div>
                        <img
                        src="${item.itemImageSrc}"
                        class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                    </div>
                    <div class="ms-3">
                        <h5>${item.itemId}</h5>
                        <h5>${item.size}</h5>
                        <h5>${item.price}</h5>
                        <p class="small mb-0">256GB, Navy Blue</p>
                    </div>
                    </div>
                    <div class="d-flex flex-row align-items-center">
                    <div style="width: 50px;">
                        <h5 class="fw-normal mb-0">2</h5>
                    </div>
                    <div style="width: 80px;">
                        <h5 class="mb-0">$900</h5>
                    </div>
                    <a href="#!" style="color: #ec1414;"><i class="fas fa-trash-alt"></i></a>
                    </div>
                </div>
                </div>
            </div>
        `
        }
    })
    CartContainer.innerHTML = innerHTML
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
        transactions = []
        data.forEach((transaction) => {
            transaction = {
                transactionId: transactions.count++,
                profit: transactionProfit,
                customerId: activeUser.customerId,
            }
            transactions.unshift(transaction)
        })
        
        localStorage.clear()
        localStorage.setItem('localtransactions', JSON.stringify(transactions))
    }
    catch{
        console.log("error")
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
    console.log("made it to post")
    console.log(song)

    transaction = {
        transactionId: transactions.count++,
        profit: transactionProfit,
        customerId: activeUser.customerId,
    }

    fetch(transactionUrl, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
    }).then((response) => {
        
            location.reload()
            location.reload()
            console.log(response)

        }).catch((error) => {
            console.log(error)
        })

    ClearCart()
}

function ClearCart(){
    activeUser.cart = []
    location.reload()
    //insert good checkout message
}
