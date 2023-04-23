async function getData() {
    const allTransactionsApiUrl = 'http://localhost:5165/api/transaction'
    const response = await fetch(allTransactionsApiUrl)
    const data = await response.json()
    return data
}

async function getData2() {
    const allItemsApiUrl = 'http://localhost:5165/api/item'
    const response = await fetch(allItemsApiUrl)
    const data2 = await response.json()
    return data2
}

async function runReports(){
    const data = await getData()
    const data2 = await getData2()
    transactionAmountReport(data)
    totalProfitReport(data)
    totalItemsReport(data2)
}

// let data = getData()


// transactionAmountReport()
// totalProfitReport()

function transactionAmountReport(data){
    let transactionAmount = 0
    data.forEach(data =>{
        transactionAmount++
    })
    console.log(transactionAmount)
    document.getElementById('totalTransacs').innerHTML = transactionAmount;
}

function totalProfitReport(data){
    let totalProfit = 0
    data.forEach(data =>{
        totalProfit += data.profit
    })
    console.log(totalProfit)
    document.getElementById('totalProfit').innerHTML = totalProfit
}

function totalItemsReport(data2){
    let totalItems = 0
    data2.forEach(data2 =>{
        totalItems++
    })
    console.log(totalItems)
    document.getElementById('totalItems').innerHTML = totalItems
}

runReports()