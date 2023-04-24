let consignmentUrl = "http://localhost:5165/consignment";
let transactionUrl = "http://localhost:5165/transaction";
let adminUrl = "http://localhost:5165/admin";
let customerUrl = "http://localhost:5165/api/Customer";
let itemUrl = "http://localhost:5165/api/item";
let items = [];
let cart = [];



function handleOnLoad() {
  let activeUser = JSON.parse(localStorage.getItem("activeUser"))
  localStorage.setItem('activeUser', JSON.stringify(activeUser))
  console.log(activeUser)
  getItems().then(() => {
    console.log("In handle on load");
    renderItems();
  });
}

async function getItems() {
  try {
    const response = await fetch(itemUrl);
    const data = await response.json();
    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(data));
    items = data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function renderItems() {
  const itemsContainer = document.querySelector(".items-container");
  let innerHTML = "";
  console.log("in render");
  items = JSON.parse(localStorage.getItem("items"));
  console.log(items);

  items.forEach((item) => {
    if (item.stock === true) {
      innerHTML += `
        <div class="col">
          <div class="card shadow-sm">
            <img src="${item.itemImageSrc}" class="bd-placeholder-img card-img-top" width="100%" height="225">
            <div class="card-body">
              <p class="card-text">${item.itemName}</p>
              <p class="card-text">${item.size}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary" onclick="handleAddToCartClick(${item.itemId})">Add To Cart</button>
                </div>
                <small class="text-body-secondary">$${item.price}</small>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  });
  itemsContainer.innerHTML = innerHTML;
}

function handleAddToCartClick(itemId) {
  console.log("made it to add to cart click");
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  console.log(activeUser)

  const addingItem = items.find((item) => item.itemId === itemId);
  console.log(addingItem);

<<<<<<< HEAD
=======
  console.log(activeUser)

>>>>>>> c559cf4ba0ad40a0d3fe3e40011ff2c37d93b753
  // Ensure activeUser.cart is an array
  if (!Array.isArray(activeUser.cart)) {
    activeUser.cart = [];
  }

<<<<<<< HEAD
  activeUser.cart.push(String(addingItem.itemId));
  console.log(activeUser.cart);
  addingItem.stock = false;
=======
  activeUser.cart.push(addingItem.itemId);
  console.log(activeUser.cart);
>>>>>>> c559cf4ba0ad40a0d3fe3e40011ff2c37d93b753
  addingItem.inCart = true;

  console.log(activeUser);
  // Add in Update Put for the Item
  fetch(`${itemUrl}/${addingItem.itemId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addingItem, addingItem.itemId),
  })
    .then((response) => {
      console.log(response);
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });

  // Convert activeUser.cart array to a string
  activeUser.cart = activeUser.cart.join(',');

  // add update for user
  fetch(`${customerUrl}/${activeUser.customerId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activeUser, activeUser.customerId),
  })
    .then((response) => {
      console.log(response);
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(cart);
}



