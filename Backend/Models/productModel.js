const mongoose = require('mongoose')
const { Schema } = mongoose;


const productSchema = new Schema({

    Name:{
        type:String,
        unique:true,
        required:true
    },
    slug:{
        type:String,
        lowercase:true
    },
    Description:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Category:{
        type:mongoose.ObjectId,
        ref:'Categories',
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    Image:{
        data:Buffer,
        contentType:String,
    },
    Shipping:{
        type:Boolean
    }



},{timestamps:true});

module.exports =  mongoose.model('Products', productSchema)
 