const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  Name:{
    type:String,
    required:true,
    trim:true
  },
  Email:{
    type:String,
    required:true,
    unique:true
  },
  Password:{
    type:String,
    required:true,
  },
  Phone:{
    type:String,
    required:true,
  },
  Address:{
    type:String,
    required:true,
  },
  Question:{
    type:String,
    required:true,
  },
  Role:{
    type:Number,
    default:0
  }
},{timestamps:true});

module.exports =  mongoose.model('Users', userSchema)