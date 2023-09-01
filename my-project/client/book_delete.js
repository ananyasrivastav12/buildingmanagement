const book_button = document.getElementById("book_button");
const delete_button = document.getElementById("delete_button");

book_button.addEventListener('click' , () => {
    window.location.href = "../user_preferences.html";
});

delete_button.addEventListener('click' , () => {
    // console.log("user_button");
    window.location.href = "../bookings_list.html";
});