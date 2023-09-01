import User from './user.js'

export default class Room{

    constructor(id, capacity, start_time, end_time, availability, assigned){
        this.id = id;
        this.capacity = capacity;
        //time when the building opens
        this.start_time = start_time;
        //time when the building closes
        this.end_time = end_time;
        //set availabilty based on time
        if(availability.length === 0){
            //default values
            // console.log(PriorityQueue);
            this.availability = new PriorityQueue({comparator: (a, b) => a[0] - b[0]});
            this.availability.queue([0,start_time]);
            this.availability.queue([end_time, 3000]);
        } else{
            this.availability = new PriorityQueue({comparator: (a, b) => a[0] - b[0]});
            availability.forEach((element) => {
                this.availability.queue([element[0] , element[1]]);
            });
        }
        //assigned users: [time1,time2, ... ]
        this.assigned = assigned;
    }

    get_id = () => this.id;
    set_id = (new_id) => {this.id = new_id};

    get_capacity = () => this.capacity;
    set_capacity = (new_capacity) => {this.capacity = new_capacity;}

    get_availability = () => this.availability.priv.data;
    
    get_start_time = () => this.start_time;
    set_start_time = (new_time) => {this.start_time = new_time};

    get_end_time = () => this.end_time;
    set_end_time = (new_time) => {this.end_time = new_time};

    get_assigned_users = () => this.assigned;
    set_assigned_users = (new_assignment) => {this.assigned = new_assignment};

    is_compatible = (user) => {
        if(user.get_capacity() > this.capacity){
            console.log("Capacity Not Met");
            return false;
        }

        // if(this.start_time > user.get_start_time()){
        //     console.log("Start time issue");
        //     return false;
        // }

        // if(this.end_time < user.get_end_time()){
        //     console.log("End time issue");
        //     return false;
        // }

        if(user.get_end_time() - user.get_start_time() > 180){
            console.log("Duration issue");
            return false;
        }

        console.log("All good");
        return true;

        // return (user.get_capacity() <= this.capacity && this.start_time <= user.get_start_time() && this.end_time >= user.get_end_time() && (user.get_end_time() - user.get_start_time()) <= 3);
    }

    //merges booked times
    // ex: [2,5],[5,6] => [2,6]
    merge_availabilities = () => {
        let new_availability = new PriorityQueue({comparator: (a, b) => a[0] - b[0]});
        while(this.availability.length > 0){
            let curr = this.availability.dequeue();
            while(this.availability.length > 0 && curr[1] >= this.availability.peek()[0]){
                curr[1] = this.availability.dequeue()[1];
            }
            new_availability.queue(curr);
        }
        this.availability = new_availability;
    }

    //check if there is a clash of timings with room availability and user preferences
    //returns true if there is a clash else returns false
    detect_clash = (user) => {
        let clone_availability = new PriorityQueue({comparator: (a, b) => a[0] - b[0]});
        
        this.availability.priv.data.forEach(element => {
            // console.log(element);
            clone_availability.queue([element[0] , element[1]]);
        });
        
        clone_availability.queue([user.get_start_time() , user.get_end_time()]);
        // console.log(this.id);
        // console.log(clone_availability.priv.data);
        // console.log(this.availability.priv.data);
        // console.log("=======================");
        while(clone_availability.length > 0){
            let curr = clone_availability.dequeue();
            // console.log(curr);
            if(clone_availability.length > 0 && curr[1] > clone_availability.peek()[0]){
                return true;
            }
        }
        // console.log("---------------------------------------------");
        return false;
    }

    //suggest next availability for the duration that user inputs
    next_availability = (user) => {
        let duration = user.get_end_time() - user.get_start_time();
        let arr = this.availability.priv.data;
        let result = [];
        console.log(arr);
        for (let i = 0; i < arr.length-1; ++i){
            let diff =  arr[i+1][0] - arr[i][1];
            // console.log("diff: " , diff);
            if(diff >= duration){
                result.push([arr[i][1] , arr[i+1][0]]);
            }
        }
        return result;
    }

    book_room = (user) => {
        let value = [user.get_start_time() , user.get_end_time()];
        let copy_value = [value[0], value[1]];
        this.availability.queue(copy_value);
        this.merge_availabilities();
        let key = user.get_id();
        if(key in this.assigned){
            this.assigned[key].push(value);
        } else{
            this.assigned[key] = [value];
        }
        let key_1 = this.id;
        let user_rooms = user.get_assigned_rooms();
        if(key_1 in user.assigned){
            user_rooms[key_1].push(value);
        } else{
            user_rooms[key_1] = [value];
        }
        user.set_assigned_rooms(user_rooms);
    }

    //time = [start_time, end_time]
    delete_booking(user, time){
        // let time = [user.get_start_time() , user.get_end_time()];
        let key = user.get_id();
        if(key in this.assigned){
            let value = this.assigned[key];
            let index = value.findIndex((element) => element[0] === time[0] && element[1] === time[1]);
            if(index >= 0){
                value.splice(index,1);
                let new_availability = new PriorityQueue({comparator: (a, b) => a[0] - b[0]});

                new_availability.queue([0,this.start_time]);
                new_availability.queue([this.end_time, 1000]);

                value.forEach((element) => {new_availability.queue(element)});
                this.availability = new_availability;
                this.merge_availabilities();
            } else{
                console.log("time not found in room assignment");
            }
        } else{
            console.log("user_id not assigned to room");
        }

        let key_1 = this.id;
        let books = user.get_assigned_rooms(); 
        if(key_1 in books){
            let value = books[key_1];
            let index = value.findIndex((element) => element[0] === time[0] && element[1] === time[1]);
            if(index >= 0){
                value.splice(index,1);
            } else{
                console.log("time not found  in user bookings");
            }
        } else{
            console.log("room_id not found in user bookings");
        }
    }
}

// =============== TESTING ============== //

// let room1 = new Room(0 , 4 , 8, 23, [], {});
// let user1 = new User(4, 3, 8, 10);
// room1.merge_availabilities();
// console.log(room1.get_availability());

// room1.merge_availabilities();
// console.log(room1.next_availability(user1));
// console.log(room1.detect_clash(user1));
// console.log(room1.get_availability());
// console.log(room1.get_capacity());
// console.log(room1.is_compatible(user1));

// room1.book_room(user1);
// console.log(room1.get_assigned_users());
// console.log(room1.get_availability());

// room1.delete_booking(user1 , [8,10]);
// console.log(room1.get_assigned_users());
// console.log(room1.get_availability());

// this.availability.queue([11, 13]);
// this.availability.queue([13,16]);
// this.availability.queue([16,17]);
// this.availability.queue([18,20]);