import * as room_data from './room_crud.js';
import * as user_data from './user_crud.js';
import 'dotenv/config';
import expressSession from 'express-session';
import * as users from './users.js';
import auth from './auth.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//Import Morgan and Express
import logger from 'morgan';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname( dirname(__filename));

// Create an Express app.
const app = express();
const port = process.env.PORT || 3000;

//Session configuration
const sessionConfig = {
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
}

// Add middleware to the Express app.
app.use(expressSession(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use(logger('dev'));
app.use('/', express.static('client'));
auth.configure(app);

// =================== AUTHENTICATION ================= //

function checkLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    next();
  } else{
    res.redirect('/login');
  }
}

// Implement the / endpoint
app.get('/' , async (req, res) => {
  res.sendFile('./home.html', {root: 'client'})
});

app.get('/login', (req, res) => 
  res.sendFile('./login.html', { root: 'client'})
);

app.post(
  '/login',
  auth.authenticate('local' , {
    successRedirect: '/private',
    failureRedirect: '/login',
  })
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (await users.addUser(username, password)){
    res.redirect('/login');
  } else {
    res.redirect('/register');
  }
});

app.get('/register' , (req, res) => {
  res.sendFile('./register.html', { root: 'client'});
});

app.get(
  '/private',
  checkLoggedIn,
  (req, res) => {
    res.redirect('/private/' + req.user);
  }
);

app.get(
  '/private/:userID/',
  checkLoggedIn,
  (req, res) => {
    if(req.params.userID === req.user){
      res.sendFile('./book_delete.html', { root: 'client' });
    } else{
      res.redirect('/private/');
    }
  }
);

// =================== USER API ================= //

//Implement the /getAllRooms endpoint
app.get('/getAllUserDetails', async(req, res) => {
  let users = await user_data.readAllUsers();
  res.status(200).json(users);
  res.end();
});


//Implement the /getUserDetails endpoint
app.get('/getUserDetails', async(req, res) => {
    if(req.query.id !== undefined){
        let user = await user_data.readUser(req.query.id);
        res.status(200).json(user);
    } else{
        res.status(400).json({message: "No id specified"});
    }
    res.end();
});


// Implement the /saveUser endpoint
app.post('/saveUser' , async (req, res) => {
  console.log("id: " , req.body.id);
    if(req.body.id !== undefined && req.body.password !== undefined && req.body.capacity !== undefined && req.body.start_time !== undefined && req.body.end_time !== undefined, req.body.assigned !== undefined){
      let response = await user_data.createUser(req.body.id, req.body.password, req.body.capacity, req.body.start_time, req.body.end_time, req.body.assigned);
      console.log(response);
      res.status(200).send('OK');
    } 
    else{
      res.status(400).send('Bad Request');
    }
    
    res.end();
});


// Implement the /saveUserPreferences endpoint
app.put('/saveUserPreferences' , async (req, res) => {
  if(req.body.id !== undefined && req.body.capacity !== undefined && req.body.start_time !== undefined && req.body.end_time !== undefined && req.body.assigned !== undefined){
    let response = await user_data.updateUser(req.body.id, req.body.capacity, req.body.start_time, req.body.end_time, req.body.assigned);
    console.log(response);
    res.status(200).send('OK');
  } else{
    res.status(400).send('Bad Request');
  }
  res.end();
});

app.delete('/deleteUser', async (req, res) => {
    if(req.body.id !== undefined){
        let response = await user_data.deleteUser(req.body.id);
        res.status(200).json(response);
    } else{
        res.status(400).send('Bad Request');
    }
});



// =================== ROOM API ================= //


//Implement the /getAllRooms endpoint
app.get('/getAllRoomDetails', async(req, res) => {
    let rooms = await room_data.readAllRooms();
    res.status(200).json(rooms);
    res.end();
});


//Implement the /getRoomDetails endpoint
app.get('/getRoomDetails', async(req, res) => {
    if(req.query.id !== undefined){
        let room = await room_data.readRoom(req.query.id);
        res.status(200).json(room);
    } else{
        res.status(400).json({message: "No id specified"});
    }
    res.end();
});

// Implement the /saveRoom endpoint
app.post('/saveRoom', async (req, res) => {
    if(req.body.id !== undefined && req.body.capacity !== undefined && req.body.start_time !== undefined && req.body.end_time !== undefined && req.body.availability !== undefined && req.body.assignment !== undefined){
      // console.log(req.body.id, req.body.capacity, req.body.start_time, req.body.end_time, req.body.availability, req.body.assignment);
        let response = await room_data.createRoom(req.body.id, req.body.capacity, req.body.start_time, req.body.end_time, req.body.availability, req.body.assignment);
        console.log(response);
    res.status(200).send('OK');
    } else{
        // console.log(req.body.id, req.body.capacity, req.body.start_time, req.body.end_time, req.body.availability, req.body.assignment);
        res.status(400).send('Bad Request');
    }
    res.end();
});

// Implement the /saveRoomPreferences endpoint
app.put('/saveRoomPreferences' , async (req, res) => {
  // console.log(req.body.id);
    if(req.body.id !== undefined && req.body.capacity !== undefined && req.body.start_time !== undefined && req.body.end_time !== undefined && req.body.availability !== undefined && req.body.assignment !== undefined){
      let response = await room_data.updateRoom(req.body.id, req.body.capacity, req.body.start_time, req.body.end_time, req.body.availability, req.body.assignment);
      console.log(response);
      res.status(200).send('OK');
    } else{
      res.status(400).send('Bad Request');
    }
    res.end();
  });

  app.delete('/deleteRoom', async (req, res) => {
    if(req.body.id !== undefined){
        let response = await room_data.deleteRoom(req.body.id);
        res.status(200).json(response);
    } else{
        res.status(400).send('Bad Request');
    }
});

// // Implement the / endpoint
// app.get('/' , async (req, res) => {
//   res.sendFile('./home.html', {root: 'client'});
// });


// This matches all routes that are not defined.
app.all('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

// Start the server.
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
