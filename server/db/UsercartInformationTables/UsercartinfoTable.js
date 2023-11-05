const { default: mongoose } = require("mongoose")

require("../connect.js")


const CartModelStructure=new mongoose.Schema({
    Id:{type:String},
    ProductName:{type:String},
    NetQuantity:{type:Number},
    Size:{type:String},
    Fabric:{type:String},
    Dilavery:{type:String},
    ItemPrice:{type:Number},
    LogoPrice:{type:Number},
    TotalPrice:{type:Number},
    UserChoosesImage:{type:String},
    UplodedImage:{type:String},
    UserAuth:{type:mongoose.Schema.Types.Mixed},
    Salername:{type:String}
 
})






const CartsTable=new mongoose.model("UserCartTable",CartModelStructure)

module.exports=CartsTable;