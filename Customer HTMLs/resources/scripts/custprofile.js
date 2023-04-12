//So, storing Name, Email, & Address For now
//Missing Navbar on html for now, probably will change
//Need to add Address, Name, etc. to User
//  Once double checked, make tables

let activeUser = JSON.parse(localStorage.getItem("activeUser"))

function setUpUser(){
    activeUser = {
        userId: 1,
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
    let putUserApiUrl = `https://localhost:7050/api/Customer/${userId}`
    fetch (putUserApiUrl, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: userId,
            username: email,
            password: activeUser.password,
            name: name,
            address: address,
            deleted: song.deleted
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