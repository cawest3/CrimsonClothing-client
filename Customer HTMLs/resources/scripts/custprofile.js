//So, storing Name, Email, & Address For now
//Missing Navbar on html for now, probably will change
//Need to add Address, Name, etc. to User
//  Once double checked, make tables

let activeUser = JSON.parse(localStorage.getItem("activeUser"))

function setUpUser(){
    activeUser = {
        name: 'Jonathan Gaming',
        email: 'jonathangaming@epic.com',
        address: "1234 Main Street, Mobile, AL 36609"
    }
    return activeUser
}

// let activeUser = {
//     name: 'Jonathan Gaming',
//     email: 'jonathangaming@epic.com',
//     address: "1234 Main Street, Mobile, AL 36609"
// }

function handleOnLoad(){
    setUpUser()
    let name = document.getElementById("name")//needs to be added
    name.value = activeUser.name
    let email = document.getElementById("email")//or username, depending
    email.value = activeUser.email
    let address = document.getElementById("address")  //needs to be added
    address.value = activeUser.address
}