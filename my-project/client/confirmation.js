const params = new URLSearchParams(window.location.search);
// const loginButton = document.getElementById("login_page");
const homeButton = document.getElementById("home_page");
const readButton = document.getElementById("Bookings");
const reserveButton = document.getElementById("ReserveAnotherRoom");
// const roomButton = document.getElementById("rooms_page");
// const chooseButton = document.getElementById("choose_page");

// loginButton.addEventListener("click", ()=>{
//     window.location.href = "login.html"
// })
homeButton.addEventListener("click", ()=>{
    window.location.href = "home.html"
})
// roomButton.addEventListener("click", ()=>{
//     window.location.href = "rooms.html"
// })
// chooseButton.addEventListener("click", ()=>{
//     window.location.href = "choose_action.html"
// })
const roomNo = params.get("roomNo");
const booked = params.get("booked");
const booked_time_start = params.get("booked_time_start");
const booked_time_end = params.get("booked_time_end");
console.log(params);
document.getElementById("roomNo").textContent = roomNo;
document.getElementById("booked").textContent = booked;
document.getElementById("time").textContent = booked_time_start + "-" + booked_time_end;


//logs the user out, takes the user to home page
//document.querySelector("#LogOut")
reserveButton.addEventListener( "click", () => {
    window.location.href = "user_preferences.html";
});
        // takes the user to reserve another room
readButton.addEventListener( "click", () => {
    window.location.href = "bookings_list.html";
});