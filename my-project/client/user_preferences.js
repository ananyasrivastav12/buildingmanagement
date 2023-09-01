import Room from "./data/room.js";
import User from "./data/user.js";
import Rooms from "./data/rooms_data.js";
import * as crud from './crud.js';
import * as time from './TimeConvert.js';

const capacity = document.getElementById("capacity_info");
const date = document.getElementById("date_info");
const start_time = document.getElementById("start_time_info");
const end_time = document.getElementById("end_time_info");
const confirm_button = document.getElementById("confirm_button");


async function call_rooms(){
    let rooms_array = [];
    const rooms = await crud.readAllRooms();
    console.log("rooms: " , rooms);
    rooms.forEach(room => {
        room.assignment = (room.assignment === undefined)? {} : room.assignment;
        rooms_array.push(new Room(room._id, room.capacity, room.start_time, room.end_time, room.availability, room.assignment));
    });

    const user_id = sessionStorage.getItem("user_id");
    console.log(user_id);
    const user_data = await crud.readUser(user_id);
    console.log("u: " , user_data.assignment);
    user_data.assignment = (user_data.assignment === undefined)? {} : user_data.assignment;
    let st_val = time.convertToMinutes(start_time.value);
    let et_val = time.convertToMinutes(end_time.value);
    console.log("minutes: ", st_val, et_val);
    const bool_stat = await crud.updateUser(user_id, Number(capacity.value), st_val, et_val, user_data.assignment);
    if(!bool_stat){
        console.log("Error Upddating User");
        return undefined;
    }
    const user_object = new User(user_id, Number(capacity.value), st_val, et_val, user_data.assignment);
    console.log(user_object);
    let check_available = new Rooms(rooms_array, user_object);
    let result = check_available.get_list_of_available_rooms();
    return result;

}

confirm_button.addEventListener('click' , async () => {
    //read all rooms from database => use the data/room.js file => access room class to find availability
    //use the user class => input preferences - not sure
    //use the room class => check if room is available
    let available_rooms_array = await call_rooms();
    if(available_rooms_array !== undefined){
        const myArrayString = JSON.stringify(available_rooms_array);
        console.log("availability: " , available_rooms_array);
        sessionStorage.setItem('myArray', myArrayString);
        window.location.href = "rooms.html";
    }
});