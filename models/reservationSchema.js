import mongoose from "mongoose";
import validator from 'validator';
const reservationSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:[3,"First Name must contain at least 3 Characters!"],
        maxlength:[30,"First Name can not exceed 30 Characters!"]
    },
    lastName:{
        type:String,
        required:true,
        minlength:[3,"Last Name must contain at least 3 Characters!"],
        maxlength:[30,"Last Name can not exceed 30 Characters!"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Provide a valid Email!"]
    },
    phone:{
        type:String,
        required:true,
        minlength:[11,"Phone Number must contain only 11 Digits!"],
        maxlength:[11,"Phone Number must contain only 11 Digits!"],
    },
    time:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    }
})
export const Reservation=mongoose.model("Reservation",reservationSchema)