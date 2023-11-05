const express = require("express")
const cookieParser = require("cookie-parser");
const cors = require("cors")
const Routes = require("../server/routes/AuthRoutes.js")
const AddCartRoutes = require("./routes/AddToCartRoutes/AddcartRoute.js")
const UserAddressRoutes=require("./routes/UserAddressRouting/UserAddressRoutes.js")
const placeOrderRoutes=require("./routes/PlaceOrderRoutes/Routes.js")
const path = require("path")
var app = express()
var PORT = process.env.PORT || 8000
app.use(cookieParser())
app.use(cors({credentials: true}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));
const PaymentGetwayRoutes=require("./routes/PaymentGetwayRoutes/PaymentGetwayRoutes.js")
// app.use(express.static(__dirname,"public"));
app.use("/public", express.static(path.join(__dirname, "public")))

// main routes
app.use("/", Routes)

// add to cart routes
app.use("/addcart", AddCartRoutes)

// user address Routes
app.use("/buy",UserAddressRoutes)

app.use("/product",PaymentGetwayRoutes)

app.use("/product/buy",placeOrderRoutes)



if(process.env.NODE_ENV=="production"){
  app.use(express.static("frontend/build"));
  const path=require("path");
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
  })
}

app.listen(PORT, () => {
  console.log(`server is lisning on ${PORT}`)
})