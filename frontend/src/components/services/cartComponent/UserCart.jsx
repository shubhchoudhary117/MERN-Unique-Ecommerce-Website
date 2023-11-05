import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {changeTotalCartedProductPrice} from "../../../states/TotalCartedProductPrice/CartedProductsPrice.js"

var myHeaders = new Headers({
    'Content-Type': 'application/json',

});

const CartLayout = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [total,settotal]=useState(0)


    const DeleteCart = (id) => {
        const URL = `http://localhost:8000/addcart/cart/remove/${id}`;
        // sendign post reques for deleting cart
        axios.post(URL, myHeaders).then((res) => {
            let Response = res.data;
            // refreshing  cart page after cart deleted
            if (Response.deleted) {
                window.location = "http://localhost:3000/cart";
            }
        }).catch((err) => {
            console.log(err)
        })     
    }

//    console.log(props.cartInfo.TotalPrice)
    return <>

        <div className="cart">
            <div className="cartBody">
                <div className="ItemImage">
                    <img src={process.env.PUBLIC_URL + `/photos/tshirts/${props.cartInfo.UserChoosesImage}`} alt="...." />
                    <div className="logoImage"><img src={`http://localhost:8000/public/uploads/${props.cartInfo.UplodedImage}`} alt="" /></div>
                </div>
                <div className="ItemDetails">
                    <h3 className="ProductName">{props.cartInfo.ProductName}</h3>
                    <p className="size">Size: {props.cartInfo.Size}     Q: {props.cartInfo.NetQuantity}</p>
                    <p className="price"><i className="uil uil-rupee-sign"></i>{props.cartInfo.TotalPrice}</p>
                    <p className="RemoveOption" onClick={() => { DeleteCart(props.cartInfo.__id) }}><i className="uil uil-times"></i>remove</p>
                </div>
            </div>
            <div className="ProductSuplier">
                <p className="Supliername">suplier :<span>Shubham Choudhary</span></p>
                <h5>Free Dilavery</h5>
            </div>
        </div>
        {/* end of Product Details ------------------ */}
        {/* end of cart 1 ----------------------------------------------- */}
        {
            // dispatch(changeTotalCartedProductPrice(props.cartInfo.TotalPrice))
        }
    </>
}

export default CartLayout;