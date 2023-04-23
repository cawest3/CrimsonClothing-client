let consignmentUrl = "http://localhost:5165/consignment";
let transactionUrl = "http://localhost:5165/transaction";
let adminUrl = "http://localhost:5165/admin";
let customerUrl = "http://localhost:5165/Customer";
let itemUrl = "http://localhost:5165/api/item";
let items = [];
let cart = [];

function handleOnLoad() {
  getItems().then(() => {
    console.log("In handle on load");
    renderItems();
  });
}

async function getItems() {
  try {
    const response = await fetch(itemUrl);
    const data = await response.json();
    localStorage.clear();
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
              <p class="card-text">${item.name}</p>
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
  console.log("activeuser")

  const addingItem = items.find((item) => item.itemId === itemId);
  console.log(addingItem);

  activeUser.cart.push(addingItem.itemId);
  console.log(activeUser.cart);
  addingItem.stock = false;
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
}
