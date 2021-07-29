
// Mongoose setup

const mongoose = require('mongoose')
var connection = mongoose.connect('mongodb+srv://Jonathan:guuk12jona@cluster0.vnne0.mongodb.net/Users', { useNewUrlParser: true,  useUnifiedTopology: true  },(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('connected to db....')
    }
})

var Schema = mongoose.Schema

//User Schema
var UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    notes:[{
        title:{
            type:String,
            
        },
        content:{
            type:String,
            
        },
        time:Date
    }]
})
//User Model
var User = mongoose.model("User", UserSchema)




module.exports = {User}
