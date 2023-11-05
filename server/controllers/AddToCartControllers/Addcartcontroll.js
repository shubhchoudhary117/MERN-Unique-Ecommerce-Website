
const CartsModel = require("../../db/UsercartInformationTables/UsercartinfoTable.js")
const fs = require('fs')
const jwt = require("jsonwebtoken")
const path = require("path")


class AddtoCartControl {

    static AddCartLayout = (req, res) => {
        res.send("added to cart")
    }


    static UserAddedCartStore = async (req, res) => {
        console.log(req.body)
        // verifying the token 
        var User;
        try{
          
            if(req.body.AuthToken!=null){
                const token =jwt.verify(req.body.AuthToken, "shubhakky2533", (err, user) => {
                    if (err) { console.log(err) } else {
                        User = user;
                    }
                })
            }else{
                res.send({UserIsNotAuthenticate:true});
            }
           
        }catch(error){
            res.send({UserIsNotAuthenticate:true});
            
        }
      
        if (User) {
            // insert user cart data in database 
            let InsertedData = new CartsModel({
                Id: req.body.id,
                ProductName: req.body.productname,
                NetQuantity: req.body.netquantity,
                Size: req.body.size,
                Fabric: req.body.fabric,
                Dilavery: req.body.dilavery,
                ItemPrice: req.body.itemprice,
                LogoPrice: req.body.logoprice,
                TotalPrice: 400,
                UserChoosesImage: req.body.itemimage,
                UplodedImage: req.file.filename,
                UserAuth: User.email,
                Salername:req.body.Salername

            })
            // commit inseted data in mongodb database
            await InsertedData.save().then(() => {
                res.send({CartStored:true,dataSaved:'success'})
            }).catch((err) => {
                console.log(err)
            })
        }
        // end of token available or not condition checking
         else { 
           res.send({UserIsNotAuthenticate:true});

          }
   
    }// end of cart data storing function
    // ------------------------------------------------
}// end of class


module.exports = AddtoCartControl;



