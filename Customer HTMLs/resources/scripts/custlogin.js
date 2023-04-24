let itemUrl = "http://localhost:5165/item"
let consignmentUrl = "http://localhost:5165/consignment"
let transactionUrl = "http://localhost:5165/transaction"
let adminUrl = "http://localhost:5165/admin"
let customerUrl = "http://localhost:5165/api/Customer"
// let custLogins = JSON.parse(localStorage.getItem("customerLogins")) ? JSON.parse(localStorage.getItem('customerLogins')) : []


function HandleOnLoad() {
  getCustLogins();
}

async function getCustLogins() {
  try {
    const response = await fetch(customerUrl);
    const data = await response.json();
    localStorage.setItem('customerLogins', JSON.stringify(data));
  } catch {
    console.log("error");
  }
}

const cLoginForm = document.getElementById("login-form");
cLoginForm.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const inputUsername = event.target.querySelector('input[name="email"]');
  const inputPassword = event.target.querySelector('input[name="password"]');
  
  const isLoggedIn = await customerLogin(inputUsername.value, inputPassword.value);
  
  if (isLoggedIn) {
    const activeUser = JSON.parse(localStorage.getItem("customerLogins")).find(customer => customer.custusername === inputUsername.value);
    localStorage.setItem('activeUser', JSON.stringify(activeUser));
    window.location.href = './shop.html';
  } else {
    alert("Invalid email or password. Please try again.");
  }
}

async function customerLogin(email, password) {
  try {
    const response = await fetch(customerUrl);
    const data = await response.json();

    return data.some(customer => customer.custusername === email && customer.custPassword === password);
    } catch (error) {
    console.error('Error while validating credentials:', error);
    return false;
  }
}
