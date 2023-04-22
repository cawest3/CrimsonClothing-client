let consignmentUrl = "http://localhost:5165/consignment";
let transactionUrl = "http://localhost:5165/transaction";
let adminUrl = "http://localhost:5165/admin";
let customerUrl = "http://localhost:5165/Customer";
let itemUrl = "http://localhost:5165/api/item";
let items = [];

function HandleOnLoad() {
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
              <p class="card-text">${item.size}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary edit-item-btn" data-item-id="${item.itemId}">Edit Item</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary delete-item-btn" data-item-id="${item.itemId}">Delete Item</button>
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


  // Add click event listeners for edit and delete buttons
  document.addEventListener('click', function (event) {
    if (event.target.matches('.edit-item-btn')) {
  // Edit button functionality
      console.log("made it to add to edit inventory click");
  //const activeUser = JSON.parse(localStorage.getItem("activeUser"));
      const itemId = event.target.dataset.itemId;
      const editingItem = items.find((item) => item.itemId === itemId);
      console.log(editingItem);
      //EditItem(itemId);
    } else if (event.target.matches('.delete-item-btn')) {
      // Delete button functionality
      const itemId = event.target.dataset.itemId;
      fetch(`${itemUrl}/${itemId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            // Remove item card from DOM
            //const itemCard = document.querySelector(`.item-card[data-item-id="${itemId}"]`);
            //itemCard.parentElement.remove();
            console.log('made it to end off delete')
          }
        });
    }
  });


// function displayItems(items) {
//   const container = document.querySelector('.row-cols-md-3');

//   items.forEach(item => {
//     // Create DOM elements for item
//     // ...
//     // Add delete button
//     const deleteBtn = document.createElement('button');
//     deleteBtn.type = 'button';
//     deleteBtn.className = 'btn btn-sm btn-outline-danger delete-item-btn';
//     deleteBtn.dataset.itemId = item.id;
//     deleteBtn.textContent = 'Delete';

//     btnGroup.appendChild(deleteBtn);

//     // ...

//     container.appendChild(col);
//   });
// }

// fetch(`${customerUrl}/${activeUser.customerId}`, {
//   method: "PUT",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(activeUser),
// })
//   .then((response) => {
//     console.log(response);
//     location.reload();
//   })
//   .catch((error) => {
//     console.log(error);
//   });

 // Add in Update Put for the Item
  // fetch(`${itemUrl}/${editingItem.itemId}`, {
  //   method: "PUT",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(editingItem),
  // })
  //   .then((response) => {
  //     console.log(response);
  //     location.reload();
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });