import { Link } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import AddressForm from "./addressComponent/Addresscomponent";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import AddressBox from "./addressComponent/AddressBox.jsx";

var MyHeaders=new Headers({
    "Content-Type":"application/json"
})

const AddressPageLayout = () => {
    const [userAuthenticated,setuserAuthenticated]=useState(false)
    // define route methods
    const navigate=useNavigate();
    // checking functionality user is already fill address or not 
    const checkAddressAuthorization=()=>{
        let Token=localStorage.getItem("AddressToken")
        let URL="http://localhost:8000/buy/addressauth";
        axios.post(URL,{token:Token},MyHeaders).then((res)=>{
            let Response=res.data;
            if(Response.AddressAuthorization){
                setuserAuthenticated(true);
            }else{
                setuserAuthenticated(false)
            }
        })
    }
    useEffect(()=>{
        checkAddressAuthorization()
    })


    // styling object for all field is empty error message
    return <>
      
        {
            userAuthenticated?<AddressBox/>:<AddressForm/>
        }
        
    </>
}

export default AddressPageLayout;