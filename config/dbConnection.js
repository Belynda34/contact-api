const mongoose = require("mongoose");

const connectDB = async  () =>{
    try{
        const connect = mongoose.connect("mongodb://127.0.0.1:27017/mycontacts-backend?directConnection=true");
        console.log("Database connected");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}


module.exports = connectDB;