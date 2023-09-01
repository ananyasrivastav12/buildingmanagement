import { Room } from './main_db.js';

export async function createRoom(id, capacity, start_time, end_time, availability, assignment){
  try {
    console.log("now: " , id, capacity, start_time, end_time, availability, assignment);
    const newRoom = new Room({
      _id: id,
      capacity: capacity,
      start_time: start_time,
      end_time: end_time,
      availability: availability,
      assignment: assignment,
    });
    const savedRoom = await newRoom.save();
    console.log('Room created successfully:', savedRoom);
    return savedRoom;
  } catch (error) {
    console.error('Failed to create room:', error);
    throw error;
  }
}

export async function readRoom(id){
  try {
    const room = await Room.findById(id);
    if (!room) {
      console.log('Room not found');
      return null;
    }
    console.log('Room found:', room);
    return room;
  } catch (error) {
    console.error('Failed to retrieve room:', error);
    throw error;
  }
}

export async function updateRoom(id, capacity, start_time, end_time, availability, assignment){
  const updates = {capacity: capacity, start_time: start_time, end_time: end_time, availability: availability, assignment: assignment}
  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, updates, {
      new: true
    });
    if (!updatedRoom) {
      console.log('Room not found');
      return null;
    }
    console.log('Room updated successfully:', updatedRoom);
    return updatedRoom;
  } catch (error) {
    console.error('Failed to update room:', error);
    throw error;
  }
}

export async function deleteRoom(id){
  try {
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      console.log('Room not found');
      return null;
    }
    console.log('Room deleted successfully:', deletedRoom);
    return deletedRoom;
  } catch (error) {
    console.error('Failed to delete room:', error);
    throw error;
  }
}

export async function readAllRooms() {
  try {
    const rooms = await Room.find();
    return rooms;
  } catch (error) {
    console.error('Failed to retrieve rooms:', error);
    throw error;
  }
}


// ==================== TESTING ====================== // 


// await createRoom("7", 4, 9, 23, [[2,3], [5,6]], {12: [[2,4] , [9,10]]});
// await createRoom("5", 4, 9, 23, [[2,3], [5,6]], {12: [[2,4] , [9,10]]});

// await readRoom("7");

// await updateRoom("7", 3, 4, 8, [[8,12]], {10: [[2,3], [6,9]]});

// await deleteRoom("5");

// console.log(await readAllRooms());

// Room.findOne({ _id: '7' })
//   .then(room => {
//     if (room) {
//       console.log('Room found:', room);
//     } else {
//       console.log('Room not found');
//     }
//   })
//   .catch(error => {
//     console.error('Failed to retrieve room:', error);
//   });