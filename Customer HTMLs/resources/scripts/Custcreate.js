let itemUrl = "http://localhost:5165/item";
let consignmentUrl = "http://localhost:5165/consignment";
let transactionUrl = "http://localhost:5165/transaction";
let adminUrl = "http://localhost:5165/admin";
let customerUrl = "http://localhost:5165/api/Customer";

const registrationForm = document.getElementById("registration-form");
registrationForm.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();


  const emailInput = event.target.querySelector('input[type="email"]');
  const passwordInput = event.target.querySelector('input[type="password"]');
  const customerId= 0;
  const custFNameInput = event.target.querySelector('input[type="custFName"]');
  const custLNameInput = event.target.querySelector('input[type="custLName"]');
  const custusername = emailInput.value;
  const custPassword = passwordInput.value;
  const custFName = custFNameInput.value;
  const custLName = custLNameInput.value;
  const storeCredit = 0;
  const cart = "";

  const newUser = {
    customerId,
    custusername,
    custPassword,
    storeCredit,
    cart,
    custFName,
    custLName

  };

  try {
    const response = await fetch(customerUrl, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Account created successfully!");
      window.location.href = "./login.html";
    } else {
      alert("An error occurred. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
}
