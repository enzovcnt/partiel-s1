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
} //login

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
    allList()
}


async function generalList(){ //liste générale
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

function allList() {
    const listContainer = document.querySelector('.containerElement');
    listContainer.innerHTML = '';

    generalList()
        .then((elements) => {
            console.log(elements);
            elements.forEach(element => {
                displayList(element);
            })
        })
}

function displayList(element){
    const listCourses = document.querySelector('.containerElement');
    const divElement = document.createElement('div');
    const paragraphName = document.createElement('p');
    const paragraphDescription = document.createElement('p');

    paragraphName.innerHTML = element.name;
    paragraphName.classList.add('nameElement');
    paragraphDescription.innerHTML = element.description;

    divElement.classList.add('divElement');
    divElement.appendChild(paragraphName);
    divElement.appendChild(paragraphDescription);

    listCourses.appendChild(divElement);
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
} //ajouter de nouveaux éléments

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
    return await fetch('https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist/switchstatus/117', changeParams)
        .then((response) =>  response.json())
        .then((data) => {
            console.log(data);
            return data;
        })
} //changer le statut

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
} //effacer un élément

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

async function clearAll(){
    let clearParams = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    }
    return await fetch('https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist/clear', clearParams)
    .then((response) =>  response.json())
    .then((data) => {
        console.log(data);
        return data;
    })
}  //effacer toute la liste

function clearAllElements(){
    let btnClear = document.querySelector('.clearBtn')
    btnClear.addEventListener('click', ()=>{
        clearAll()
            .then((data) => {
                console.log(data);
            })
    })
}
clearAllElements()


if(!token){
    loginForm()
}else {
    displayListPage()
}