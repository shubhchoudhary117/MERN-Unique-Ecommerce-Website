const { response } = require("express")
const jwt = require("jsonwebtoken");
const OnlineDilaveryCoustomersModel=require("../../Model/CoustomerOrderModels/OnlineDilaveryCoustomersModel.js")
const CaseOnDilaveryCoustomerModel = require("../../Model/CoustomerOrderModels/CaseOnDilaveryCoustomersModel.js")
const CartsModel = require("../../db/UsercartInformationTables/UsercartinfoTable.js")
const UserModel = require("../../db/DataBaseTable.js")
class PlaceOrderController {
    static saveCaseOnDilaveryOrders = async (req, res) => {
        var User = null;
        try {

            jwt.verify(req.body.token, "shubhakky2533", async (err, user) => {
                User = await UserModel.findOne({ email: user?.email });
                var TotalItems = [];
                if (User) {

                    var buyingProducts = await CartsModel.find({ userAuth: User.email });
                    // count the total ammount of the placed order products
                    var Total = 0;
                    buyingProducts?.map((product) => {
                        Total += product.TotalPrice;
                        TotalItems.push(product)
                    })
                    // save the order details in CaseOnDilaveryCoustomersModel
                    var addedDilavery = null;
                    try {
                        const existUser = await CaseOnDilaveryCoustomerModel.findOne({ user: user?.email });
                        // check user is added one card or not
                        if (existUser) {
                            let updated = await CaseOnDilaveryCoustomerModel.updateOne({ email: user?.email }, { user: user?.email, $addToSet: { Products: TotalItems }, time: new Date(Date.now()) });
                            if (updated) {
                                buyingProducts.forEach(async (item) => {
                                    await CartsModel.remove({ _id: item._id })
                                })
                                // send response
                                res.json({ orderPlaced: true, authorization: true, addedDilavery: updated })
                            }
                        } else {
                            var addProductDilavery = new CaseOnDilaveryCoustomerModel(
                                { user: user?.email, Products: TotalItems, time: new Date(Date.now()) }
                            );
                            let addedDilavery = await addProductDilavery.save();
                            // remove items from card
                            if (addedDilavery) {
                                buyingProducts.forEach(async (item) => {
                                    await CartsModel.remove({ _id: item._id })
                                })
                            }
                            res.json({ orderPlaced: true, authorization: true, addedDilavery: addedDilavery })
                        }
                    }
                    catch (error) {
                        console.log(error);
                        res.json({ orderPlaced: false, authorization: false })
                    }
                } else {
                    res.json({ orderPlaced: false, authorization: false })
                }
            })
        } catch (error) {
            console.log(error);
            res.json({ orderPlaced: false, authorization: false })
        }

    }

    // save the online payment dilavery orders
    static saveOnlinePaymentDilaveryOrders = (req, res) => {
        var User = null;
        try {

            jwt.verify(req.body.token, "shubhakky2533", async (err, user) => {
                User = await UserModel.findOne({ email: user?.email });
                var TotalItems = [];
                if (User) {
                    var buyingProducts = await CartsModel.find({ userAuth: User.email });
                    // count the total ammount of the placed order products
                    var Total = 0;
                    buyingProducts?.map((product) => {
                        Total += product.TotalPrice;
                        TotalItems.push(product)
                    })
                    // save the order details in CaseOnDilaveryCoustomersModel
                    var addedDilavery = null;
                    try {
                        const existUser = await OnlineDilaveryCoustomersModel.findOne({ user: user?.email });
                        // check user is added one card or not
                        if (existUser) {
                            let updated = await OnlineDilaveryCoustomersModel.updateOne({ email: user?.email }, { user: user?.email, $addToSet: { Products: TotalItems }, time: new Date(Date.now()) });
                            if (updated) {
                                buyingProducts.forEach(async (item) => {
                                    await CartsModel.remove({ _id: item._id })
                                })
                                // send response
                                res.json({ orderPlaced: true, authorization: true, addedDilavery: updated })
                            }
                        } else {
                            var addProductDilavery = new OnlineDilaveryCoustomersModel(
                                { user: user?.email, Products: TotalItems, time: new Date(Date.now()) }
                            );
                            let addedDilavery = await addProductDilavery.save();
                            // remove items from card
                            if (addedDilavery) {
                                buyingProducts.forEach(async (item) => {
                                    await CartsModel.remove({ _id: item._id })
                                })
                            }
                            res.json({ orderPlaced: true, authorization: true, addedDilavery: addedDilavery })
                        }
                    }
                    catch (error) {
                        console.log(error);
                        res.json({ orderPlaced: false, authorization: false })
                    }
                } else {
                    res.json({ orderPlaced: false, authorization: false })
                }
            })
        } catch (error) {
            console.log(error);
            res.json({ orderPlaced: false, authorization: false })
        }

    }


    // send the user orders
    static MyOrders = async (req, res) => {
        var User = null;
        try {

            jwt.verify(req.params.token, "shubhakky2533", async (err, user) => {
                console.log(user)
                User = await UserModel.findOne({ email: user?.email });
                var TotalItems = [];
                var totalOrders=[];
                if (User) {
                    console.log(User)
                    var Caseorders = await CaseOnDilaveryCoustomerModel.findOne({ user: user?.email })
                    var onlineOrders=await OnlineDilaveryCoustomersModel.findOne({ user: user?.email })
                    // add orders in total orders
                    if (Caseorders||onlineOrders) {
                        res.status(200).json({ Caseorders: Caseorders,OnlineOrders:onlineOrders, authorization: true })
                    } else {
                        res.status(400).json({ Caseorders: null, authorization: false })
                    }
                }
            })
        } catch (error) {
            console.log(response);
            res.status(401).json({ orders: null, authorization: false })
        }


    }
}


module.exports = PlaceOrderController;