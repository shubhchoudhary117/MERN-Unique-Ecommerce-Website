const express=require("express");
const PlaceOrderController = require("../../controllers/PlaceOrderControllers/PlaceOrderController");

const router=express.Router();


router.post("/caseon-dilavery",PlaceOrderController.saveCaseOnDilaveryOrders);
router.post("/online-dilavery",PlaceOrderController.saveOnlinePaymentDilaveryOrders)
router.get("/my-orders/:token",PlaceOrderController.MyOrders)
module.exports=router;