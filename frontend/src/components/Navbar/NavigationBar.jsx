import axios from 'axios';
import "./NavigationBar.css"
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { changeTotalCartedProductPrice, changeTotalNumberOfCarts } from "../../states/TotalCartedProductPrice/CartedProductsPrice.js";
import { Link } from 'react-router-dom';
// set headers 
var myHeaders = new Headers({
    'Content-Type': 'application/json',
});
const NavigationBar = () => {
      // create an hook
      const dispatch=useDispatch();
      const [UserisAuthenticate,setUserisAuthenticate]=useState(false);

    const TotalNumberOfCarts = useSelector((state) => state.CartedItemPrice.TotalNumberOfCarts);

      // get Total Number Of carts
      const getTotalNumberOfCarts = () => {
        let URL = "http://localhost:8000/addcart/totalcarts";
        let Token = localStorage.getItem("logedUserToken")
        axios.post(URL, { AuthToken: Token }, myHeaders).then((res) => {
            console.log(res)
            let Response = res.data;
            console.log("is authenticate"+Response.UserisAuthenticate);
            setUserisAuthenticate(Response.UserisAuthenticate);
            dispatch(changeTotalNumberOfCarts(Response.TotalCarts));
            dispatch(changeTotalCartedProductPrice(Response.TotalAmmount))
        })
    }
    // end of geting total number of carts api calling api

    // UseEffect for getting TotalNumber of carts
    useEffect(() => {
        getTotalNumberOfCarts()
    }, [])

 // Logout the user 
 const LogoutUser = () => {
    localStorage.removeItem("logedUserToken");
    window.location.href="http://localhost:3000/";

}

  return <>
  
  <header>
                <nav>
                    <div className="logo">
                        <span id="bars"><i className="uil uil-bars" ></i> </span>shubh<span>Shop</span>
                    </div>
                    <div className="menus">

                        <ul>
                           
                            <li><Link to="/" id="link">Home</Link></li>
                            <li><Link to="/cart" id="link">cart</Link></li>
                            <li><Link to="/shubhshop/my-orders" id="link">orders</Link></li>
                            
                            
                        </ul>
                    </div>
                    <div className="icons">
                        <div className="profile">
                            <div className="profileIcon">
                                <i className="uil uil-user"></i>
                                <p className="title">profile</p>
                            </div>
                            <div className="Authentication">
                                <p className="title">{UserisAuthenticate ? "hellow user" : "User please Signin"}</p>
                                {UserisAuthenticate ?
                                    <button className="button" onClick={LogoutUser}>logout</button>
                                    :
                                    <button className="button"><Link className="BtnLink" to="/login">signin</Link></button>
                                }
                            </div>
                        </div>
                        <div className="cart">
                            <Link id="carticon" to="/cart"><i className="uil uil-shopping-cart" data-carts={TotalNumberOfCarts} ></i></Link>
                            <p>cart</p>
                        </div>
                    </div>
                </nav>
            </header>
  
  </>
}

export default NavigationBar