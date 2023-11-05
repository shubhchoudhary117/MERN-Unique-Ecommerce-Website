const { default: mongoose } = require("mongoose")

require("../db/connect.js")

//create table structure
const TableSchema=new mongoose.Schema({
    Name:{type:String},
    Surname:{type:String},
    Email:{type:mongoose.Schema.Types.Mixed},
    Password:{type:mongoose.Schema.Types.Mixed}
})

const TableObj=new mongoose.model("AuthTable",TableSchema);

module.exports=TableObj;