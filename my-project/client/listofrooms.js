import * as crud from "./crud.js";
import * as time from './TimeConvert.js';

const loginButton = document.getElementById("login_page");
const homeButton = document.getElementById("home_page");
// const roomButton = document.getElementById("rooms_page");
// const chooseButton = document.getElementById("choose_page")

loginButton.addEventListener("click", ()=>{
    window.location.href = "choose_action.html"
})
homeButton.addEventListener("click", ()=>{
    window.location.href = "home.html"
})

const createupdate = document.getElementById("create-update-btn");
const deleteButton = document.getElementById("delete-btn");
const roomId = document.getElementById("room-id");
const roomCapacity = document.getElementById("room-capacity");
const buildingName = document.getElementById("building-name");
const startTime = document.getElementById("open-time");
const endTime = document.getElementById("close-time");



async function loadRooms(){
    let allRooms = await crud.readAllRooms();
    const table = document.getElementById("myTable");
    const tbody = table.getElementsByTagName("tbody")[0];

    let numberOfRooms = allRooms.length;
    for (let i = 0; i < numberOfRooms; i++) {
        let row = document.createElement("tr");
        row.className = (i%2 === 0)? "hover:bg-purple-100 hover:scale-105 bg-purple-300 cursor-pointer duration-300" : "hover:bg-purple-100 hover:scale-105 bg-purple-400 cursor-pointer duration-300";
        let c1 = document.createElement("td");
        let c2 = document.createElement("td");
        let c3 = document.createElement("td");
        let c4 = document.createElement("td");


        c1.innerText = allRooms[i]._id;
        c2.innerText = allRooms[i].capacity;
        c3.innerText = time.convertMinutesToTime(allRooms[i].start_time);
        c4.innerText = time.convertMinutesToTime(allRooms[i].end_time);
    // Append cells to row

        row.appendChild(c1);
        row.appendChild(c2);
        row.appendChild(c3);
        row.appendChild(c4);
        row.addEventListener("click", function(event) {
            roomId.value = allRooms[i]._id;
            roomCapacity.value = allRooms[i].capacity;
            startTime.value = time.convertMinutesToTime(allRooms[i].start_time);
            endTime.value = time.convertMinutesToTime(allRooms[i].end_time);
        });


    
    // Append row to table body
        tbody.appendChild(row);
}
}


function clearTable(){
    const table = document.getElementById("myTable");
    const tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
}
clearTable();
loadRooms();



deleteButton.addEventListener("click", async function(event) {
    let roomid = roomId.value;
    await crud.deleteRoom(roomid);
    window.location.href = "listofrooms.html";
});

createupdate.addEventListener("click", async function(event) {

    let roomid = roomId.value;
    let allRooms = await crud.readAllRooms();
    // '9:00' - 9
    
    let room_capacity = roomCapacity.value;
    let start_time = time.convertToMinutes(startTime.value);
    let end_time = time.convertToMinutes(endTime.value);
    let room_availability = [];
    let room_assignment = {};

    let flag = false;

    allRooms.forEach(room => {
        if(room._id === roomid){
            flag = true;
            room_availability = room.availability;
            room_assignment = (room.assignment === undefined)? {} : room.assignment;
        }
    });

    if(flag){
        await crud.updateRoom(roomid, Number(room_capacity), start_time, end_time, room_availability, room_assignment);
    }
    else{
        await crud.createRoom(roomid, Number(room_capacity), Number(start_time), Number(end_time), room_availability, room_assignment);
    }
    
    clearTable();
    await loadRooms();
    window.location.href = "listofrooms.html";


});