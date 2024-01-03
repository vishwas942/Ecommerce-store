const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const Mongo_URI = process.env.MONGO_URL ||'mongodb://127.0.0.1:27017/Ecommerce';

const ConnectTomongo =async () => {
    try{
    const conn = await mongoose.connect(Mongo_URI);
    console.log(`Connected to mongo database successfully ${conn.connection.host}`);
    } catch(error){
        console.log(`Error in mongodb ${error}`)
    }
}


module.exports = ConnectTomongo;

