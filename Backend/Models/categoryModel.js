const mongoose = require('mongoose')
const { Schema } = mongoose;


const categorySchema = new Schema({

    cName:{
        type:String,
        unique:true,
        required:true
    },
    slug:{
        type:String,
        lowercase:true
    }


},{timestamps:true});

module.exports =  mongoose.model('Categories', categorySchema)