const ModelObj = require("../db/DataBaseTable.js");
const jwt=require("jsonwebtoken");
const { checkout } = require("../routes/AuthRoutes.js");

class Control {
    static Home = (req, res) => {
       res.send("hello app")
    }

    //create user/signeup  user
    static CreateUser = async (req, res, next) => {
        var data = req.body;
        //check the mail is already exist or not
        let CheckMail = await ModelObj.findOne({ Email:data.email });
        if (CheckMail) {
            res.send({ EmailAlreadyExist: true })
        }
        else {
            let InsertObj = new ModelObj({
                Name: data.name,
                Surname: data.surname,
                Email: data.email,
                Password: data.password
            });
            let Result = await InsertObj.save().then(() => {
                res.send({ signeupSuccess: true })
            })
        }
    }//end of create user function

    static LoginUser=async(req,res)=>{
        var LoginUser=req.body;
        //check LoginUser taken email exist or not in signeup table database
        var Matchemail=await ModelObj.findOne({Email:LoginUser.email});
        if(Matchemail){
            //check LoginUser taken password valid or not 
            if(LoginUser.password==Matchemail.Password){

                // generate the json web token
                const  token=jwt.sign({id:Matchemail._id,email:Matchemail.Email},"shubhakky2533",{expiresIn:"60d"});
                // sending response to the frontend
                // user is loged succefull send successfull response
                res.send({UserLogin:true,success:"loged",token:token,LogedUser:LoginUser});
            }else{
                // user password is invalid during loging
                res.send({PasswordInvalid:true})
            }
        }else{
            res.send({EmailInvalid:true})
        }
    }


    // for testing
    static ApiTesting=(req,res)=>{
        console.log(req.body);
        res.send({"success":true})
    }
}//end of controller class

module.exports = Control;