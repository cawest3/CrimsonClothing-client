let itemUrl = "http://localhost:5165/item"
let consignmentUrl = "http://localhost:5165/consignment"
let transactionUrl = "http://localhost:5165/transaction"
let adminUrl = "http://localhost:5165/admin"
let customerUrl = "http://localhost:5165/api/Customer"
let aLogins = JSON.parse(localStorage.getItem("adminLogins")) ? JSON.parse(localStorage.getItem('adminLogins')) : []

function HandleOnLoad()
{
  GetCustLogins();
}
 
async function GetCustLogins() {
  try {
    const response = await fetch(adminUrl);
    const data = await response.json();
    localStorage.clear();
    localStorage.setItem('customerLogins', JSON.stringify(data));
    console.log(data);
  } catch {
    console.log("error");
  }
} // Add missing closing brace

const aLoginForm = document.getElementById("Alogin-form");
cLoginForm.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const inputUsername = event.target.querySelector('input[name="email"]');
  const inputPassword = event.target.querySelector('input[name="password"]');
  console.log('hi')
  if (CustomerLogin(inputUsername, inputPassword)) {
    
    window.location.href = './shop.html' // Redirect to the home page
  } else {
    alert("Invalid email or password. Please try again.");
  }
}

async function CustomerLogin(inputUsername, inputPassword) {
  const custLogins = JSON.parse(localStorage.getItem("customerLogins"));
  for (const cLogin of custLogins) {
    if (cLogin.custUsername === inputUsername.value && cLogin.password === inputPassword.value) {
      return true;
    }
  }
  return false;
}





// const adminUrl = ""

// async function HandleOnAdminLogin()
// {
//     GetAdminLogins()

// }
 
// async function GetAdminLogins()
// {
//     try{
//         const response = await fetch(adminUrl)
//         const data = await response.json()
//         adminLogins = []
//         data.forEach((aLogin) => {
//             aLogin = {
//                 username: aLogin.username,
//                 password: aLogin.password,
//                 }
//                 aLogin.unshift(aLogin)
//             })
            
//             localStorage.clear()
//             localStorage.setItem('theAdminLogins', JSON.stringify(adminLogins))
//         }
//         catch{
//             console.log("error")
//         }
// }

// async function AdminLogin(username, password) 
// {
//   const adminLogins = JSON.parse(localStorage.getItem("adminLogins"));
//   for (const aLogin of adminLogins) 
//   {
//     if (aLogin.username === username && aLogin.password === password) 
//     {
//       return true;
//     }
//   }
//   return false;
// }

//   document.getElementById("alogin-form").addEventListener("submit", async function (event) {
//   event.preventDefault();  // Prevent the form from submitting by default

//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
// if (await AdminLogin(email, password)) 
//   {
//     window.location.href = "./home.html"; // Redirect to the home page
//   } 
//   else 
//   {
//     alert("Invalid email or password. Please try again.");
//   }
//   });





