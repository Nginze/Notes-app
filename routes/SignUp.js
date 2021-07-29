const express = require('express')
const router = express.Router()
const User = require('../Database').User
// router routes
router.get('/SignUp',(req,res)=>{
    
    res.render('SignUp')
})

router.post('/SignUp', (req,res)=>{
    
  /*  console.log(req.body)
   sql = `INSERT INTO devusers(email,password) VALUES (${JSON.stringify(req.body.email)},${JSON.stringify(req.body.password)})`
  sql = `INSERT INTO register(email,hash,salt) VALUES ()
   connection.query(sql,(err,results)=>{
       if(err){
           console.log('error: '+err)
       }
       else{
        console.log('new user created')
        req.flash('Sign_message', ' Successfully Create Account ')
        res.redirect('/')
       }
      
   }) */
//Mongoose method
var newuser = new User({
    email:req.body.email,
    password:req.body.password
})
newuser.save()
    .then((user)=>{
        req.flash('Sign_message', ' Successfully Create Account ')
        res.redirect('/')
        console.log('Saved to DB')
    })
    .catch((err)=>{
        console.log(err)
    })
    
})


module.exports = router