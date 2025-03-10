const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    Mail:{
        type:String,
        required:true,
        messegedAt:Date.now()
    },
    Messege:{
        type:String,
        required:true,
        messegedAt:Date.now()
    }
})

module.exports=mongoose.model("Schema",Schema)