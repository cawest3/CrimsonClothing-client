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

async function AdminLogin(username, password) 
{
  const adminLogins = JSON.parse(localStorage.getItem("adminLogins"));
  for (const aLogin of adminLogins) 
  {
    if (aLogin.username === username && aLogin.password === password) 
    {
      return true;
    }
  }
  return false;
}

document.getElementById("alogin-form").addEventListener("submit", async function (event) {
event.preventDefault();  // Prevent the form from submitting by default

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
if (await AdminLogin(email, password)) 
  {
    window.location.href = "./home.html"; // Redirect to the home page
  } 
  else 
  {
    alert("Invalid email or password. Please try again.");
  }
  });



