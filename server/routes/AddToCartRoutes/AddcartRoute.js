const express=require("express");
const router=express.Router();
const AddtoCartControl=require("../../controllers/AddToCartControllers/Addcartcontroll.js")
const {uploadImage} =require("../../controllers/AddToCartControllers/UplodeImageSaving.js")
const CartControl=require("../../controllers/AddToCartControllers/cartControllers/cart.js")
const AuthenticatControllers=require("../../controllers/AuthenticatControllers/CartPageAuthorization.js")
// Define Routes for Add cart and other Product Buying Products

router.get("/",AddtoCartControl.AddCartLayout)

//post added cart information in mongodb database
router.post("/",uploadImage,AddtoCartControl.UserAddedCartStore)


// check user is authenticate or not 
router.post("/authenticate",AuthenticatControllers.VerifyToken,AuthenticatControllers.getUser)


//send data in frontend 
router.post("/cart",CartControl.SendData)

// delete cart 
router.post("/cart/remove/:id",CartControl.DeleteCart)

// get total number of objects in database carts table
router.post("/totalcarts",CartControl.TokenVerify,CartControl.CartCount)



module.exports=router;