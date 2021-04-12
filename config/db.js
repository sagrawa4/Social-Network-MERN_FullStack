const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Mongo db Connected..");
    }catch(err){
        console.log("Connection failed" + err.message);
        process.exit(1);
        
    }
};

module.exports =connectDB;