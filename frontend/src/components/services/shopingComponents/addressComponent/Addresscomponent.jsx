
import { Link } from "@mui/material";
import { useState } from "react";
import "../../../../css/AddressFormStylesheet.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const DefaultObj = {
    name: "",
    mobile: "",
    buldingName: "",
    areaName: "",
    pincode: "",
    city: "",
    state: ""

}

var myHeaders = new Headers({
    'Content-Type': 'application/json',

});

const AddressForm = () => {

    // routing method 
    const navigate=useNavigate()
    // create state for content user address temporaly
    const [AddressData, setAddressData] = useState(DefaultObj);
    // create state for fields is empty error message
    const [AllFieldsemptyError, setAllFieldsemptyError] = useState(false);
    // creare state for particular field 
    const [NameFieldEmptyerror, setNameFieldEmptyerror] = useState(false);
    const [PhoneFieldEmptyerror, setPhoneFieldEmptyerror] = useState(false);
    const [BuldingNameFieldEmptyerror, setBuldingNameFieldEmptyerror] = useState(false);
    const [AreaFieldEmptyerror, setAreaFieldEmptyerror] = useState(false);
    const [PincodFieldEmptyerror, setPincodFieldEmptyerror] = useState(false);
    const [CityFieldEmptyerror, setCityFieldEmptyerror] = useState(false)
    const [StateFieldEmptyerror, setStateFieldEmptyerror] = useState(false);

    //   states for some informatin is not repeat
    const [PhoneNumberExist, setPhonNumberExist] = useState(false)



    // create user address data object
    const CreateAddressDataObj = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setAddressData({ ...AddressData, [key]: value })
    }



    // post user address data in database 
    const PostAddress = (e) => {
        // checking all field is empty or not
        if (AddressData.name && AddressData.mobile && AddressData.buldingName && AddressData.areaName && AddressData.pincode && AddressData.city && AddressData.state) {
            setAllFieldsemptyError(false);
            // post data in backend using axios 
            let URL = "http://localhost:8000/buy/address";
            axios.post(URL, AddressData, myHeaders).then((res) => {
                const Response = res.data;
                if (Response.PhoneNumberAlreadyExist) { setPhonNumberExist(true) }
                else {
                    setPhonNumberExist(false);
                    setAddressData(DefaultObj);
                }
                // all information is done then store jwt token
                if (Response.AddressSaved) {
                    localStorage.setItem("AddressToken", Response.token);
                    navigate("/address")
                }
                // assigne the token to the user 

            })

        }
        else {
            if (!AddressData.name && !AddressData.mobile && !AddressData.buldingName && !AddressData.areaName && !AddressData.pincode && !AddressData.city && !AddressData.state) {
                setNameFieldEmptyerror(true)
                setPhoneFieldEmptyerror(true);
                setBuldingNameFieldEmptyerror(true);
                setAreaFieldEmptyerror(true);
                setPincodFieldEmptyerror(true);
                setCityFieldEmptyerror(true);
                setStateFieldEmptyerror(true);
            }
            else {
                setAllFieldsemptyError(false)
                if (!AddressData.name) { setNameFieldEmptyerror(true); } else { setNameFieldEmptyerror(false); }
                if (!AddressData.mobile) { setPhoneFieldEmptyerror(true); } else { setPhoneFieldEmptyerror(false); }
                if (!AddressData.buldingName) { setBuldingNameFieldEmptyerror(true); } else { setBuldingNameFieldEmptyerror(false); }
                if (!AddressData.areaName) { setAreaFieldEmptyerror(true); } else { setAreaFieldEmptyerror(false); }
                if (!AddressData.pincode) { setPincodFieldEmptyerror(true); } else { setPincodFieldEmptyerror(false); }
                if (!AddressData.city) { setCityFieldEmptyerror(true); } else { setCityFieldEmptyerror(false); }
                if (!AddressData.state) { setStateFieldEmptyerror(true); } else { setStateFieldEmptyerror(false); }
            }

        }
    }
    // styling object for all field is empty error message
    return <>

        <main>
            <div className="AddressSection">
                
                <div className="FormContainer">
                    <div className="form">
                        {/* contact details fields */}
                        <div className="contactDetail">
                            <a href="#"><i class="uil uil-phone-alt"></i>contact details</a>
                            <div className="form-group">
                                <div className="input-field">
                                    <input type="text" className="field" name="name" onChange={CreateAddressDataObj} id="name" required style={{ borderBottom: NameFieldEmptyerror ? "1px solid  rgb(225, 25, 0)" : "1px solid rgb(233 233 233" }} />
                                    <label htmlFor="name" value={AddressData.name} style={{ color: NameFieldEmptyerror ? "rgb(225 25 0)" : "#0b9d8a" }}>name</label>
                                </div>
                                {NameFieldEmptyerror ? <p>Name cannot be empty and has to be english characters</p> : ""}
                            </div>
                            <div className="form-group">
                                <div className="input-field">
                                    <input type="number" value={AddressData.mobile} className="field" name="mobile" onChange={CreateAddressDataObj} id="mobile" required style={{ borderBottom: PhoneFieldEmptyerror || PhoneNumberExist ? "1px solid  rgb(225, 25, 0)" : "1px solid rgb(233 233 233" }} />
                                    <label htmlFor="mobile" style={{ color: PhoneFieldEmptyerror || PhoneNumberExist ? "rgb(225 25 0)" : "#0b9d8a" }}>phone number</label>
                                </div>
                                {PhoneFieldEmptyerror ? <p>please enter valid phone number</p> : ""}
                                {PhoneNumberExist ? <p>Phone Number is already register</p> : " "}
                            </div>
                        </div>
                        {/* end of contact detail div */}


                        {/* Address details fields------------------------- */}
                        <div className="addressDetail">
                            <a href="#"><i class="uil uil-location-point"></i>Address</a>
                            <div className="form-group">
                                <div className="input-field">
                                    <input type="text" value={AddressData.buldingName} className="field" name="buldingName" onChange={CreateAddressDataObj} id="buldingNo" required style={{ borderBottom: BuldingNameFieldEmptyerror ? "1px solid  rgb(225, 25, 0)" : "1px solid rgb(233 233 233" }} />
                                    <label htmlFor="buldingNo" style={{ color: BuldingNameFieldEmptyerror ? "rgb(225 25 0)" : "#0b9d8a" }} >house no/bulding name</label>
                                </div>
                                {BuldingNameFieldEmptyerror ? <p>please enter valid address detail</p> : ""}
                            </div>
                            <div className="form-group">
                                <div className="input-field">
                                    <input type="text" value={AddressData.areaName} className="field" name="areaName" onChange={CreateAddressDataObj} id="areaName" required style={{ borderBottom: AreaFieldEmptyerror ? "1px solid  rgb(225, 25, 0)" : "1px solid rgb(233 233 233" }} />
                                    <label htmlFor="areaName" style={{ color: AreaFieldEmptyerror ? "rgb(225 25 0)" : "#0b9d8a" }}>Rode Name/area/colony</label>
                                </div>
                                {AreaFieldEmptyerror ? <p>please enter valid address detail</p> : ""}
                            </div>
                            <div className="form-group">
                                <div className="input-field">
                                    <input type="number" value={AddressData.pincode} className="field" name="pincode" onChange={CreateAddressDataObj} id="pincode" required style={{ borderBottom: PincodFieldEmptyerror ? "1px solid  rgb(225, 25, 0)" : "1px solid rgb(233 233 233" }} />
                                    <label htmlFor="pincode" style={{ color: PincodFieldEmptyerror ? "rgb(225 25 0)" : "#0b9d8a" }}>pincode</label>
                                </div>
                                {PincodFieldEmptyerror ? <p>please enter  6 digit pincode</p> : ""}
                            </div>
                            <div className="citystate">
                                <div className="form-group">
                                    <div className="input-field">
                                        <input type="text" value={AddressData.city} className="field" name="city" onChange={CreateAddressDataObj} id="city" required style={{ borderBottom: CityFieldEmptyerror ? "1px solid  rgb(225, 25, 0)" : "1px solid rgb(233 233 233" }} />
                                        <label htmlFor="city" style={{ color: CityFieldEmptyerror ? "rgb(225 25 0)" : "#0b9d8a" }}>city</label>
                                    </div>
                                    {CityFieldEmptyerror ? <p>please enter valid city</p> : ""}
                                </div>
                                <div className="form-group">
                                    <div className="input-field">
                                        <input type="text" value={AddressData.state} className="field" name="state" onChange={CreateAddressDataObj} id="state" required style={{ borderBottom: StateFieldEmptyerror ? "1px solid  rgb(225, 25, 0)" : "1px solid rgb(233 233 233" }} />
                                        <label htmlFor="state" style={{ color: StateFieldEmptyerror ? "rgb(225 25 0)" : "#0b9d8a" }}>state</label>
                                    </div>
                                    {StateFieldEmptyerror ? <p>please enter valid state</p> : ""}
                                </div>
                            </div>
                        </div>
                        {/* end of Address detail div ---------------------*/}

                        <div className="button">
                            <button name="save" id="savebtn" onClick={PostAddress}><Link to="#" className="link">save address & continue</Link></button>
                        </div>

                    </div>
                </div>
            </div>
        </main>

    </>
}

export default AddressForm;
