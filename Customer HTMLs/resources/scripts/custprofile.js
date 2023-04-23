//So, storing Name, Email, & Address For now
//Missing Navbar on html for now, probably will change
//Need to add Address, Name, etc. to User
//  Once double checked, make tables

let activeUser = JSON.parse(localStorage.getItem("activeUser"))


function setUpUser() {
    activeUser = {
        userId: 1,
        name: 'Jonathan Gaming',
        email: 'jonathangaming@epic.com',
        address: "1234 Main Street, Mobile, AL 36609"
    }
    return activeUser;
}

function handleOnLoad() {
    setUpUser();
    let userID = document.getElementById("customerId");
    userID.innerText = activeUser.userId;
    let name = document.getElementById("name");
    name.innerText = activeUser.name;
    let email = document.getElementById("custusername");
    email.innerText = activeUser.email;
    let address = document.getElementById("address");
    address.innerText = activeUser.address;
}

document.addEventListener('DOMContentLoaded', handleOnLoad);

function editProfile(){
    let currUserId = activeUser.userId
    let name = document.getElementById("name").value//needs to be added
    let email = document.getElementById("email").value//or username, depending
    let address = document.getElementById("address").value  //needs to be added

    console.log(name, email, address, currUserId)
    if (confirm(`Is this correct? Name: ${name}, Email: ${email}, Address: ${address}`)){
        console.log('confirmed')
        updateUser(currUserId)
    } else{
        return false
    }
}

function updateUser(userId){
    let putUserApiUrl
    fetch (putUserApiUrl, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            customerId: userId,
            username: email,
            password: activeUser.password,
            name: name,
            address: address,
        })
    })
    .then((response) =>{
        console.log(response)
    })
}

// async function findUser(currUserId){
//     let songs = await getUsers()
//     let returnVal = songs.find(x => x.userId == currUser)
//     console.log(returnVal)
//     return returnVal
// }