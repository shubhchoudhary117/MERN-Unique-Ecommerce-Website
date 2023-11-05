import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import "../../css/LoginLayout.css"
import { changeUserLogin } from "../../states/Authentication/LoginAuth"
import FadeLoader from "react-spinners/FadeLoader"
const DefaulObj = {
    email: "",
    password: ""
}
var myHeaders = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
});
const LoginLayout = () => {
    // Redux state modify methods
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const [showPassword,setShowPassword]=useState(false);
    const [data, sedData] = useState(DefaulObj);
    const [emptyField, setEmptyField] = useState(false);
    const [EmailInvalidError, setEmailInvalidError] = useState(false);
    const [PasswordIvalidError, setPasswordInvalidError] = useState(false);
    const [Loginsuccess, settLoginSuccess] = useState(false);
    const [emailfieldIsEmpty, setEmailEmptyError] = useState(false);
    const [loginProcess,setLoginProcess]=useState(false);
    const [passwordfieldIsEmpty, setPasswordEmptyError] = useState(false);




    const PostLoginData = (e) => {
        e.preventDefault();
        setLoginProcess(true)
        const URL = "http://localhost:8000/login";
        //check all field fill or not
        if (data.email && data.password) {
            setEmailEmptyError(false);
            setPasswordEmptyError(false);
            setEmptyField(false);
            axios.post(URL, data, { myHeaders }).then((res) => {
                let Response = res.data;

                if (Response.UserLogin) {
                    localStorage.setItem("logedUserToken",Response.token)
                    dispatch(changeUserLogin(true))
                    setLoginProcess(false)
                    navigate("/")
                }

                if (Response.EmailInvalid) {
                    setEmailInvalidError(true)
                    setLoginProcess(false)
                }
                else{
                    setEmailInvalidError(false)
                    setLoginProcess(false)
                }

                if (Response.PasswordInvalid) {
                    setPasswordInvalidError(true)
                }
                else{
                    setPasswordInvalidError(false)
                    setLoginProcess(false)
                }
            })//end of then function
        }
        else {
            if (!data.email && !data.password) {
                setEmptyField(true)
            }
            else {
                setEmptyField(false);
                if (!data.email) {
                    setEmailEmptyError(true)
                }
                else {
                    setEmailEmptyError(false)
                }

                if (!data.password) {
                    setPasswordEmptyError(true)
                }
                else {
                    setPasswordEmptyError(false)
                }
            }

        }
    }

    // show password functionality
    const PasswordHideShow=(e)=>{
        const passField=document.getElementById("passwordField");
        const eye=document.getElementById("closeeyeIcon");
        if(passField.type=='text'){
            passField.type="password";
            setShowPassword(false)
            
            // change icocn
           eye.innerHTML='<i className="uil uil-eye-slash showHidePw"></i>'
        }
        else if(passField.type=="password"){
            passField.type="text"
            setShowPassword(true);
            // chang the icon
            eye.innerHTML='<i className="uil uil-eye"></i>'
          
        }

    }


    //create user information object
    const CreateObj = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        sedData({ ...data, [key]: value })
    }



    return <>
        <div className="LoginBody">
            <div class="container">
                <div class="forms">
                    <div class="form login">
                        <span class="title">Login</span>
                        <form action="#">
                            <div className="form-group">
                                <div className="input-field">
                                    <input type="text" name="email" onChange={CreateObj} placeholder="Enter your email" required />
                                    <i className="uil uil-envelope icon"></i>
                                </div>
                                {EmailInvalidError ? <p id="errorMssg">invalid email please enter valid email</p> : " "}
                                {emptyField ? <p id="EmptyFiledErrorMssg">please enter your email</p> : " "}
                                {emailfieldIsEmpty ? <p id="emailFieldEmptyError">plese enter your email</p> : " "}
                            </div>


                            <div className="form-group">
                                <div className="input-field">
                                    <input type="password" name="password" id="passwordField" onChange={CreateObj} className="password" placeholder="Enter your password" required />
                                    <i className="uil uil-lock icon"></i>
                                    <i className={showPassword?"uil uil-eye":"uil uil-eye-slash showHidePw"} onClick={PasswordHideShow} id="closeeyeIcon"></i>
                                    
                                  
                                </div>
                                {PasswordIvalidError ? <p id="errorMssg">invalid password please enter currect password</p> : " "}
                                {emptyField ? <p id="EmptyFiledErrorMssg">please enter your password</p> : " "}
                                {passwordfieldIsEmpty ? <p  id="passwordFieldEmptyError">plese enter your password</p> : " "}
                            </div>

                            <div class="checkbox-text">
                                <div class="checkbox-content">
                                    <input type="checkbox" id="logCheck" />
                                    <label for="logCheck" class="text">Remember me</label>
                                </div>

                                {/* <a href="#" class="text">Forgot password?</a> */}
                            </div>
                            {/* 
                            <div className="error-message">
                                <p>{EmailInvalidError ? "check email email is invalid check" : " "}{PasswordIvalidError ? "password is invalid" : " "}</p>
                            </div> */}

                            <div class="input-field button">
                                <button  onClick={PostLoginData}>login</button>
                            </div>
                        </form>

                        <div class="login-signup">
                            <span class="text">Not a member?
                                <Link to="/signeup" id="loginLink">signeup</Link>
                            </span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        {/* end  of login body */}

    </>
}

export default LoginLayout;