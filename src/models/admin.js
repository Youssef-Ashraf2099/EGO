const mongoose = require('mongoose');
const validator=require('validator');

const adminschema=mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        trim:true,
        unique:true,
        lowercase:true,
        required:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new error('invalid email')
            }
            
        }


    },
    profilepic:{
        type:String //url or path to profile picture

    },
    password:{
        type:String,
        required:true,
        minlength:7
    }
    
},{
    timestamps:true
})

const Admin=mongoose.model('Admin',adminschema)

module.exports=Admin