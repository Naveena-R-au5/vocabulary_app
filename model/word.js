const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

const WordSchema = new mongoose.Schema({
    wordid:{
        type:String,
        required:true
    },
    metadata:[{
        type:Object,
        required:true
    }],
    results:[{
        type:Object,
        required:true
    }],
    word:{
        type:String,
        required:true
    },
},{timestamps:true})

mongoose.model("Word",WordSchema)