async function fetchCartItems() {
    const response = await fetch('https://api.example.com/cart-items'); // Replace with the actual API URL
    const items = await response.json();
    return items;
  }
  
  function createCartItemElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'card mb-3';
    itemDiv.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row align-items-center">
            <div>
            </div>
            <div class="ms-3">
              <h5>${item.name}</h5>
              <p class="small mb-0">${item.description}</p>
            </div>
          </div>
          <div class="d-flex flex-row align-items-center">
            <div style="width: 50px;">
              <h5 class="fw-normal mb-0">${item.quantity}</h5>
            </div>
            <div style="width: 80px;">
              <h5 class="mb-0">$${item.price}</h5>
            </div>
            <a href="#!" style="color: #ec1414;"><i class="fas fa-trash-alt"></i></a>
          </div>
        </div>
      </div>`;
    return itemDiv;
  }
  
  async function populateCart() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const items = await fetchCartItems();
    let totalPrice = 0;
  
    items.forEach(item => {
      const itemElement = createCartItemElement(item);
      cartItemsContainer.appendChild(itemElement);
      totalPrice += item.price * item.quantity;
    });
  
    // Update the total price
    const totalPriceElement = document.querySelector('.d-flex.justify-content-between.mb-4 p:last-child');
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  }
  
  // Call the function to populate the cart when the page loads
  populateCart();
  