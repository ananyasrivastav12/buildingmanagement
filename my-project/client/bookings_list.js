import Room from "./data/room.js";
import User from "./data/user.js";
import * as crud from './crud.js';
import * as time from './TimeConvert.js';

// let available_rooms_array = JSON.parse(sessionStorage.getItem('myArray'));
// alert(available_rooms_array.length);
const user_id = sessionStorage.getItem("user_id");
const user = await crud.readUser(user_id);
user.assignment = (user.assignment === undefined)? {} : user.assignment;
let user_object = new User(user_id, user.capacity, user.start_time, user.end_time, user.assignment);
const bookings = user_object.get_assigned_rooms();

console.log(user_object);

async function delete_booking(room_id, time){
    const room = await crud.readRoom(room_id);
    room.assignment = (room.assignment === undefined)? {} : room.assignment;
    let room_object = new Room(room_id, room.capacity, room.start_time, room.end_time, room.availability, room.assignment);

    console.log(room_object);
    console.log(user_object);

    room_object.delete_booking(user_object, time);

    console.log(room_object);
    console.log(user_object);

    const bool_room = await crud.updateRoom(room_id, room.capacity, room.start_time, room.end_time, room_object.get_availability(), room_object.get_assigned_users());
    const bool_user = await crud.updateUser(user_id, user.capacity, user.start_time, user.end_time,  user_object.get_assigned_rooms());

    return bool_room && bool_user;
}

function load_page() {
    console.log("hello");
    const table = document.getElementById("myTable");
    const tbody = table.getElementsByTagName("tbody")[0];
  
    // Change the values of `num_rows` and `num_cols` as per your need
    let i = 0;
    for (const room_id in bookings) {
        const times = bookings[room_id];
        console.log(room_id, times);
        times.forEach((element) => {
            let row = document.createElement("tr");
            row.className = (i%2 === 0)? "hover:bg-purple-100 hover:scale-105 bg-purple-300 cursor-pointer duration-300" : "hover:bg-purple-100 hover:scale-105 bg-purple-400 cursor-pointer duration-300";
            let c1 = document.createElement("td");
            let c2 = document.createElement("td");
            let c3 = document.createElement("td");
            let c4 = document.createElement("button");

            // Insert data to cells
            c1.innerText = room_id;
            c2.innerText = time.convertMinutesToTime(element[0]);
            c3.innerText = time.convertMinutesToTime(element[1]);
            c4.innerText = "Delete";  
            // Append cells to row
            row.appendChild(c1);
            row.appendChild(c2);
            row.appendChild(c3);
            row.appendChild(c4);
            
            // Append row to table body
            tbody.appendChild(row);    
            i+=1;
        });
    }

    const rows = document.getElementById("body").getElementsByTagName("tr");
    console.log(rows.length);
    for(let row of rows){
        row.addEventListener('click' , async() => {
            const cells = row.children;
            let room_id = cells[0].textContent;
            let st_val = time.convertToMinutes(cells[1].textContent);
            let et_val = time.convertToMinutes(cells[2].textContent);
            let t = [st_val, et_val];
            const flag = await delete_booking(room_id, t);
            if(flag){
                alert("Booking Deleted");
                window.location.reload();
            } else{
                console.log("Error deleting");
            }
        });
        
    }
};

load_page();

