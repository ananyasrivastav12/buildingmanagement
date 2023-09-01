const username = document.getElementById("username");
const homeButton = document.getElementById("home_page");
const signButton = document.getElementById("sign_in");

signButton.addEventListener('click' , () => {
    console.log(username.value);
    sessionStorage.setItem("user_id" , username.value);
});

homeButton.addEventListener("click", ()=>{
    window.location.href = "../home.html";
});