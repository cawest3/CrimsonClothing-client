let itemUrl = "http://localhost:5165/api/item";
let consignmentUrl = "http://localhost:5165/consignment";
let transactionUrl = "http://localhost:5165/transaction";
let adminUrl = "http://localhost:5165/api/admin";
let customerUrl = "http://localhost:5165/api/Customer";

function HandleOnLoad() {
  getAdminLogins();
}

async function getAdminLogins() {
  try {
    const response = await fetch(adminUrl);
    const data = await response.json();
    localStorage.setItem('adminLogins', JSON.stringify(data));
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
  
  const isLoggedIn = await adminLogin(adminInputUsername.value, adminInputPassword.value);
  
  if (isLoggedIn) {
    const activeAdmin = JSON.parse(localStorage.getItem("adminLogins")).find(admin => admin.adminUsername === adminInputUsername.value);
    localStorage.setItem('adminActiveUser', JSON.stringify(activeAdmin));
    window.location.href = './reports.html';
  } else {
    alert("Invalid email or password. Please try again.");
  }
}

async function adminLogin(username, password) {
  try {
    const response = await fetch(adminUrl);
    const data = await response.json();

    return data.some(admin => admin.adminUsername === username && admin.adminPassword === password);
  } catch (error) {
    console.error('Error while validating credentials:', error);
    return false;
  }
}
