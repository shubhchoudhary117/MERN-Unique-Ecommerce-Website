import "../../../../css/AddressBoxStylesheet.css"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios"
import { useState } from "react";

// set headers 
var myHeaders = new Headers({
    'Content-Type': 'application/json',

});
const DefaultObj = {
    name: "",
    mobile: "",
    buldingName: "",
    areaName: "",
    pincode: "",
    city: "",
    state: ""

}

const AddressBox = () => {
    const navigate = useNavigate()
    const [AddressData, setAddressData] = useState([])
    // get user address from backend
    const getAddress = async () => {

        let UserStoredPhone = localStorage.getItem("AddressToken");
        let URL = "http://localhost:8000/buy/dilevar/address";

        // get user address
        await axios.post(URL, { StoredPhoneNumber: UserStoredPhone }, myHeaders).then((res) => {
            let Response = res.data;
            if (Response.UserAddressAuthorization) {
                setAddressData(Response.UserStoredAddress);
            }

        })
    }

    useEffect(() => {
        getAddress()
    }, [])
    // end of getting user address information
    // start the address editing functionality----------------------------------------------
    const [UpdatingdData, setUpdatingdData] = useState(DefaultObj)
    const [EditingOn, setEditingOn] = useState(false)
    // --------------------------------------------------------------------------------------
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
    const [UpdatinguserId, setUpdatingUserId] = useState(0)



    // create user address data object
    const CreateAddressDataObj = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setUpdatingdData({ ...UpdatingdData, [key]: value })
    }



    // post user address data in database 
    const UpdateAddress = (e) => {
        // checking all field is empty or not
        if (UpdatingdData.name && UpdatingdData.mobile && UpdatingdData.buldingName && UpdatingdData.areaName && UpdatingdData.pincode && UpdatingdData.city && UpdatingdData.state) {
            setAllFieldsemptyError(false);
            console.log(UpdatingdData)
            // post data in backend using axios 
            let URL = "http://localhost:8000/buy/updateaddress";
            axios.post(URL, {UpdateData:UpdatingdData,UserId:UpdatinguserId}, myHeaders).then((res) => {
                const Response = res.data;
                if(Response.AddressUpdated){
                    localStorage.setItem("AddressToken",Response.Updatedtoken)
                    window.location.reload();
                }
               

            })

        }
        else {
            console.log("error")
            if (!UpdatingdData.name && !UpdatingdData.mobile && !UpdatingdData.buldingName && !UpdatingdData.areaName && !UpdatingdData.pincode && !UpdatingdData.city && !UpdatingdData.state) {
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
                if (!UpdatingdData.name) { setNameFieldEmptyerror(true); } else { setNameFieldEmptyerror(false); }
                if (!UpdatingdData.mobile) { setPhoneFieldEmptyerror(true); } else { setPhoneFieldEmptyerror(false); }
                if (!UpdatingdData.buldingName) { setBuldingNameFieldEmptyerror(true); } else { setBuldingNameFieldEmptyerror(false); }
                if (!UpdatingdData.areaName) { setAreaFieldEmptyerror(true); } else { setAreaFieldEmptyerror(false); }
                if (!UpdatingdData.pincode) { setPincodFieldEmptyerror(true); } else { setPincodFieldEmptyerror(false); }
                if (!UpdatingdData.city) { setCityFieldEmptyerror(true); } else { setCityFieldEmptyerror(false); }
                if (!UpdatingdData.state) { setStateFieldEmptyerror(true); } else { setStateFieldEmptyerror(false); }
            }

        }
    }
    // user editing option
    const editeUser = (mobile) => {
        document.getElementById('name').value = AddressData.Name;
        setEditingOn(true);
        setUpdatingUserId(mobile);
    }
    return <>
        {/* <header className="AddressBoxHeader">
            <h3>shubh<span>shop</span></h3>
        </header> */}
        <main>
            <section className="AddressSection">
                <div className="AddressContainer">
                    <div className="AddressBox">
                        <div className="options">
                            <div className="left">select the dilavery option</div>
                            <div className="right"><h5 className="editButton" onClick={() => { editeUser(AddressData.PhoneNumber) }}>edit</h5></div>
                        </div>
                        {/* --------------------------------------- */}
                        <div className="AddressCard">
                            <div className="header">
                                <div className="UserName">{AddressData.Name}</div>
                                <div className="RadioButton">
                                    <div className="point"></div>
                                </div>
                            </div>
                            <div className="details">
                                <p>city : {AddressData.City}</p>
                                <p>{AddressData.AreaName}</p>
                                <p>{AddressData.State}</p>
                                <p>+91 {AddressData.PhoneNumber}</p>
                            </div>
                            <div className="button">
                                <Link to="/payment" id="continueButton">Dilever to this address</Link>
                            </div>
                        </div>
                        {/* ------------------------------------------- */}
                    </div>
                </div>
                {/* end of address box container */}
                {/* start the editing address form Layout */}

                <div className="EditingBox" id={EditingOn ? "activeUpdateForm" : "noneactiveUpdateForm"}>
                    <div className="FormContainer">
                        <div className="form">
                            <span className="closeForm" onClick={() => { setEditingOn(false) }}><i className="uil uil-times"></i></span>
                            {/* contact details fields */}
                            <div className="contactDetail">
                                <a href="#"><i class="uil uil-phone-alt"></i>contact details</a>
                                <div className="form-group">
                                    <div className="input-field">
                                        <input type="text" value={UpdatingdData.name} className="field" name="name" onChange={CreateAddressDataObj} id="name" required style={{ borderBottom: NameFieldEmptyerror ? "1px solid  rgb(225, 25, 0)" : "1px solid rgb(233 233 233" }} />
                                        <label htmlFor="name" style={{ color: NameFieldEmptyerror ? "rgb(225 25 0)" : "#0b9d8a" }}>name</label>
                                    </div>
                                    {NameFieldEmptyerror ? <p>Name cannot be empty and has to be english characters</p> : ""}
                                </div>
                                <div className="form-group">
                                    <div className="input-field">
                                        <input type="number" value={UpdatingdData.mobile} className="field" name="mobile" onChange={CreateAddressDataObj} id="mobile" required style={{ borderBottom: PhoneFieldEmptyerror || PhoneNumberExist ? "1px solid  rgb(225, 25, 0)" : "1px solid rgb(233 233 233" }} />
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
                                        <input type="text" value={UpdatingdData.buldingName} className="field" name="buldingName" onChange={CreateAddressDataObj} id="buldingNo" required style={{ borderBottom: BuldingNameFieldEmptyerror ? "1px solid  rgb(225, 25, 0)" : "1px solid rgb(233 233 233" }} />
                                        <label htmlFor="buldingNo" style={{ color: BuldingNameFieldEmptyerror ? "rgb(225 25 0)" : "#0b9d8a" }} >house no/bulding name</label>
                                    </div>
                                    {BuldingNameFieldEmptyerror ? <p>please enter valid address detail</p> : ""}
                                </div>
                                <div className="form-group">
                                    <div className="input-field">
                                        <input type="text" value={UpdatingdData.areaName} className="field" name="areaName" onChange={CreateAddressDataObj} id="areaName" required style={{ borderBottom: AreaFieldEmptyerror ? "1px solid  rgb(225, 25, 0)" : "1px solid rgb(233 233 233" }} />
                                        <label htmlFor="areaName" style={{ color: AreaFieldEmptyerror ? "rgb(225 25 0)" : "#0b9d8a" }}>Rode Name/area/colony</label>
                                    </div>
                                    {AreaFieldEmptyerror ? <p>please enter valid address detail</p> : ""}
                                </div>
                                <div className="form-group">
                                    <div className="input-field">
                                        <input type="number" value={UpdatingdData.pincode} className="field" name="pincode" onChange={CreateAddressDataObj} id="pincode" required style={{ borderBottom: PincodFieldEmptyerror ? "1px solid  rgb(225, 25, 0)" : "1px solid rgb(233 233 233" }} />
                                        <label htmlFor="pincode" style={{ color: PincodFieldEmptyerror ? "rgb(225 25 0)" : "#0b9d8a" }}>pincode</label>
                                    </div>
                                    {PincodFieldEmptyerror ? <p>please enter  6 digit pincode</p> : ""}
                                </div>
                                <div className="citystate">
                                    <div className="form-group">
                                        <div className="input-field">
                                            <input type="text" value={UpdatingdData.city} className="field" name="city" onChange={CreateAddressDataObj} id="city" required style={{ borderBottom: CityFieldEmptyerror ? "1px solid  rgb(225, 25, 0)" : "1px solid rgb(233 233 233" }} />
                                            <label htmlFor="city" style={{ color: CityFieldEmptyerror ? "rgb(225 25 0)" : "#0b9d8a" }}>city</label>
                                        </div>
                                        {CityFieldEmptyerror ? <p>please enter valid city</p> : ""}
                                    </div>
                                    <div className="form-group">
                                        <div className="input-field">
                                            <input type="text" value={UpdatingdData.state} className="field" name="state" onChange={CreateAddressDataObj} id="state" required style={{ borderBottom: StateFieldEmptyerror ? "1px solid  rgb(225, 25, 0)" : "1px solid rgb(233 233 233" }} />
                                            <label htmlFor="state" style={{ color: StateFieldEmptyerror ? "rgb(225 25 0)" : "#0b9d8a" }}>state</label>
                                        </div>
                                        {StateFieldEmptyerror ? <p>please enter valid state</p> : ""}
                                    </div>
                                </div>
                            </div>
                            {/* end of Address detail div ---------------------*/}

                            <div className="button">
                                <button name="save" id="savebtn" onClick={UpdateAddress}><Link to="#" className="link">update address & continue</Link></button>
                            </div>

                        </div>
                    </div>
                </div>
                {/* end of the editing form layout -------------------------------- */}
            </section>
        </main>


    </>
}

export default AddressBox;