import User from './user.js'
import Room from './room.js'

export default class Rooms{

    constructor(rooms, user){
        this.rooms = rooms;
        this.user = user
    }

    get_rooms = () => this.rooms;
    add_room = (new_room) => {this.rooms.push(new_room);}
    delete_room = (room_id_to_delete) => {
        let index = this.rooms.findIndex(element => element.get_id() == room_id_to_delete);
        delete this.rooms[index];
    }

    get_user = () => this.user;
    set_user = (new_user) => {this.user = new_user};

    get_all_compatible_rooms = () => this.rooms.filter(room => room.is_compatible(this.user));
    
    get_list_of_available_rooms = () => {
        let result = [];
        let compatible_rooms = this.get_all_compatible_rooms();
        for(let i = 0; i < compatible_rooms.length; ++i){
            let current_room = compatible_rooms[i];
            if(!current_room.detect_clash(this.user)){
                result.push({room: current_room.get_id() , available: true, other_availability: [this.user.get_start_time() , this.user.get_end_time()]});
            }
            else{
                let next_time = current_room.next_availability(this.user);
                result.push({room: current_room.get_id() , available: false, other_availability: next_time})
            }

        }
        return result;
    }
}


// ========= TESTING ============== //

// let room1 = new Room(0 , 5 , 8, 24, [] , {});
// let room2 = new Room(1 , 10 , 8, 24, [], {});
// let room3 = new Room(2 , 5 , 8, 24, [] , {});
// let room4 = new Room(3 , 8 , 8, 24, [] , {});

// let user1 = new User(4, 3, 16, 18);
// let user2 = new User(1,5, 14,17);

// let r = new Rooms([room1,room2,room3,room4], user1);

// console.log(r.get_list_of_available_rooms());
// room1.book_room(user1);
// console.log("===========================");
// // console.log(user1.get_assigned_room());

// r.set_user(user2);
// console.log(r.get_list_of_available_rooms());

// let r2 = new Rooms([room1,room2,room3,room4] , user2);
// console.log(r2.get_list_of_available_rooms());