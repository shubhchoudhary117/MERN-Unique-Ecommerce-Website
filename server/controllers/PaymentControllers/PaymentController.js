
const UserModel = require("../../db/DataBaseTable.js");
const jwt=require("jsonwebtoken")
var Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_VfKCRNfVkjtHFd', key_secret: 'oeiuHaCr4kRHQYVr6kayuDct' })
class PaymentController {


    static CreateOrder = async (req, res) => {
        try {
            let token = req.body.token;
            if (token != null) {
                // verify the token
                let verifyToken = jwt.verify(token, "shubhakky2533", async (err, user) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // fetch the user form the database
                        let User = await UserModel.findOne({ _id: user.id });
                        if (User) {
                            // options
                            var options = {
                                amount: req.body.ammount,  // amount in the smallest currency unit
                                currency: "INR",
                                receipt: "txn_2533711"
                            }
                            instance.orders.create(options, function (err, order) {
                                console.log(order)
                                if(err){console.log(err)}
                                else{
                                    res.json({ orderCreated: true, order: order })
                                }
                            });
                        }
                    }
                })
            }

        }
        catch (error) {
            console.log(error)
            res.json({ orderCreated: false, order: null })
        }


    }
}


module.exports = PaymentController;