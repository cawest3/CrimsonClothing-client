itemUrl = "http://localhost:5165/item";
consignmentUrl = "http://localhost:5165/consignment";
transactionUrl = "http://localhost:5165/transaction";
adminUrl = "http://localhost:5165/admin";
customerUrl = "http://localhost:5165/Customer";

function calculateConsignment() {
  const firstNameInput = document.getElementById('firstName').value;
  const lastNameInput = document.getElementById('lastName').value;
  const emailInput = document.getElementById('emailInput').value;
  const typeInput = document.getElementById('itemType').value;
  const sizeInput = document.getElementById('sizeInput').value;
  const qtyInput = document.getElementById('qtyInput').value;
  const pictureInput = document.getElementById('pictureUpload').value;

  const price = findPrice(typeInput, qtyInput);
  console.log(price);

  alert("The total value of the consignment is $" + price.toFixed(2));
}

function findPrice(type, qty) {
  let price = 0;

  if (type === 'shirt' || type === 'pant' || type === 'skirt') {
    price = 5 * qty;
  } else if (type === 'dress' || type === 'belt') {
    price = 7 * qty;
  } else if (type === 'jacket' || type === 'shoe') {
    price = 10 * qty;
  }

  return price;
}

const calculateButton = document.getElementById('calculateConsignment');

if (calculateButton) {
  calculateButton.addEventListener('click', calculateConsignment);
  updateStoreCredit();
} else {
  console.error('Error: Could not find calculateButton element');
}


function updateStoreCredit(price) {
  
    const data = {
      storeCredit: price
    };
  
    fetch(customerUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Store credit updated successfully:', data);
    })
    .catch(error => {
      console.error('There was a problem updating the store credit:', error);
    });
  }
  

// function AddAnotherItem()
// {
//     console.log('hi')
//     const type =
//     {
//         'Shirt':'shirt',
//         'Pants' : 'pant',
//         'Skirts' : 'skirt',
//         'Dresses' : 'dress',
//         'Jackets' : 'jacket',
//         'Shoes' : 'shoes',
//         'Belt' : 'belt',
//     }
//     document.addEventListener('DOMContentLoaded', function(){
//         const typeDropdown = document.getElementById('type-Dropdown')
//         let form = document.createElement('form')
        
//         // for (let category in type)
//         // {
//         // let option = document.createElement("option")
//         // option.setAttribute('value', type[category])
//         // let optionText = document.createTextNode(category)
//         // option.appendChild(optionText)
//         // typeDropdown.appendChild(option)
//         // }
   

//     let textInput = document.createElement('input')
//     textInput.type = 'text'
//     textInput.placeholder = 'Enter Size of Item'
//     textInput.id = 'additionalSize'
//     form.appendChild(textInput)

//     let textInput1 = document.createElement('input')
//     textInput1.type = 'text'
//     textInput1.placeholder = 'Enter picture link'
//     textInput1.id = 'additionalPic'
//     form.appendChild(textInput1)

//     let submitButton = document.createElement('button')
//     submitButton.textContent = 'Submit'
//     form.appendChild(submitButton)

//     let consignmentCount = '1'
//     form.addEventListener('submit', function(e){
//         e.preventDefault()
//         let consignment = {
//             consignmentId: consignmentCount ++,
//             size: e.target.elements.additionalSize.value,
//             pictureLink: e.target.elements.additionalPic.value,
            
//         }
        
//         addRow(consignment)

//         e.target.elements.additionalType = ''
//         e.target.elements.additionalSize = ''
//         e.target.elements.additionalPic = ''

//     })
    

//     app.appendChild(form)
// });
// }




// var form = document.getElementById("sellForm");

// document.getElementById("sellForm").addEventListener("click", function () {
//   form.submit();
// });