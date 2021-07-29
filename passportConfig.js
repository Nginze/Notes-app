const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const connection =require('./Database')
const verifyPassword = require('./passwordUtils').verifyPassword
const User = require('./Database').User


//Local strategy implementation
passport.use('login-local',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    },
    (email,password,done)=>{
        User.findOne({email:email})
            .then((user)=>{
                if(!user){
                    return done(null,false)
                }
                isValid = verifyPassword(password,user.password)
                if(isValid){
                
                    console.log('Valid password...')
                    done(null,user)
                }
                else{
                    console.log('invalid user')
                    done(null,false)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
))

//Serialize users into session
passport.serializeUser((user,done)=>{
    console.log(user._id)
    return done(null,user._id)
})
//Deserialize users from session using id
passport.deserializeUser((user_id,done)=>{
  
    User.findOne({_id:user_id})
        .then((user)=>{
            return done(null,user)
        })
        .catch((err)=>{
            console.log(err)
        })
})