let consignmentUrl = "http://localhost:5165/api/consignment";
let transactionUrl = "http://localhost:5165/api/transaction";
let adminUrl = "http://localhost:5165/api/admin";
let customerUrl = "http://localhost:5165/api/Customer";
let itemUrl = "http://localhost:5165/api/item";
let items = [];


async function HandleOnLoad() {

  let adminActiveUser = JSON.parse(localStorage.getItem("adminActiveUser"))
  console.log(adminActiveUser)
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
    if (item.approved === false) {
      innerHTML += `
        <div class="col">
          <div class="card shadow-sm">
            <img src="${item.itemImageSrc}" class="bd-placeholder-img card-img-top" width="100%" height="225">
            <div class="card-body">
              <p class="card-text">${item.itemName}</p>
              <p class="card-text">${item.size}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary edit-item-btn" onclick="ApproveButton(${item.itemId})" data-item-id="${item.itemId}">Approve</button>
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

function ApproveButton(itemId){
  console.log("In Approve Button")

    let temp = items.find((item) => item.itemId == itemId)
    console.log(temp)
    temp.approved = true;

    console.log(temp)

    PutItem(temp, itemId)
}

function PutItem(item, itemId){

    fetch(`${itemUrl}/${itemId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item, itemId),
    })
      .then((response) => {
        console.log(response);
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }