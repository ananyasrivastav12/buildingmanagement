// import {data} from "../server/room_crud.js";

const room_id = document.getElementById("room_info");
const capacity = document.getElementById("capacity_info");
// const date = document.getElementById("date_info");
const start_time = document.getElementById("start_time_info");
const end_time = document.getElementById("end_time_info");
const confirm_button = document.getElementById("confirm_button");

// const data = new Room_Database();

//to add a room to the database
confirm_button.addEventListener('click' , async() => {
    //get info from page and save to database
    let id = room_id.value;
    let cap = Number(capacity.value);
    let start = Number(start_time.value);
    let end = Number(end_time.value);
    // await data.createRoom(id, cap, start, end);
    const params = {id: room_id.value, capacity: Number(capacity.value), start_time: Number(start_time.value), end_time: Number(end_time.value)};
    await fetch(`/saveRoom` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }).then(response => {
        // Handle the response here
        if (response.status == 200) {
            console.log("Room inserted");
            // window.location.href = "book_delete.html";
        }
      })
      .catch(error => {
        console.error(error);
      });

});

// confirm_update.addEventListener('click' , async() => {
//     //get info from page and save to database
//     let id = room_id.value;
//     let cap = Number(capacity.value);
//     let start = Number(start_time.value);
//     let end = Number(end_time.value);
//     await data.updateRoom(id, cap, start, end);
    
// });
//to update capacity of room
// confirm_button.addEventListener('click' , () => {
//     update room features and save to database
//     let id = room_id.value;
//     this feature should be updated by the building admin
//     feature to update = capacity 
//     data.updateRoomCapacity(id, cap);
// });

//to update avaialability of room
// confirm_button.addEventListener('click' , () => {
    //update room features and save to database
    // let id = room_id.value;
    //this feature should be updated when user adds or deletes availability of a room
    // feature to update = availability 
    // data.updateRoomAvailability(id, avaialability);
// });

//to delete the room
// confirm_button.addEventListener('click' , () => {
    //update room features and save to database
    // let id = room_id.value;
    //this should be done by admin
    // data.deleteRoom(id);
// });
