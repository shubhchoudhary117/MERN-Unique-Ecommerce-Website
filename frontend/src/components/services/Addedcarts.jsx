import { useState,useEffect } from "react";
import CartLayout from "./cartComponent/UserCart";
import axios  from "axios";
import "../../App.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NoCartsAdded from "../MessagesComponents/Nocartsadded";
import { changeTotalCartedProductPrice, changeTotalNumberOfCarts } from "../../states/TotalCartedProductPrice/CartedProductsPrice.js"
import { changeTotal } from "../../states/Testtotal/testt";
import { changeAllcartedItemBuying } from "../../states/ProductBuy/Allcarteditemsbuy";
import HashLoader from "react-spinners/HashLoader"
// set headers 
var myHeaders = new Headers({
    'Content-Type': 'application/json',
});
const CartsLayout = (props) => {
    // define redux accesing state methods
    const TotalItmesAmmount = useSelector((state) => state.CartedItemPrice.TotalCartsPrice);
    const TotalNumberOfCarts=useSelector((state)=> state. CartedItemPrice.TotalNumberOfCarts);
    const dispatch = useDispatch();
    const [pageIsLoading,setPageIsLoading]=useState(true);



    // get Total Number Of carts
    const getTotalNumberOfCarts = () => {
        let URL = "http://localhost:8000/addcart/totalcarts";
        let Token = localStorage.getItem("logedUserToken")
        axios.post(URL, { AuthToken: Token }, myHeaders).then((res) => {
            let Response = res.data;
            dispatch(changeTotalNumberOfCarts(Response.TotalCarts));
            dispatch(changeTotalCartedProductPrice(Response.TotalAmmount))
            
            // page loading
            setTimeout(() => {  
                setPageIsLoading(false)
            }, 2000);
        })
    }
    // end of geting total number of carts api calling api

    // UseEffect for getting TotalNumber of carts
    useEffect(() => {
        getTotalNumberOfCarts()
    }, [])

    //set single item buy false
    localStorage.setItem("Singleitembuy",false);

    // -------------------
    const AllitemsBuying=()=>{
        localStorage.setItem("AllcarteditemsBuy",true);
        localStorage.setItem("Singleitembuy",false)
        // dispatch(changeAllcartedItemBuying(true))
    }
    return <>
        <main>
            <section className="cartSection" hidden={pageIsLoading}>
                <div className="CartContainer">
                    <div className="cartBoxesAndcartPriceBoxes">
                        {/* start the cart boxes ---------------------------------------- */}
                        <div className="cartBoxes">
                            {
                                props.cartsData.map((currentCart) => {
                                    // dispatch(changeTotalCartedProductPrice(currentCart.TotalPrice));
                                    return (
                                        <CartLayout cartInfo={currentCart} />
                                    );
                                })//end of map loop

                            }
                        </div> {/* end of cart boxes---------------------------------- */}
                        {/* product price box ------------------------------------- */}
                        <div className="ProductPriceBox">
                            <div className="priceDetail">
                                <h3 className="title">price details</h3>
                                <div className="totalPrice"><h5>total product price</h5> <strong><i className="uil uil-rupee-sign"></i>{TotalItmesAmmount}</strong></div>
                            </div>
                            <div className="orderTotal"><h5 className="title">order total</h5> <strong>{TotalNumberOfCarts}</strong></div>

                            <div className="buttonBox"><button><Link to="/address" id="link" onClick={AllitemsBuying}>continue</Link></button></div>

                            <div className="saftyBox">
                                <div className="saftycontent">
                                    <h3>your safty our priority</h3>
                                    <p className="text">we make sure that your package is safe at every point of contact</p>
                                </div>
                                <div className="saftyimage"><img src={process.env.PUBLIC_URL + "/photos/WebsitePhotos/cartsecurity.svg.svg"} alt="" /></div>
                            </div>
                        </div>
                        {/* end of product box -------------------------------------- */}
                    </div>{/* end of cart and price boxes div  */}
                </div>
            </section>
        </main>

        <div className={pageIsLoading?"activeLoader":"notActive-loader"}>
            <HashLoader color="#0b9d8a" />
        </div>
    </>
}

export default CartsLayout;