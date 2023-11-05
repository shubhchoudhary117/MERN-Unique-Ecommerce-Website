const jwt=require("jsonwebtoken");
const TableObj=require("../../db/DataBaseTable.js");
const { trace } = require("../../routes/AuthRoutes");

class AuthenticatControllers{

    static VerifyToken=(req,res,next)=>{

        if(req.body.token){
            let UserProvidedToken=req.body.token;
            let verifyToken=jwt.verify(UserProvidedToken,"shubhakky2533",(err,user)=>{
                if(err){console.log(err)}
                else{
                    req.id=user.id;
                }
            })//end of verify token function 
            next()
        }else{
            res.send({Authorized:false,Login:false})
        }

    }//end of verifyToken function 

    static getUser=async(req,res)=>{
        let user=await TableObj.findOne({_id:req.id});
        if(user){
            res.send({Authorized:true,Login:true})
        }
        else{
            res.send({Authorized:false,Login:false})
        }
        

    }

};


module.exports=AuthenticatControllers;