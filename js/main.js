//password : BlsgKQulSD


//1 : s'inscrire et se connecter ou se connecter
//2 : ajouter des éléments dans la liste de course > nom + description > formulaire
//3 : bouton acheté ou attente
//4 : un bouton par élément pour le supprimer
//5 : un bouton rafraichissement de la liste + bouton vider la liste
//6 : ajout de photo de profil et de photo d'élément dans la liste
//7 : modification des éléments de la liste

let token = null
const registerPage = document.querySelector('.register')
const loginPage = document.querySelector('.login')
const listPage = document.querySelector('.listeCourse')


async function login(username, password){
    console.log(username, password)
    let params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: "enzo",
            password: "BlsgKQulSD",
        })
    }

    return await fetch('https://partiel-s1-b1dev-2425.esdlyon.dev/api/login', params)
        .then((response) =>  response.json())
        .then((data) => {
            console.log(data);
            return token = data.token;
        })
}

function loginForm(){
    listPage.style.display = 'none'
    let username = document.querySelector('.loginUsername')
    let password = document.querySelector('.loginPassword')
    let loginButton = document.querySelector('.btnLogin')
    loginButton.addEventListener('click', ()=>{

        login(username.value = "enzo", password.value = "BlsgKQulSD")
            .then((data) => {
            token = data
            displayListPage()
            console.log(token)
        })
    })
}


function displayListPage(){
    loginPage.style.display = 'none'
    registerPage.style.display = 'none'
    listPage.style.display = 'block'
    generalList()

}


async function generalList(){
    let generalParams = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }

    return await fetch('https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist', generalParams)
        .then((response) =>  response.json())
        .then((data) => {
            console.log(data);
            console.log(data[0].name);
            return data
        })
}

async function addElement(name, description){
    let addParams = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            name: name,
            description: description,
        })
    }
    return await fetch('https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist/new', addParams)
        .then((response) =>  response.json())
        .then((data) => {
            console.log(data);
            return data;
        })
}

function newElement(name, description){
    let inputName = document.querySelector('.nameInput');
    let inputDes = document.querySelector('.descriptionInput');
    let btnAdd = document.querySelector('.addBtn')
    btnAdd.addEventListener('click', ()=>{

        addElement(inputName.value, inputDes.value )
            .then((data) => {
                console.log(data);
            })
    })
}
newElement()

async function changeStatus(){
    let changeParams = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    }
    return await fetch('https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist/switchstatus/88', changeParams)
        .then((response) =>  response.json())
        .then((data) => {
            console.log(data);
            return data;
        })
}

function change(){
    let btnChange = document.querySelector('.changeBtn')
    btnChange.addEventListener('click', ()=>{

        changeStatus()
            .then((data) => {
                console.log(data);
            })
    })
}
change();

async function deleteElement(id){
    let deleteParams = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    }
    return await fetch('https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist/delete/88', deleteParams)
        .then((response) =>  response.json())
        .then((data) => {
            console.log(data);
            return data;
        })
}

function deleteOneElement(id){
    let btnDelete = document.querySelector('.deleteBtn')
    btnDelete.addEventListener('click', ()=>{

        deleteElement()
            .then((data) => {
                console.log(data);
            })
    })
}
deleteOneElement()

if(!token){
    loginForm()
}else{
    displayListPage()
}