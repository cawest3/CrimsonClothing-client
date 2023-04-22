let itemUrl = "http://localhost:5165/item"
let consignmentUrl = "http://localhost:5165/consignment"
let transactionUrl = "http://localhost:5165/transaction"
let adminUrl = "http://localhost:5165/admin"
let customerUrl = "http://localhost:5165/api/Customer"
let aLogins = JSON.parse(localStorage.getItem("adminLogins")) ? JSON.parse(localStorage.getItem('adminLogins')) : []

function HandleOnLoad() {
  GetAdminLogins();
  console.log('repushing')
}

async function GetAdminLogins() {
  try {
    const response = await fetch(adminUrl);
    const data = await response.json();
    localStorage.clear();
    localStorage.setItem('adminLogins', JSON.stringify(data));
    console.log(data);
  } catch {
    console.log("error");
  }
}

const aLoginForm = document.getElementById("Alogin-form");
aLoginForm.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const adminInputUsername = event.target.querySelector('input[name="email"]');
  const adminInputPassword = event.target.querySelector('input[name="password"]');
  console.log('hi')
  if (AdminLogin(adminInputUsername, adminInputPassword)) {
    window.location.href = './reports.html' // Redirect to the home page
  } else {
    alert("Invalid email or password. Please try again.");
  }
}

async function AdminLogin(adminInputUsername, adminInputPassword) {
  const aLogins = JSON.parse(localStorage.getItem("adminLogins"));
  for (const aLogin of aLogins) {
    if (aLogin.adminUsername === adminInputUsername.value && aLogin.adminPassword === adminInputPassword.value) {
      return true;
    }
  }
  return false;
}

