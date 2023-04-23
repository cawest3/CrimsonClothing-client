let activeUser = JSON.parse(localStorage.getItem("activeUser"))
console.log(activeUser)

async function getOrders(){
    let orders = []
    const allItemsApiUrl = 'http://localhost:5165/api/transaction'
    const response = await fetch(allItemsApiUrl)
    const data = await response.json()
    data.forEach(data =>{
        if(activeUser.customerId = data.customerId){
            orders.push(data.transactionId)
        }
    })
    console.log(orders)
    return orders
}

getInfo()



async function getInfo(){
    let fName = activeUser.custFName
    let lName = activeUser.custLName
    let storeCredit = '$' + activeUser.storeCredit
    let email = activeUser.custusername
    document.getElementById('Welcome').innerHTML = 'Welcome ' + fName + ' ' + lName + '!'
    document.getElementById('Email').innerHTML = email
    document.getElementById('StoreCredit').innerHTML = storeCredit
    let orders = await getOrders()
    document.getElementById('Orders').innerHTML = orders
}
