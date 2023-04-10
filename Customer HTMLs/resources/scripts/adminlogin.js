const adminUrl = ""

async function HandleOnAdminLogin()
{
    GetAdminLogins()

}
 
async function GetAdminLogins()
{
    try{
        const response = await fetch(adminUrl)
        const data = await response.json()
        adminLogins = []
        data.forEach((aLogin) => {
            aLogin = {
                username: aLogin.username,
                password: aLogin.password,
                }
                aLogin.unshift(aLogin)
            })
            
            localStorage.clear()
            localStorage.setItem('theAdminLogins', JSON.stringify(adminLogins))
        }
        catch{
            console.log("error")
        }
}
