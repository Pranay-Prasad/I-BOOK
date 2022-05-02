const mongoose  = require('mongoose');
const mongoURI = "mongodb+srv://pranay123:u1r9y8HxZku3JgTw@mongodb.aqapr.mongodb.net/mongoDB?retryWrites=true&w=majority";

const connectTomongo = () =>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connection successful");
    })
}

module.exports = connectTomongo;