const mongoose=require("mongoose")
const option={ useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect("mongodb://127.0.0.1:27017/ShubhAkkyShop",option).then(()=>{
    console.log("connection is succefull")
}).catch((err)=>{
    console.log(err)
})