const custUrl = ""

async function handleOnCustLogin()
{
    GetCustLogins()
}
 
async function GetCustLogins()
{
    try{
        const response = await fetch(custUrl)
        const data = await response.json()
        custLogins = []
        data.forEach((cLogin) => {
            cLogin = {
                username: cLogin.username,
                password: cLogin.password,
                }
                cLogin.unshift(cLogin)
            })
            
            localStorage.clear()
            localStorage.setItem('customerLogins', JSON.stringify(custLogins))
        }
        catch{
            console.log("error")
        }
}

async function CustomerLogin(username, password)
{
    const response = await
    cLogin 
    {
        
    }
}