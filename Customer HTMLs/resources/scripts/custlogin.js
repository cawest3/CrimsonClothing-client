const custUrl = "";

async function handleOnCustLogin() {
  await GetCustLogins();
}

async function GetCustLogins() {
  try {
    const response = await fetch(custUrl);
    const data = await response.json();
    custLogins = [];
    data.forEach((cLogin) => {
      cLogin = {
        username: cLogin.username,
        password: cLogin.password,
      };
      custLogins.unshift(cLogin);
    });

    localStorage.clear();
    localStorage.setItem("customerLogins", JSON.stringify(custLogins));
  } catch {
    console.log("error");
  }
}

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
  event.preventDefault(); // Prevent the form from submitting by default

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (await CustomerLogin(email, password)) {
    window.location.href = "./home.html"; // Redirect to the home page
  } else {
    alert("Invalid email or password. Please try again.");
  }
});

handleOnCustLogin();
