// Replace with the actual API URL
const apiUrl = "https://api.example.com/items";

async function fetchItems() {
    const response = await fetch(apiUrl);
    const items = await response.json();

    const cartItemsContainer = document.getElementById("cart-items");

    items.forEach(item => {
        cartItemsContainer.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row align-items-center">
                            <div>
                                <img src="${item.image}" class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
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
                            <a href="#!" style="color: #f01111;"><i class="fas fa-trash-alt"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

fetchItems();
