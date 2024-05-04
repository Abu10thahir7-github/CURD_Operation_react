


const mongoose=require('mongoose')


//


const userSchema=mongoose.Schema({
    name:{
        type:String,
        
    },
    age:{
        type:Number
    },
    place:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }

})

//model

const userModel=mongoose.model('users',userSchema)

module.exports=userModel;
