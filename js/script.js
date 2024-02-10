var usernameInput = document.getElementById("usernameInput");
var emailInput = document.getElementById("emailInput");
var passwordInput = document.getElementById("passwordInput");

var allUsers = [];
if (localStorage.getItem("allUsers")!=null){
    allUsers=JSON.parse(localStorage.getItem("allUsers",))
}

function signUp() {
    if(isAllInputsValid() && isExist() == false){
        var user = {
            username: usernameInput.value,
            emailInput: emailInput.value,
            password: passwordInput.value,
          };
          allUsers.push(user);
          localStorage.setItem("allUsers",JSON.stringify(allUsers))
          console.log(allUsers);
          window.location.href="./html/signin.html"
    }else{
        console.log("not allowed to sign up");
    }
}
function isAllInputsValid(){
    if(nameVal() && emailVal() && passVal()){
        console.log("all inputs are valid");
        return true
    }
    console.log("not all inputs are valid")
    return false
}
function isExist(){
    var existAlert = document.getElementById("existAlert");
    for(var i=0; i<allUsers.length ; i++){
        if(
            allUsers[i].username.toLowerCase() == usernameInput.value.toLowerCase() ||
            allUsers[i].emailInput.toLowerCase() == emailInput.value.toLowerCase()
        ){
            console.log("this user already exist");
            existAlert.classList.replace("d-none","d-block")
            return true
        }
    }
    console.log("THIS IS A NEW USER");
    return false
}
function nameVal(){
    var usernameVal = /^(?=.*[A-Z])[A-Za-z]{1,20}$/;
    var usernameAlert = document.getElementById("usernameAlert");
    if (usernameVal.test(usernameInput.value)==true){
        console.log("USERNAME TRUEEEE");
        usernameAlert.classList.replace("d-block","d-none")
        usernameInput.classList.remove("is-invalid")
        usernameInput.classList.add("is-valid")
        return true
    }else{
        console.log("USERNAME FALSEEE");
        usernameAlert.classList.replace("d-none","d-block")
        usernameInput.classList.remove("is-valid")
        usernameInput.classList.add("is-invalid")
        return false
    }
}
function emailVal(){
    var emailVal = /^(?=.*[a-zA-Z])[^@]*@.{1,20}$/;
    var emailAlert= document.getElementById("emailAlert");
    if(emailVal.test(emailInput.value)==true){
        console.log("EMAIL TRUEEE");
        emailAlert.classList.replace("d-block","d-none")
        emailInput.classList.remove("is-invalid")
        emailInput.classList.add("is-valid")
        return true
    }else{
        console.log("EMAIL FALSEE");
        emailAlert.classList.replace("d-none","d-block")
        emailInput.classList.remove("is-valid")
        emailInput.classList.add("is-invalid")
        return false
        }
}
function passVal(){
    var passVal= /^.{5,15}$/;
    var passwordAlert= document.getElementById("passwordAlert")
    if(passVal.test(passwordInput.value)==true){
        console.log("PASSS TRUEEE");
        passwordAlert.classList.replace("d-block","d-none")
        passwordInput.classList.remove("is-invalid")
        passwordInput.classList.add("is-valid")
        return true
    }else{
        console.log("PASSS FALSEE");
        passwordAlert.classList.replace("d-none","d-block")
        passwordInput.classList.remove("is-valid")
        passwordInput.classList.add("is-invalid")
        return false
    }
}   
var sessionName = JSON.parse(localStorage.getItem("username"))
function login(){
    var loginEmailInput = document.getElementById("loginEmailInput")
    var loginPassInput = document.getElementById("loginPassInput")
    var signinAlert = document.getElementById("signinAlert")
    for(var i=0; i<allUsers.length;i++){
        if(
            loginEmailInput.value.toLowerCase() == allUsers[i].emailInput.toLowerCase() &&
            loginPassInput.value.toLowerCase() == allUsers[i].password.toLowerCase()
        ){
            signinAlert.classList.replace("d-block","d-none")
            var sessionName = allUsers[i].username
            localStorage.setItem("username",JSON.stringify(sessionName))
            window.location.href="../html/home.html"
            return true
        }else{
            signinAlert.classList.replace("d-none","d-block")
        }
    }
}
function displayWelcomeUser(){
    var place = document.getElementById("place")
    place.innerText=`Hello, ${sessionName}`;
}
function logOut(){
    localStorage.removeItem("username")
}