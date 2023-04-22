let itemUrl = "http://localhost:5165/item"
let consignmentUrl = "http://localhost:5165/consignment"
let transactionUrl = "http://localhost:5165/transaction"
let adminUrl = "http://localhost:5165/admin"
let customerUrl = "http://localhost:5165/Customer"

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
    AddAnotherItem();
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

    // Get the values from the form
    const shirtQuantity = Number(shirtInput.value);
    const pantsQuantity = Number(pantsInput.value);
    const shoesQuantity = Number(shoesInput.value);
    const skirtQuantity = Number(skirtInput.value);
    const beltQuantity = Number(beltInput.value);
    const jacketQuantity = Number(jacketInput.value);
    const dressQuantity = Number(dressInput.value);
    
    const consignment= [
        {item:'shirt', quantity: shirtQuantity},
        {item:'pant', quantity: pantsQuantity},
        {item:'shoe', quantity: shoesQuantity},
        {item:'skirt', quantity: skirtQuantity},
        {item:'belt', quantity: beltQuantity},
        {item:'jacket', quantity: jacketQuantity},
        {item:'dress', quantity: dressQuantity},
     ]   
     // price will log to console, quantity will not work 
        let totalCost = 0;
        for(let item of consignment)
        {
            const price = pricePerItem[item.item];
            console.log(price)
            const quantity = item.quantity;
            console.log(quantity)
            //get quantity to work
            totalCost += price * 1;
        }

        
        alert("The total value of the consignment is $" + totalCost.toFixed(2));
  // Calculate the total cost of the consignment   
}

function AddAnotherItem()
{
    console.log('hi')
    const type =
    {
        'Shirt':'shirt',
        'Pants' : 'pant',
        'Skirts' : 'skirt',
        'Dresses' : 'dress',
        'Jackets' : 'jacket',
        'Shoes' : 'shoes',
        'Belt' : 'belt',
    }
    document.addEventListener('DOMContentLoaded', function(){
        const typeDropdown = document.getElementById('type-Dropdown')
        let form = document.createElement('form')
        
        for (let category in type)
        {
        let option = document.createElement("option")
        option.setAttribute('value', type[category])
        let optionText = document.createTextNode(category)
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
});
}




// var form = document.getElementById("sellForm");

// document.getElementById("sellForm").addEventListener("click", function () {
//   form.submit();
// });