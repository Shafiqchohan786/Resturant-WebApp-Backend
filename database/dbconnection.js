import mongoose from "mongoose";
export const dbconnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"Resturant",
    }).then(()=>{
        console.log("Connected to Database Successfully:")
    }).catch((err)=>{
        console.log(`Error in Connecting Database ${err}`)
    })
}