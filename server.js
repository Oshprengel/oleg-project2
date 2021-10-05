//___________________
//Dependencies
//___________________
const express = require('express');
require('dotenv').config();
const methodOverride = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;

const session = require('express-session')
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));

//___________________
//Middleware
//___________________
app.use(
  session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false
  })
);



//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________

//for everything involving user login/createuser use the userRouter
const userRouter = require('./controllers/userRouter');
app.use('/users',userRouter)

//for everything involving posts including CRUD operations
const postRouter = require('./controllers/postRouter');
app.use('/posts', postRouter)

//if somebody attempts to go to the root route the redirect them to the login
app.get('/',(req,res)=>{
  res.redirect('/users/login')
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('express is listening on:', PORT));