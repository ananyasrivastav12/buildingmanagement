import Room from "./data/room.js";
import User from "./data/user.js";
import * as crud from './crud.js';
import * as time from './TimeConvert.js';

let available_rooms_array = JSON.parse(sessionStorage.getItem('myArray'));
console.log(available_rooms_array);
// alert(available_rooms_array.length);

async function book_room(id){
    const room = await crud.readRoom(id);

    const user_id = sessionStorage.getItem("user_id");
    const user = await crud.readUser(user_id);

    room.assignment = (room.assignment === undefined)? {} : room.assignment;
    user.assignment = (user.assignment === undefined)? {} : user.assignment;

    let user_object = new User(user._id , user.capacity, user.start_time, user.end_time, user.assignment);
    let room_object = new Room(room._id , room.capacity , room.start_time , room.end_time , room.availability, room.assignment);

    console.log("u: " , user_object);
    console.log("r: " , room_object);

    room_object.book_room(user_object);

    const bool_stat_user = await crud.updateUser(user_id, user.capacity, user.start_time, user.end_time, user_object.get_assigned_rooms());
    const bool_stat_room = await crud.updateRoom(room._id, room.capacity , room.start_time , room.end_time , room_object.get_availability(), room_object.get_assigned_users());

    console.log("u: " , user_object);
    console.log("r: " , room_object);

    return bool_stat_room && bool_stat_user;
}

document.addEventListener("DOMContentLoaded", function(event) {
    const table = document.getElementById("myTable");
    const tbody = table.getElementsByTagName("tbody")[0];
  
    // Change the values of `num_rows` and `num_cols` as per your need
    let num_rows = available_rooms_array.length; // Change this value to set the number of rows
    let count = 0;
    for (var i = 0; i < num_rows; i++) {
        // let row = document.createElement("tr");
        // row.className = (i%2 === 0)? "hover:bg-purple-100 hover:scale-105 bg-purple-300 cursor-pointer duration-300" : "hover:bg-purple-100 hover:scale-105 bg-purple-400 cursor-pointer duration-300";
        // let c1 = document.createElement("td");
        // let c2 = document.createElement("td");
        // let c3 = document.createElement("td");
        // let c4 = document.createElement("td");
        // let c5 = document.createElement("button");

        // // Insert data to cells
        // c1.innerText = available_rooms_array[i].room;
        // c2.innerText = (available_rooms_array[i].available === true)? "yes" : "no";
        // let copy_array = [];
        if(available_rooms_array[i].available){
            let row = document.createElement("tr");
            row.className = (count%2 === 0)? "hover:bg-purple-100 hover:scale-105 bg-purple-300 cursor-pointer duration-300" : "hover:bg-purple-100 hover:scale-105 bg-purple-400 cursor-pointer duration-300";
            let c1 = document.createElement("td");
            let c2 = document.createElement("td");
            let c3 = document.createElement("td");
            let c4 = document.createElement("td");
            let c5 = document.createElement("button");

            // Insert data to cells
            c1.innerText = available_rooms_array[i].room;
            c2.innerText = (available_rooms_array[i].available === true)? "yes" : "no";
            let copy_array = [];
            let arr = available_rooms_array[i].other_availability;
            let st_val = time.convertMinutesToTime(arr[0]);
            let et_val = time.convertMinutesToTime(arr[1]);
            // copy_array = [st_val, et_val];
            c3.innerText = st_val;
            c4.innerText = et_val;
            c5.innerText = (available_rooms_array[i].available === true)?"book" : "re-book";
            
            // Append cells to row
            row.appendChild(c1);
            row.appendChild(c2);
            row.appendChild(c3);
            row.appendChild(c4);
            row.appendChild(c5);
            
            // Append row to table body
            tbody.appendChild(row);
            count++; 
        } else{
            available_rooms_array[i].other_availability.forEach(element => {
                let row = document.createElement("tr");
                row.className = (count%2 === 0)? "hover:bg-purple-100 hover:scale-105 bg-purple-300 cursor-pointer duration-300" : "hover:bg-purple-100 hover:scale-105 bg-purple-400 cursor-pointer duration-300";
                let c1 = document.createElement("td");
                let c2 = document.createElement("td");
                let c3 = document.createElement("td");
                let c4 = document.createElement("td");
                let c5 = document.createElement("button");

                // Insert data to cells
                c1.innerText = available_rooms_array[i].room;
                c2.innerText = (available_rooms_array[i].available === true)? "yes" : "no";
                let copy_array = [];
                let st_val = time.convertMinutesToTime(element[0]);
                let et_val = time.convertMinutesToTime(element[1]);
                copy_array.push([st_val, et_val]);
                c3.innerText = st_val;
                c4.innerText = et_val;
                c5.innerText = (available_rooms_array[i].available === true)?"book" : "re-book";
                
                // Append cells to row
                row.appendChild(c1);
                row.appendChild(c2);
                row.appendChild(c3);
                row.appendChild(c4);
                row.appendChild(c5);
                
                // Append row to table body
                tbody.appendChild(row);
                count++;
            });
        }
        // c3.innerText = JSON.stringify(copy_array);
        // c4.innerText = (available_rooms_array[i].available === true)?"book" : "re-book";
        
        // // Append cells to row
        // row.appendChild(c1);
        // row.appendChild(c2);
        // row.appendChild(c3);
        // row.appendChild(c4);
        
        // // Append row to table body
        // tbody.appendChild(row);
    }

    const rows = document.getElementById("body").getElementsByTagName("tr");
    console.log(rows.length);
    for(let row of rows){
        row.addEventListener('click' , async() => {
            const cells = row.children;
            let room_id = cells[0].textContent;
            let bool = cells[1].textContent;
            console.log(cells[2].textContent)
            if(bool === "yes"){
                //book room at backend
                let flag = await book_room(room_id);
                if(flag){
                    const url = new URL("confirmation.html", window.location.href);
                    url.searchParams.set("roomNo", cells[0].textContent);
                    url.searchParams.set("booked", bool);
                    url.searchParams.set("booked_time_start", cells[2].textContent);
                    url.searchParams.set("booked_time_end", cells[3].textContent);
                    window.location.href = url.toString();
                } else{
                    console.log("error booking room");
                }
            } else{
                window.location.href = "user_preferences.html";
            }
        });
        
    }
});

