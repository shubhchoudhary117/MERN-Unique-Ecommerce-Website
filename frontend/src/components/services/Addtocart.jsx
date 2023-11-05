import "../../css/addtoCartStylesheet.css"
import axios from "axios"
import { Link } from "@mui/material";
import { useEffect, useState } from "react";
import CartLayout from "./cartComponent/UserCart";
import { useNavigate } from "react-router-dom";
import NoCartsAdded from "../MessagesComponents/Nocartsadded"
import CartsLayout from "./Addedcarts";
import { useDispatch } from "react-redux";



// set headers 
var myHeaders = new Headers({
    'Content-Type': 'application/json',

});
const AddTOCart = () => {
    const navigate = useNavigate()
    const [TotalCartsAmmount, setTotalCartsAmmount] = useState("0")
    const [data, setData] = useState([])
    
    // check user is autheticate or not 
    const CheckAuthorization = () => {
        //get user provided Authentication json web token in local storage
        const ProvidedToken = localStorage.getItem("logedUserToken")
        // post request to check user is authenticate or not 
        let URL = "http://localhost:8000/addcart/authenticate";
        axios.post(URL, { token: ProvidedToken }, myHeaders).then((Res) => {
            const Response = Res.data;
            //cehck user is authorized or not if user is authorized redirect 
            //the user in cart cart page else redirecting the user login page 
            if (Response.Authorized) {
                navigate("/cart")
            }
            else {
                navigate("/login")
            }
        })
    }
    //end of Authorization checking function 

    const GetData = () => {
        //data get on this api
        const token = localStorage.getItem("logedUserToken")
        let URL = "http://localhost:8000/addcart/cart";
        axios.post(URL,{AuthToken:token},myHeaders).then((res) => {
            setData(res.data)
        })
    }
    // end of get data function 

    //useEffect method are used
    useEffect(() => {
        CheckAuthorization();
        GetData();

    },[])
    // the given parameter [] is call the useEffect function only once time during page reloding
    return <>
        {/* header code */}
        

        {/* check for any product is cart or not if no any product is cart show cart empty message
          else showing carted product  */}

        {
            data.length ? <CartsLayout cartsData={data} />
                :
                <NoCartsAdded />
            
        }

    </>
}
export default AddTOCart;