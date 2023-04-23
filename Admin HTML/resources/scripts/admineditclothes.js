let consignmentUrl = "http://localhost:5165/api/consignment";
let transactionUrl = "http://localhost:5165/api/transaction";
let adminUrl = "http://localhost:5165/api/admin";
let customerUrl = "http://localhost:5165/api/Customer";
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
                  <button type="button" class="btn btn-sm btn-outline-secondary edit-item-btn" onclick="EditButton(${item.itemId})" data-item-id="${item.itemId}">Edit Item</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary delete-item-btn" onclick="DeleteButton(${item.itemId})" data-item-id="${item.itemId}">Delete Item</button>
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

function DeleteButton(itemId){
  console.log("In Delete Button")

    let temp = items.find((item) => item.itemId == itemId)
    console.log(temp)
    temp.stock = false;

    console.log(temp)

    PutItem(temp, itemId)
}

function EditButton(itemId) {
  console.log('in edit button')
  // Create a modal element and add it to the page
  const modal = document.createElement('div');
  modal.classList.add('modal');
  document.body.appendChild(modal);
  
  let temp = items.find((item) => item.itemId == itemId)
  console.log(temp)
  // Fetch the item data for the item with the specified ID
  // fetch(itemUrl)
    // .then(let temp = items.find((item) => item.itemid == itemid),
    // console.log(temp))
  //console.log(itemid)
    // .then(response => response.json())
    // .then(temp=> {
      // Create a form element with input fields for each item property
      const form = document.createElement('form');
      form.innerHTML = `
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Item</h5>
        </div>
        <div class="modal-body">
          <label for="itemid">Item ID:</label>
          <input type="text" id="itemid" name="itemid" value="${temp.itemId}">
          <br>
          <label for="itemImageSrc">Item Image:</label>
          <input type="text" id="itemImageSrc" name="itemImageSrc" value="${temp.itemImageSrc}">
          <br>
          <label for="price">Price:</label>
          <input type="text" id="price" name="price" value="${temp.price}">
          <br>
          <label for="size">Size:</label>
          <input type="text" id="size" name="size" value="${temp.size}">
          <br>
          <label for="cost">Cost:</label>
          <input type="text" id="cost" name="cost" value="${temp.cost}">
          <br>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">Save Item</button>
          <button onclick="closeModal()"type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
`;


      // Add a submit event listener to the form to update the item data
      form.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(form);
        let temp = updatedItem
        const updatedItem = {
          itemId: updatedItem.itemId,
          itemImageSrc: formData.get('itemImageSrc'),
          price: formData.get('price'),
          size: formData.get('size'),
          cost: formData.get('cost'),
          profit: formData.get('price') - formData.get('cost'),
          consignmentid: updatedItem.consignmentid,
          inCart: updatedItem.inCart,
          stock: updatedItem.stock
        };

        // Update the item data on the server
        fetch(`${itemUrl}/${temp.itemId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(temp, temp.itemId),
        })
        .then(() => {
          // Remove the modal from the page
          modal.remove();
          
          // Reload the page to see the updated item data
          getItems().then;
        })
        .catch(error => {
          console.error('Error updating item:', error);
        });
      });
      
      // Add the form to the modal
      modal.appendChild(form);
      
      // Show the modal
      modal.style.display = 'block';
    // })
    // .catch(error => {
    //   console.error('Error fetching item:', error);
    // });
}

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.remove();
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

function AddItem()
{

}

  // // Add click event listeners for edit and delete buttons
  // document.addEventListener('click', function (event) {
  //   if (event.target.matches('.edit-item-btn')) {
  // // Edit button functionality
  //     console.log("made it to add to edit inventory click");
  // //const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  //     const itemId = event.target.dataset.itemId;
  //     const editingItem = items.find((item) => item.itemId === itemId);
  //     console.log(editingItem);
  //     //EditItem(itemId);
  //   } else if (event.target.matches('.delete-item-btn')) {
  //     // Delete button functionality
  //     const itemId = event.target.dataset.itemId;
  //     fetch(`${itemUrl}/${itemId}`, {
  //       method: 'DELETE'
  //     })
  //       .then(response => {
  //         if (response.ok) {
  //           // Remove item card from DOM
  //           //const itemCard = document.querySelector(`.item-card[data-item-id="${itemId}"]`);
  //           //itemCard.parentElement.remove();
  //           console.log('made it to end off delete')
  //         }
  //       });
  //   }
  // });


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