const CartsTable = require("../../../db/UsercartInformationTables/UsercartinfoTable.js")
const jwt = require("jsonwebtoken");
var User;
class CartControl {

    static SendData = async (req, res,next) => {
        try{
            const token = jwt.verify(req.body.AuthToken, "shubhakky2533", (err, user) => {
                if (err) { console.log(err) }
                else {
                    User = user;
                }
            })

            const Alldata = await CartsTable.find({ UserAuth: User.email })
            res.send(Alldata)

        }catch(error){
            res.send(null)
            console.log(error)
        }
       
        next();
    }
    // end of data sendign

    // delete the shoping cart
    static DeleteCart = async (req, res) => {
        let deletedCartId = req.params;
        await CartsTable.deleteOne({ __id: deletedCartId }).then((response) => {
            res.send({ deleted: true })
        }).catch((err) => {
            console.log(err)
        })
    }
    // end of delete cart function


    // verifyting the user token
    static TokenVerify=(req,res,next)=>{

        if(req.body.AuthToken!=null){
            
                jwt.verify(req.body.AuthToken,'shubhakky2533',(err,user)=>{
                    if(err){console.log(err);}
                    else{
                        req.user=user;
                        req.authenticate=true; 
                    }
                })
                next();
            
        }
        // calling the next middleware
    }

    // get Total Number Of Carts
    static CartCount=async(req,res)=>{
        let Total=0;
        if(req.user){
            let TotalCarts=await CartsTable.count({UserAuth:req.user.email});
            let Items=await CartsTable.find();
                Items.forEach(current => {
                    Total+=current.TotalPrice;
               });
            res.send({TotalCarts:TotalCarts,TotalAmmount:Total,UserisAuthenticate:req.authenticate})
        }else{
            res.send({TotalCarts:TotalCarts,TotalAmmount:Total,UserisAuthenticate:req.authenticate})
        }
       
    }
}

module.exports = CartControl;