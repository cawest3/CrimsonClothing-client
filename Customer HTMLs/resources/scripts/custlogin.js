let itemUrl = "http://localhost:5165/item"
let consignmentUrl = "http://localhost:5165/consignment"
let transactionUrl = "http://localhost:5165/transaction"
let adminUrl = "http://localhost:5165/admin"
let customerUrl = "http://localhost:5165/customer"
let custLogins = JSON.parse(localStorage.getItem("customerLogins")) ? JSON.parse(localStorage.getItem('customerLogins')) : []

async function handleOnCustLogin() {
  GetCustLogins();
}
 
async function GetCustLogins() {
  try {
    const response = await fetch(customerUrl);
    const data = await response.json();
    const custLogins = [];
    data.forEach((cLogin) => {
      cLogin = {
        username: cLogin.username,
        password: cLogin.password,
      };
      custLogins.push(cLogin); // Use push to add each object to the end of the array
    });
    localStorage.clear();
    localStorage.setItem('customerLogins', JSON.stringify(custLogins));
  } catch {
    console.log("error");
  }
} // Add missing closing brace

async function CustomerLogin(username, password) {
  const custLogins = JSON.parse(localStorage.getItem("customerLogins"));
  for (const cLogin of custLogins) {
    if (cLogin.username === username && cLogin.password === password) {
      return true;
    }
  }
  return false;
}

document.getElementById("login-form").addEventListener("submit", async function (event) {
  event.preventDefault();  // Prevent the form from submitting by default
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (await CustomerLogin(email, password)) {
    console.log("here")
    window.location.href = "./home.html"; // Redirect to the home page
  } else {
    alert("Invalid email or password. Please try again.");
  }
});