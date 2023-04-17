async function SubmitSell()
{
    console.log("hi there")
}

async function AddAnotherItem()
{
    
    const type =
    {
        Shirt: "",
        Pant : "",
        Skirt : "",
        Dress : "",
        Jacket : "",
        Shoes : "",
        Belt : "",
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