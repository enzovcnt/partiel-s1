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

async function login(username, password){
    console.log(username, password)
    let params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    }

    return await fetch('https://partiel-s1-b1dev-2425.esdlyon.dev/api/login', params)
        .then((response) =>  response.json())
        .then((json) => {

            return json.token
        })
}

function loginForm(){

    let username = document.querySelector('.loginUsername')
    let password = document.querySelector('.loginPassword')
    let loginButton = document.querySelector('.btnLogin')
    loginButton.addEventListener('click', ()=>{

        login(username.value, password.value).then((data) => {
            token = data
            //displayChat()
            console.log(token)
        })
    })
}
loginForm()