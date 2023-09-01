const homeButton = document.getElementById("home_page");
const signButton = document.getElementById("sign_in");

homeButton.addEventListener("click", ()=>{
    window.location.href = "home.html";
});

signButton.addEventListener('click' , () => {
    window.location.href = "listofrooms.html";
});