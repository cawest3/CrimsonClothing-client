async function getData() {
    const allTransactionsApiUrl = ''
    const response = await fetch(allTransactionsApiUrl)
    const data = await response.json()
    return data
}

//let data = getData()

let data = [
    {
        id: 1,
        profit: 10
    },
    {
        id: 1,
        profit: 10
    },
    {
        id: 1,
        profit: 10
    },
    {
        id: 1,
        profit: 10
    }
]

transactionAmountReport()
totalProfitReport()

function transactionAmountReport(){
    let transactionAmount = 0
    data.forEach(data =>{
        transactionAmount++
    })
    console.log(transactionAmount)
}

function totalProfitReport(){
    let totalProfit = 0
    data.forEach(data =>{
        totalProfit += data.profit
    })
    console.log(totalProfit)
}