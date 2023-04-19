let itemUrl = "http://localhost:5165/item"
let consignmentUrl = "http://localhost:5165/consignment"
let transactionUrl = "http://localhost:5165/transaction"
let adminUrl = "http://localhost:5165/admin"
let customerUrl = "http://localhost:5165/customer"

async function handleOnCustLogin() {
  await GetCustLogins();
  CustomerLogin();
}
 
  
async function GetCustLogins()
{
    try{
        const response = await fetch(customerUrl)
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


async function CustomerLogin(username, password) 
{
  const custLogins = JSON.parse(localStorage.getItem("customerLogins"));
  for (const cLogin of custLogins) 
  {
    if (cLogin.username === username && cLogin.password === password) 
    {
      return true;
    }
  }
  return false;
}

  document.getElementById("login-form").addEventListener("submit", async function (event) {
  event.preventDefault();  // Prevent the form from submitting by default

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (await CustomerLogin(email, password)) 
  {
    window.location.href = "./home.html"; // Redirect to the home page
  } 
  else 
  {
    alert("Invalid email or password. Please try again.");
  }
  });
}