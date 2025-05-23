const mongoose = require('mongoose');

const connectDB = (URL) => {
    try {
        return mongoose.connect(URL)
        // console.log('connected to DB');
    }catch(err){
        console.log(err)
    }
    
} 

module.exports =  connectDB;