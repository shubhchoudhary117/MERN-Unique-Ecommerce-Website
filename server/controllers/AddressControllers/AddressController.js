const AddressTable = require("../../db/UserAddress/UserAddressDetailstable.js")
const jwt = require("jsonwebtoken")
class AddressControl {

    // post data in database 
    static PostAddress = async (req, res) => {
        // fetch user in database
        let user = await AddressTable.findOne({ PhoneNumber: req.body.mobile });
        // check Phone number is already exist or not
        if (user) {
            res.send({ PhoneNumberAlreadyExist: true })
        }
        else {
            let InsertedObj = new AddressTable({
                Name: req.body.name,
                PhoneNumber: req.body.mobile,
                BuldingName: req.body.buldingName,
                AreaName: req.body.areaName,
                Pincode: req.body.pincode,
                City: req.body.city,
                State: req.body.state
            })
            // commit the change
            await InsertedObj.save().then((response) => {
                const Mobile = req.body.mobile;
                // generate the token for form authorization
                let SECREAT_KEY = "shubhakky253311"
                const token = jwt.sign({ mobile: Mobile }, SECREAT_KEY, { expiresIn: "60d" })
                res.status(200).send({ AddressSaved: true, token: token })
            }).catch((err) => { console.log(err) })

        }
    }
    // end of posting address

    static getAddress = async (req, res) => {
        let AuthPhone = req.AuthorizationPhone;
        let MatchedUserAddress = await AddressTable.findOne({ PhoneNumber: AuthPhone });
        res.send({ UserAddressAuthorization: true, UserStoredAddress: MatchedUserAddress })
    }

    static VerifyToken = (req, res, next) => {
        let SECREAT_KEY = "shubhakky253311";
        let token = req.body.StoredPhoneNumber;

        jwt.verify(token, SECREAT_KEY, (err, user) => {
            if (err) { console.log(err) }
            else {
                console.log(user.mobile)
                req.AuthorizationPhone = user.mobile;
            }
        })
        // end of jwt authentication varifying
        next();
    }

    // end of verify token for sending address
    static AddressTokenVerify = (req, res, next) => {
        let SECREAT_KEY = "shubhakky253311";
        let token = req.body.token;

        jwt.verify(token, SECREAT_KEY, (err, user) => {
            if (err) { console.log(err) }
            else {
                req.AuthorizationPhoneNumber = user.mobile;
            }
        })
        // call the next middleware
        next();
    }
    // end of Addressverify token

    static checkAddressAuthorization = async (req, res) => {
        let Finduser = await AddressTable.findOne({ PhoneNumber: req.AuthorizationPhoneNumber });
        if (Finduser) {
            res.send({ AddressAuthorization: true })
        }
        else {
            res.send({ AddressAuthorization: false })
        }
    }
    // end of checkAddressAuthorization function

    //Updating user Address Function
    static UpdateUserAddress = async (req, res) => {
        console.log(req.body.UserId)
        let Result = await AddressTable.updateOne({ PhoneNumber: req.body.UserId }, {
            Name: req.body.UpdateData.name,
            PhoneNumber: req.body.UpdateData.mobile,
            BuldingName: req.body.UpdateData.buldingName,
            AreaName: req.body.UpdateData.areaName,
            Pincode: req.body.UpdateData.pincode,
            City: req.body.UpdateData.city,
            State: req.body.UpdateData.state
        }).then(()=>{
            // generate the token for form authorization
            let SECREAT_KEY = "shubhakky253311"
            const Updatetoken = jwt.sign({ mobile:req.body.UpdateData.mobile }, SECREAT_KEY, { expiresIn: "60d" })
            res.send({AddressUpdated:true,Updatedtoken:Updatetoken})
        })
        .catch((err)=>{
            console.log(err)
        })
        
     
       
    }



}

module.exports = AddressControl;