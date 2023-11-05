const express=require("express");
const router=express.Router();
const PaymentController=require("../../controllers/PaymentControllers/PaymentController.js")



router.post("/create-order",PaymentController.CreateOrder)

module.exports=router;