const express = require('express')
const router = express.Router()
const passport = require('passport')
const flash = require('connect-flash')
require('../passportConfig')


router.get('/',(req,res)=>{
   
    res.render('Index',{ Signup_message:req.flash('Sign_message'),
    user : req.user,
    Auth_message : req.flash('Failed_Auth')})
})
router.post('/',passport.authenticate('login-local',{
    failureRedirect: '/',
    failureFlash:true
}),(req,res)=>{
    req.flash('Login_message','Successful Login')
    res.redirect('/Dashboard')
})

module.exports = router
