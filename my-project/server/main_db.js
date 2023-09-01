// Require mongoose module
import mongoose from 'mongoose';

const uri = "mongodb+srv://saniyasingh:Room-Manager-326@cluster0.puz0pis.mongodb.net/?retryWrites=true&w=majority";
  
// Set Up the Database connection
mongoose.connect(
    uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  
// Defining User schema
const userSchema = new mongoose.Schema(
    { _id: String, password: String, capacity: Number, start_time: Number, end_time: Number, assignment: { type: Object, default: {} } }
);

// Defining Room schema
const roomSchema = new mongoose.Schema(
    { _id: String, capacity: Number, start_time: Number, end_time: Number, availability: [[Number]], assignment: { type: Object, default: {} } }
);

// Defining User model
const User = mongoose.model('users', userSchema);

// Defining Room model
const Room = mongoose.model('rooms', roomSchema);
  
// Create collection of Model
User.createCollection().then(function (collection) {
    console.log('Collection is created!');
});

Room.createCollection().then(function (collection) {
    console.log('Collection is created!');
});

export {User, Room};