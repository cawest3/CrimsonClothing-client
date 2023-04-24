itemUrl = "http://localhost:5165/api/item";
consignmentUrl = "http://localhost:5165/api/consignment";
transactionUrl = "http://localhost:5165/transaction";
adminUrl = "http://localhost:5165/admin";
customerUrl = "http://localhost:5165/api/Customer";

function calculateConsignment(event) {
event.preventDefault();
    
  const firstNameInput = document.getElementById('firstName').value;
  const lastNameInput = document.getElementById('lastName').value;
  const emailInput = document.getElementById('emailInput').value;
  const typeInput = document.getElementById('itemType').value;
  const sizeInput = document.getElementById('sizeInput').value;
const nameInput = document.getElementById('nameInput').value
  const qtyInput = Number(document.getElementById('qtyInput').value);
  const pictureInput = document.getElementById('pictureUpload').value;

  console.log(qtyInput)
  console.log(typeInput)

const price = findPrice(typeInput, qtyInput);
const cost = findCost(typeInput, qtyInput)

createConsignmentItem(price, cost)

  console.log()
  console.log(price);

  alert("The total value of the consignment is $" + price.toFixed(2));
}

function findPrice(type, qty) {
  let price = 0;
  console.log(price)
  console.log(type)
  console.log(qty)

  if (type === 'shirt' || type === 'pant' || type === 'skirt') {
    price = 5 * qty;
  } else if (type === 'dress' || type === 'belt') {
    price = 7 * qty;
  } else if (type === 'jacket' || type === 'shoe') {
    price = 10 * qty;
  }
  updateStoreCredit(price)
  return price;
}

function findCost(type, qty){
    let cost = 0
    console.log(cost)
    console.log(type)
    
    if(type === 'shirt' || type === 'pant' || type === 'skirt'){
        cost = 25 * qty
    } else if(type === 'dress'){
        cost = 30 * qty
    } else if(type === 'belt'){
        cost = 10 * qty
    } else if(type === 'jacket' || type === 'shoe'){
        cost = 35 * qty
    }

    return cost
}

const calculateButton = document.getElementById('calculateConsignment');

if (calculateButton) {
    calculateButton.addEventListener('click', calculateConsignment);
      // updateStoreCredit(price);
} else {
  console.error('Error: Could not find calculateButton element');
}


function updateStoreCredit(price) {

    console.log(price)
    let activeUser = JSON.parse(localStorage.getItem("activeUser"))
    console.log(activeUser)
    activeUser.storeCredit = parseFloat(activeUser.storeCredit);

    console.log(activeUser.storeCredit)
    activeUser.storeCredit = (activeUser.storeCredit + price)
    localStorage.setItem('activeUser', JSON.stringify(activeUser))

    console.log(activeUser.storeCredit)
    // const data = {
    //   storeCredit: price
    // };
    let Id = activeUser.customerId
  
    fetch(`${customerUrl}/${Id}`, {
    method: "PUT",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(activeUser), // Remove the Id argument here
})
.then((response) => {
    console.log(response);
})
.catch((error) => {
    console.log(error);
});
}

function createConsignmentItem(cost, price){
    let activeUser = JSON.parse(localStorage.getItem("activeUser"))
    let newItem = {
        itemImageSrc: document.getElementById('pictureUpload').value,
        price: price,
        size: document.getElementById('sizeInput').value,
        stock: true,
        cost: cost,
        profit: price - cost,
        inCart: false,
        consignmentId: 0,
        itemName: document.getElementById('nameInput').value
    }
    console.log(newItem)
    let newConsignment = {
        customerId: activeUser.customerId,
        price: price,
        cost: cost,
        profit: price - cost,
        consignmentImageSrc: document.getElementById('pictureUpload').value
    }
    console.log(newConsignment)
    fetch(itemUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
    })
    .then(response => {
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        console.log(`Item ${itemId} updated successfully.`)
    })

    fetch(consignmentUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newConsignment)
    })
    .then(response => {
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        console.log(`Consignment ${consignmentId} updated successfully.`)
    })
}

    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //   console.log('Store credit updated successfully:', activeUser);
    // })
    // .catch(error => {
    //   console.error('There was a problem updating the store credit:', error);
    // });
  // }
  


// function AddAnotherItem()
// {
//     console.log('hi')
//     const type =
//     {
//         'Shirt':'shirt',
//         'Pants' : 'pant',
//         'Skirts' : 'skirt',
//         'Dresses' : 'dress',
//         'Jackets' : 'jacket',
//         'Shoes' : 'shoes',
//         'Belt' : 'belt',
//     }
//     document.addEventListener('DOMContentLoaded', function(){
//         const typeDropdown = document.getElementById('type-Dropdown')
//         let form = document.createElement('form')
        
//         // for (let category in type)
//         // {
//         // let option = document.createElement("option")
//         // option.setAttribute('value', type[category])
//         // let optionText = document.createTextNode(category)
//         // option.appendChild(optionText)
//         // typeDropdown.appendChild(option)
//         // }
   

//     let textInput = document.createElement('input')
//     textInput.type = 'text'
//     textInput.placeholder = 'Enter Size of Item'
//     textInput.id = 'additionalSize'
//     form.appendChild(textInput)

//     let textInput1 = document.createElement('input')
//     textInput1.type = 'text'
//     textInput1.placeholder = 'Enter picture link'
//     textInput1.id = 'additionalPic'
//     form.appendChild(textInput1)

//     let submitButton = document.createElement('button')
//     submitButton.textContent = 'Submit'
//     form.appendChild(submitButton)

//     let consignmentCount = '1'
//     form.addEventListener('submit', function(e){
//         e.preventDefault()
//         let consignment = {
//             consignmentId: consignmentCount ++,
//             size: e.target.elements.additionalSize.value,
//             pictureLink: e.target.elements.additionalPic.value,
            
//         }
        
//         addRow(consignment)

//         e.target.elements.additionalType = ''
//         e.target.elements.additionalSize = ''
//         e.target.elements.additionalPic = ''

//     })
    

//     app.appendChild(form)
// });
// }




// var form = document.getElementById("sellForm");

// document.getElementById("sellForm").addEventListener("click", function () {
//   form.submit();
// });