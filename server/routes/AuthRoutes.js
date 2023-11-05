const express=require("express")
const router=express.Router()
const Control=require("../controllers/AuthController.js")

// Define Routes
router.get("/",Control.Home)

router.post("/signeup",Control.CreateUser)

router.post("/login",Control.LoginUser)

router.post("/testapi",Control.ApiTesting)

module.exports=router;