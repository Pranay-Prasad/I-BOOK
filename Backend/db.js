const mongoose  = require('mongoose');
const mongoURI = "mongodb://localhost:27017/ibook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectTomongo = () =>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connection successful");
    })
}

module.exports = connectTomongo;