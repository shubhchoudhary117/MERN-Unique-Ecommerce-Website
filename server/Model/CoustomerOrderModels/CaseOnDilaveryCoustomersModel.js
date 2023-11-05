const mongoose=require("mongoose")

const CaseOnDilaveryCoustomerSchema=({
    user:{
        type:mongoose.Schema.Types.Mixed
    },
    Products:{
        type:[
            {
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
                UserAuth:{type:String},
                Salername:{type:String}
            }
        ]
    },
    time:{
        type:Date,
        default:new Date()
    }

})

const CaseOnDilaveryCoustomerModel=mongoose.model("CaseOnDilaveryCoustmers",CaseOnDilaveryCoustomerSchema);

module.exports=CaseOnDilaveryCoustomerModel;