const admin_button = document.getElementById("admin_button");
const user_button = document.getElementById("user_button");

admin_button.addEventListener('click' , () => {
    console.log("admin_button");
    window.location.href = "login_admin.html";
});

user_button.addEventListener('click' , () => {
    console.log("user_button");
    window.location.href = "login.html";
});