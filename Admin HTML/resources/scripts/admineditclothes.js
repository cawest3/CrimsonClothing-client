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
        
        const newItemId = document.getElementById('itemid').value;
        const newItemImageSrc = document.getElementById('itemImageSrc').value;
        const newPrice = document.getElementById('price').value;
        const newSize = document.getElementById('size').value;
        const newCost = document.getElementById('cost').value;
      
        // Update the temp object with the new values
        temp.itemId = newItemId;
        temp.itemImageSrc = newItemImageSrc;
        temp.price = newPrice;
        temp.size = newSize;
        temp.cost = newCost;
      
        console.log('updated item:', temp);
        
  
        // Update the item data on the server
          PutItemEdit(temp,itemId);
      });
      
      // Add the form to the modal
      modal.appendChild(form);
      
      // Show the modal
      modal.style.display = 'block';
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

function PutItemEdit(temp, itemId) {
  // Update the item with the specified ID on the server
  fetch(`${itemUrl}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(temp, itemId)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(`Item ${itemId} updated successfully.`);
    console.log('reload new items');
    location.reload();
    closeModal();
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function AddItem() {
  console.log('in add button')
  // Create a modal element and add it to the page
  const modal = document.createElement('div');
  modal.classList.add('modal');
  document.body.appendChild(modal);
  
      const form = document.createElement('form');
      form.innerHTML = `
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Item</h5>
        </div>
        <div class="modal-body">
          <label for="name">Item Name:</label>
          <input type="text" id="name" name="name" value="">
          <br>
          <label for="itemImageSrc">Item Image:</label>
          <input type="text" id="itemImageSrc" name="itemImageSrc" value="">
          <br>
          <label for="price">Price:</label>
          <input type="text" id="price" name="price" value="">
          <br>
          <label for="size">Size:</label>
          <input type="text" id="size" name="size" value="">
          <br>
          <label for="cost">Cost:</label>
          <input type="text" id="cost" name="cost" value="">
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
        
        
          // Get input values
          const addItemName = document.getElementById("name").value;
          const itemImage = document.getElementById("itemImageSrc").value;
          const itemSize = document.getElementById("size").value;
          const itemPrice = document.getElementById("price").value;
          const itemCost = document.getElementById("cost").value;
        
          // Add new item to inventory
          const newItem = { 
            //itemId: "",
            itemName: addItemName,  
            itemImageSrc: itemImage,
            price:itemPrice,
            size: itemSize,
            cost: itemCost,
            profit: itemPrice - itemCost,
            inCart: false,
            stock: true,
            consignmentId: 0
          };
          items.push(newItem);
        
          // Clear input fields
          document.getElementById("name").value = "";
          document.getElementById("itemImageSrc").value = "";
          document.getElementById("size").value = "";
          document.getElementById("price").value = "";
          document.getElementById("cost").value = "";

          console.log(newItem);
        
          // Close modal
          //closeAddModal();
      
        // Update the item data on the server
          PutAddedItem(newItem);
      });
      
      // Add the form to the modal
      modal.appendChild(form);
      
      // Show the modal
      modal.style.display = 'block';
}

function PutAddedItem(newItem) {
  // Update the item with the specified ID on the server
  fetch(itemUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItem)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(`Item ${itemId} updated successfully.`);
    console.log('reload new items');
    location.reload();
    closeModal();
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function closeAddModal() {
  const modal = document.querySelector('.usermodal');
  modal.remove();
}

function AddAdminUser() {
    console.log('inside add admin user')
    const modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.appendChild(modal);
    
        const form = document.createElement('form');
        form.innerHTML = `
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Admin User</h5>
          </div>
          <div class="modal-body">
            <label for="ausername">Username:</label>
            <input type="text" id="ausername" name="ausername" value="">
            <br>
            <label for="apassword">Password:</label>
            <input type="text" id="apassword" name="apassword" value="">
            <br>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Save New User</button>
            <button onclick="closeModal()"type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  
        // Add a submit event listener to the form to update the item data
        form.addEventListener("submit", handleSubmit);
        async function handleSubmit(event) {
          event.preventDefault();
          
          
            // Get input values
            const newUsername = document.getElementById("ausername").value;
            const newPassword = document.getElementById("apassword").value;
          
            // Add new item to inventory
            const newAdminLogin = { 
              adminUsername: newUsername,  
              adminPassword: newPassword,
            };
            
            // Clear input fields
            document.getElementById("ausername").value = "";
            document.getElementById("apassword").value = "";
  
            console.log(newAdminLogin);
            //closeAddUserModal();
        
          // Update the item data on the server
          try {
            console.log('made')
            const response = await fetch(adminUrl, {
              method: "POST",
              body: JSON.stringify(newAdminLogin),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.ok) {
              console.log('made it')
              alert("Account created successfully!");
              //window.location.href = "./resources/adminlogin.html";
            } else {
              alert("An error occurred. Please try again.");
            }
          } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
          }
        };
      
        // Add the form to the modal
        modal.appendChild(form);
        
        // Show the modal
        modal.style.display = 'block';
}

function closeAddUserModal() {
  const modal = document.querySelector('.usermodal');
  modal.remove();
}
