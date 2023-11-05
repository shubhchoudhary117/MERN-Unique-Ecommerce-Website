import { useNavigate, Link } from "react-router-dom"
import "../../css/signeUp.css"
import { useState } from "react"
import axios from "axios"
const defaultObj = {
    name: "",
    surname: "",
    email: "",
    password: "",
    cpassword: ""
}
var myHeaders = new Headers({
    'Content-Type': 'application/json'
});

const SigneLayout = () => {
    const navigate = useNavigate()
    const [ConformPasswordError,setConformPasswordError]=useState(false);
    const [emailExistError, SetEmailExistError] = useState(false);
    const [emptyFieldsErrorMssg, setemptyFieldsErrorMssg] = useState(false);
    const [data, setData] = useState(defaultObj);

    // hooks for any field empty error throwing
    const [nameFieldEmpty,setnameFieldEmpty]=useState(false);
    const [surnameFieldEmpty,setsurnameFieldEmpty]=useState(false);
    const [emailFieldEmpty,setemailFieldEmpty]=useState(false);
    const [passwordFieldEmpty,setpasswordFieldEmpty]=useState(false);
    const [cpasswordFieldEmpty,setcpasswordFieldEmpty]=useState(false);

    // post data in database 
    const PostData = (e) => {
        e.preventDefault();
        if (data.name && data.surname && data.password && data.email && data.cpassword) {
            if (data.password === data.cpassword) {
                //Backend api url
                let URL = "http://localhost:8000/signeup"
                //send data in backend
                axios.post(URL, data, { myHeaders }).then((res) => {

                    //response from the backend server after inserting new data 
                    let Response = res.data;

                    //email already exist or not checking and throw the error
                    if (Response.EmailAlreadyExist) {
                        SetEmailExistError(true)
                        setConformPasswordError(false)
                        setData(data);
                    }
                    if (Response.signeupSuccess) {
                        SetEmailExistError(false)
                        setConformPasswordError(false)
                        setData(defaultObj);
                        navigate("/login")
                    }
                    //end of signeupsuccess checking
                })
            }
            else {
                setConformPasswordError(true)
            }
            //end of password or conform password matching if condition 
        }//end of all field checking empty or not
        else {
            if (!data.name && !data.surname && !data.password && !data.email && !data.cpassword) {
                setemptyFieldsErrorMssg(true)
            }
            else{
                setemptyFieldsErrorMssg(false)
                if(!data.name){setnameFieldEmpty(true)}else{setnameFieldEmpty(false)}
                if(!data.surname){setsurnameFieldEmpty(true)}else{setsurnameFieldEmpty(false)}
                if(!data.email){setemailFieldEmpty(true)}else{setemailFieldEmpty(false)}
                if(!data.password){setpasswordFieldEmpty(true)}else{setpasswordFieldEmpty(false)}
                if(!data.cpassword){setcpasswordFieldEmpty(true)}else{setcpasswordFieldEmpty(false)}
            
            }
        }

    }//end of Data Posting function


    //get user data from input fields and store the data in state
    const createObj = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setData({ ...data, [key]: value })
    }

    return <>
        <div className="SigneupBody">
            <div className="container">
                <div className="signeUpBox">
                    <span className="title">Signeup</span>
                    <form action="#">
                        <div className="form-group" >
                            <div className="form-field">
                                <input type="text" name="name" value={data.name} placeholder="enter your name" onChange={createObj} required    style={{borderBottom:emptyFieldsErrorMssg||nameFieldEmpty?"1px solid #e11900":"1px solid #ccc"}}/>
                                <i className="uil uil-user"></i>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-field">
                                <input type="text" name="surname" value={data.surname} placeholder="enter your surname" onChange={createObj} required  style={{borderBottom:emptyFieldsErrorMssg||surnameFieldEmpty?"1px solid #e11900":"1px solid #ccc"}}/>
                                <i className="uil uil-user"></i>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-field">
                                <input type="email" name="email" value={data.email} placeholder="enter your email" onChange={createObj} required  style={{borderBottom:emptyFieldsErrorMssg||emailFieldEmpty?"1px solid #e11900":"1px solid #ccc"}} />
                                <i className="uil uil-envelope-alt"></i>
                             {emailExistError? <p id="emailErrorMssg">email is already exist</p>:" "} 
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-field">
                                <input type="password" name="password" value={data.password} placeholder="create password" onChange={createObj} required style={{borderBottom:emptyFieldsErrorMssg||passwordFieldEmpty?"1px solid #e11900":"1px solid #ccc"}} />
                                <i className="uil uil-lock"></i>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-field">
                                <input type="password" name="cpassword" value={data.cpassword} placeholder="conform password" onChange={createObj} required  style={{borderBottom:emptyFieldsErrorMssg||cpasswordFieldEmpty||ConformPasswordError?"1px solid #e11900":"1px solid #ccc"}}/>
                                <i className="uil uil-lock"></i>
                            </div>
                        </div>

                        <div className="button">
                            <button className="signeup-btn" onClick={PostData}>signeup</button>
                        </div>

                    </form>

                    <div className="message">
                        do you have an account ? <Link to="/login" id="signeupLink">login</Link>
                    </div>

                    {/* <div className="error-message">
                        <p className="message-title">{ConformPassworderror ? "please conform the password" : " "}{emailExistError ? "email is already exist" : " "}</p>
                    </div> */}



                </div>
            </div>
        </div>
        {/* end of signeup body */}

    </>
}

export default SigneLayout;