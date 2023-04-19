let itemUrl = "http://localhost:5165/item"
let consignmentUrl = "http://localhost:5165/consignment"
let transactionUrl = "http://localhost:5165/transaction"
let adminUrl = "http://localhost:5165/admin"
let customerUrl = "http://localhost:5165/customer"

const pricePerItem= 
{
    shirt: 5,
    pant : 5,
    skirt : 5,
    dress : 7,
    jacket : 10,
    shoe : 10,
    belt : 7,
};

async function HandleOnSellLoad()
{
    CalculateConsignment();
    await AddAnotherItem();
}
function CalculateConsignment()
{
    // Define the prices per item
    const shirtInput = document.getElementById('shirt');
    const pantsInput = document.getElementById('pant');
    const shoesInput = document.getElementById('shoe');
    const skirtInput = document.getElementById('skirt');
    const beltInput = document.getElementById('belt');
    const jacketInput = document.getElementById('jacket');
    const dressInput = document.getElementById('dress');
console.log('hi')
    // Get the values from the form
    const shirtQuantity = parseInt(shirtInput.value);
    const pantsQuantity = parseInt(pantsInput.value);
    const shoesQuantity = parseInt(shoesInput.value);
    const skirtQuantity = parseInt(skirtInput.value);
    const beltQuantity = parseInt(beltInput.value);
    const jacketQuantity = parseInt(jacketInput.value);
    const dressQuantity = parseInt(dressInput.value);
    
    const consignment= [
        {item:'shirt', quantity: shirtQuantity},
        {item:'pant', quantity: pantsQuantity},
        {item:'shoe', quantity: shoesQuantity},
        {item:'skirt', quantity: skirtQuantity},
        {item:'belt', quantity: beltQuantity},
        {item:'jacket', quantity: jacketQuantity},
        {item:'dress', quantity: dressQuantity},
     ]   
     // Calculate the total value of the consignment
        let totalCost = 0;
        for(let item of consignment)
        {
            const price = pricePerItem[item.item];
            const quantity = item.quantity;
            
            totalCost += price * quantity;
        }
          
        alert("The total value of the consignment is $" + totalCost.toFixed(2));
  // Calculate the total cost of the consignment   
}

async function AddAnotherItem()
{
    
    console.log("hi");
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
        option.setAttribute('value', type[category])
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