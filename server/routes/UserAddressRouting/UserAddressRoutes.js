const express=require("express")
const router=express.Router();
const Addcartcontroll=require("../../controllers/AddressControllers/AddressController.js")
const AddressControl=require("../../controllers/AddressControllers/AddressController.js")

// define the routes for user address 

// post address in backend 
router.post("/address",AddressControl.PostAddress)

// get user address from backend and send address detail in frontend
router.post("/dilevar/address",AddressControl.VerifyToken,AddressControl.getAddress)

// checking the user is address form fill or not
router.post("/addressauth",AddressControl.AddressTokenVerify,AddressControl.checkAddressAuthorization)

// update user Address 
router.post("/updateaddress",AddressControl.UpdateUserAddress)

module.exports=router;