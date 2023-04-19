let itemUrl = "http://localhost:5165/item"
let consignmentUrl = "http://localhost:5165/consignment"
let transactionUrl = "http://localhost:5165/transaction"
let adminUrl = "http://localhost:5165/admin"
let customerUrl = "http://localhost:5165/customer"
let items = []
const pricePerItem= 
{
    shirt: 5,
    pants : 5,
    skirts : 5,
    dresses : 7,
    jackets : 10,
    shoes : 10,
    belts : 7,
};

function HandleOnSellLoad()
{
    CalculateConsignment();
     AddAnotherItem();
}
function CalculateConsignment()
{
    // Define the prices per item
   
    document.getElementById("submitButton").addEventListener("click", function(e) {
        e.preventDefault(); // prevent the default form submission

        // Calculate the total value of the consignment
        let totalCost = 0;
        items.forEach(function(item) 
        {
          totalCost += item.quantity * item.pricePerItem;
        }); 

        alert("The total value of the consignment is $" + totalCost.toFixed(2));
     });   
  // Calculate the total cost of the consignment
   
    
}


async function AddAnotherItem()
{
    
    const type =
    {
        shirt: "",
        pants : "",
        skirts : "",
        dresses : "",
        jackets : "",
        shoes : "",
        belts : "",
    }
    const typeDropdown = document.getElementById("typeDropdown")
    
    let form = document.createElement('form')

    for (let category in type)
    {
        let option = document.createElement("option")
        option.setAttribute('value', data[category])
        let optionText = document.createTextNode(key)
        option.appendChild(optionText)
        typeDropdown.appendChild(option)
    }

    let textInput = document.createElement('input')
    textInput.type = 'text'
    textInput.placeholder = 'Enter Size of Item'
    textInput.id = 'additionalSize'
    form.appendChild(textInput)

    let textInput1 = document.createElement('input')
    textInput1.type = 'text'
    textInput1.placeholder = 'Enter picture link'
    textInput1.id = 'additionalPic'
    form.appendChild(textInput1)

    let submitButton = document.createElement('button')
    submitButton.textContent = 'Submit'
    form.appendChild(submitButton)

    let consignmentCount = '1'
    form.addEventListener('submit', function(e){
        e.preventDefault()
        let consignment = {
            consignmentId: consignmentCount ++,
            size: e.target.elements.additionalSize.value,
            pictureLink: e.target.elements.additionalPic.value,
            
        }
        
        addRow(consignment)

        e.target.elements.additionalType = ''
        e.target.elements.additionalSize = ''
        e.target.elements.additionalPic = ''

    })
    

    app.appendChild(form)
}




// var form = document.getElementById("sellForm");

// document.getElementById("sellForm").addEventListener("click", function () {
//   form.submit();
// });