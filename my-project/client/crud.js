// ====================== USER CRUD ========================= //

export async function createUser(id, password, capacity, start_time, end_time, assigned) {
    const response = await fetch(`/saveUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id, password: password, capacity: capacity, start_time: start_time, end_time: end_time, assigned: assigned }),
    });
    console.log("es:" , response);
    return response.ok;
    // const data = await response.json();
    // return data;
  }
  
  export async function readUser(id) {
    try {
      const response = await fetch(`/getUserDetails?id=${id}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function updateUser(id, capacity, start_time, end_time, assigned) {
    const response = await fetch(`/saveUserPreferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id, capacity: capacity, start_time: start_time, end_time: end_time, assigned: assigned }),
    });
    return response.ok;
    // const data = await response.json();
    // return data;
  }
  
  export async function deleteUser(id) {
    const response = await fetch(`/deleteUser`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();
    return data;
  }
  
  export async function readAllUsers() {
    const response = await fetch(`/getAllUserDetails`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }

// ======================== ROOM CRUD ============================ //

export async function createRoom(id, capacity, start_time, end_time, availability, assignment) {
    const response = await fetch(`/saveRoom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id, capacity: capacity, start_time: start_time, end_time: end_time, availability: availability, assignment: assignment }),
    });
    return response.ok;
    // const data = await response.json();
    // return data;
  }
  
  export async function readRoom(id) {
    try {
      const response = await fetch(`/getRoomDetails?id=${id}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function updateRoom(id, capacity, start_time, end_time, availability, assignment) {
    const response = await fetch(`/saveRoomPreferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id, capacity: capacity, start_time: start_time, end_time: end_time, availability: availability, assignment: assignment }),
    });
    return response.ok;
    // const data = await response.json();
    // return data;
  }
  
  export async function deleteRoom(id) {
    const response = await fetch(`/deleteRoom`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();
    return data;
  }
  
  export async function readAllRooms() {
    const response = await fetch(`/getAllRoomDetails`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }
  