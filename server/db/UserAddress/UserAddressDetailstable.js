const mongoose=require("mongoose")

require("../connect.js")

const AddressTabelStructure=new mongoose.Schema({
    Name:{type:String},
    PhoneNumber:{type:Number},
    BuldingName:{type:String},
    AreaName:{type:String},
    Pincode:{type:Number},
    City:{type:String},
    State:{type:String}
})

const AddressTable=new mongoose.model("UsersAddressTable",AddressTabelStructure);

module.exports=AddressTable;