const express = require('express')
const router = express.Router()
const User = require('../Database').User

// Custom Authentication middleware
const isAuth = (req,res,next)=>{
    if(req.isAuthenticated()){
        next()
    }
    else{
        console.log('redirecting......')
        req.flash('Failed_Auth','Login To Access The Page')
        res.redirect('/')
    }
}

router.get('/Dashboard',isAuth,(req,res)=>{
    res.render('Dashboard',{ Login_message : req.flash('Login_message')})
})

router.post('/Dashboard',isAuth,(req,res)=>{
    User.findOneAndUpdate({_id:req.user._id},{
        $push : {
            notes:{
                title:req.body.title,
                content:req.body.content
            }
        }
    })
        .then(()=>{
            console.log('Note added ')
            res.redirect("/Notes")
        })
})

router.get('/About',isAuth,(req,res)=>{
    res.render('About')
})


router.get('/Notes',isAuth,(req,res)=>{
    User.findOne({_id:req.user._id},'notes')
        .then((result)=>{
        
            res.render('Notes',{notes:result.notes})
        })
        .catch((err)=>{
            console.log(err)
        })
})
router.get('/Notes/:id',isAuth,(req,res)=>{
    id = req.params.id
 
    User.findOneAndUpdate({_id:req.user._id},{
        $pull:{
            notes:{
               _id:id
            }
        }
    })
    .then(()=>{
        res.redirect('/Notes')
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.get('/Edit/:id',isAuth,(req,res)=>{
    id = req.params.id
    console.log("id is:"+id)
    User.findOne({_id:req.user.id},'notes')
    .then((result)=>{
        console.log(result)
        notes = result.notes
        notes.forEach((note)=>{
            if(note._id==id){
                _note = note
                res.render('Edit',{note:_note})
            }
        })
    })

})
  


router.post('/Edit/:id',isAuth,(req,res)=>{
    
    User.findOneAndUpdate({_id:req.user._id,"notes._id":id},{
        
            $set:
            {
               
               "notes.$.title":req.body.title,
               "notes.$.content":req.body.content
            }
        
    })
    .then(()=>{
        res.redirect('/Notes')
    })
})


router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/')
})

module.exports = router