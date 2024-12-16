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


async function register() {
    let registerParams = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: usernameRegister,
            password: passwordRegister,
        })
    }

    return await fetch('https://partiel-s1-b1dev-2425.esdlyon.dev/api/register', registerParams)
        .then((response) =>  response.json())
        .then((data) => {
            console.log(data);
            return data;
        })
}

function registerForm(){
    let usernameRegister = document.querySelector('.registerUsername')
    let passwordRegister = document.querySelector('.registerPassword')
    let registerButton = document.querySelector('.btnRegister')
    registerButton.addEventListener('click', ()=>{

        login(username.value = "enzo", password.value = "BlsgKQulSD")
            .then((data) => {
                token = data
                displayListPage()
                console.log(token)
            })
    })
}


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
    allList()
    profilName()
}

async function profil(){
    let profilParams = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }

    return await fetch('https://partiel-s1-b1dev-2425.esdlyon.dev/api/whoami', profilParams)
        .then((response) =>  response.json())
        .then((data) => {
            console.log(data);
            return data
        })
}

function profilName(){
    const profilName = document.querySelector('.nameProfil')
    profil()
        .then(data => {
            profilName.innerHTML = data.username
            })
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

function displayList(data){
    const listCourses = document.querySelector('.containerElement');
    const divElement = document.createElement('div');
    const paragraphName = document.createElement('p');
    const paragraphDescription = document.createElement('p');
    const btnStatus = document.createElement('button');
    const btnDelete = document.createElement('button');

    paragraphName.innerHTML = data.name;
    paragraphName.classList.add('nameElement');
    paragraphDescription.innerHTML = data.description;
    btnStatus.innerHTML = data.status;
    btnStatus.classList.add('btnStatus', 'btn', 'btn-primary');

    btnDelete.innerHTML = 'Supprimer'
    btnDelete.classList.add('btnDelete');
    console.log(btnDelete);


    divElement.classList.add('divElement');
    divElement.appendChild(paragraphName);
    divElement.appendChild(paragraphDescription);
    divElement.appendChild(btnStatus);

    listCourses.appendChild(divElement);

    clearAllElements()

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

function refresh(){
    const btnRefresh = document.querySelector('.refreshBtn');
    btnRefresh.addEventListener('click', ()=>{
        allList();
    })
}
refresh();

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

async function changeStatus(id){
    let changeParams = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    }
    return await fetch(`https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist/switchstatus/${id}`, changeParams)
        .then((response) =>  response.json())
        .then((data) => {
            console.log(data);
            return data;
        })
} //changer le statut

function change(){
    let statusChange = document.querySelector('.btnStatus');
    statusChange.addEventListener('click', ()=>{

        changeStatus()
            .then((data) => {
                console.log(data);
                if(data.status === true){
                    statusChange.innerHTML = data.status;

                }else{
                    statusChange.innerHTML = data.status;
                }
            })
    })
}


async function deleteElement(id){
    let deleteParams = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    }
    return await fetch(`https://partiel-s1-b1dev-2425.esdlyon.dev/api/mylist/delete/${id}`, deleteParams)
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



if(!token){
    loginForm()
}else {
    displayListPage()
}