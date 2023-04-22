let itemUrl = "http://localhost:5165/item"
let consignmentUrl = "http://localhost:5165/consignment"
let transactionUrl = "http://localhost:5165/transaction"
let adminUrl = "http://localhost:5165/admin"
let customerUrl = "http://localhost:5165/api/Customer"
let custLogins = JSON.parse(localStorage.getItem("customerLogins")) ? JSON.parse(localStorage.getItem('customerLogins')) : []

function HandleOnLoad()
{
  GetCustLogins();
}
 
async function GetCustLogins() {
  try {
    const response = await fetch(customerUrl);
    const data = await response.json();
    localStorage.clear();
    localStorage.setItem('customerLogins', JSON.stringify(data));
    console.log(data);
  } catch {
    console.log("error");
  }
} // Add missing closing brace

const cLoginForm = document.getElementById("login-form");
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

