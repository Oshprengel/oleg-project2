//this router basically manages all routes that include logging in/creating a new user

//dependecies
const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/userModel')


//---------------------
//login/logout routes
//---------------------


//main login/create user page
userRouter.get('/login',(req,res)=>{
    res.render('loginPage.ejs')
})

//attempt to login user
userRouter.post('/login-attempt',(req,res)=>{
    //trys to find the user in the database
    User.findOne({name:req.body.name},(error, foundUser, )=>{
        //if there is an error or no user is found then send the user an alert and redirect them back to login page
        if(error || !foundUser){
            res.render('loginPage.ejs',{error:"Invalid Username"})
        }
        //if there is no error
        else{
            //true if user password entered is valid password for that user
            isValidPassword = bcrypt.compareSync(req.body.password, foundUser.password)
            //if valid set session user to the curruser and redirt to all-posts page
            if(isValidPassword){
                req.session.currUser = foundUser
                res.redirect('/posts/all-posts')
            }
            //otherwise send user back to login page with an error message
            else{
                res.render('loginPage.ejs',{error:"Invalid Password"})
            }

        }
    })
})
//logs user out
userRouter.post('/log-out',(req,res)=>{
    req.session.destroy((error)=>{
        res.redirect('/users/login')
    })
})

//---------------------
//create new user routes
//---------------------


//create new user page
userRouter.get('/create',(req,res)=>{
    res.render('newUser.ejs')
});

//post new user
userRouter.post('/', (req,res)=>{
    console.log('post')
    //first checks if a user with this name is already in the db
    User.findOne({name:req.body.name},(error, foundUser)=>{
    //if user already exists or there is an error
    if(foundUser || error){
        res.render('newUser.ejs',{error:"User already exists"})
    }
    else{
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        //create new user and update DB
        User.create(req.body,(error)=>{
            //find newly created user ###theres probaly a better way to this ###issue 1 ###
            User.findOne({name:req.body.name},(error,newUser)=>{
                //once the newly created user is found then make that the current user for the session then redirect to all post 
                req.session.currUser = newUser
                res.redirect('/posts/all-posts')
            })
        })
      }
    })  
})
//export userouter
module.exports=userRouter