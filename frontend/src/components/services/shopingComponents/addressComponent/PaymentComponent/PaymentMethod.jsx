import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../../../../../css/PaymentPage/PaymentLayoutStyle.css"
import { changeTotalNumberOfCarts, changeTotalCartedProductPrice } from "../../../../../states/TotalCartedProductPrice/CartedProductsPrice";
import PlaceOrder from "../../placeOrder/FinalOrderPage";

// set headers 
var myHeaders = new Headers({
    'Content-Type': 'application/json',
});
const PaymentLayout = (props) => {
    // define redux state
    const TotalItemsAmmount = useSelector((state) => state.CartedItemPrice.TotalCartsPrice);
    const TotalItems = useSelector((state) => state.CartedItemPrice.TotalNumberOfCarts);
    const dispatch = useDispatch();
    const [caseOnDilavery, setCaseOnDilavery] = useState(true);
    const [placeOrder, setPlaceOrder] = useState(false);

    // get Total Number Of carts
    const getTotalNumberOfCarts = () => {
        let URL = "http://localhost:8000/addcart/totalcarts";
        let Token = localStorage.getItem("logedUserToken")
        axios.post(URL, { AuthToken: Token }, myHeaders).then((res) => {
            let Response = res.data;
            dispatch(changeTotalNumberOfCarts(Response.TotalCarts))
            dispatch(changeTotalCartedProductPrice(Response.TotalAmmount))
        })
    }
    // end of geting total number of carts api calling api

    // UseEffect for getting TotalNumber of carts
    useEffect(() => {
        getTotalNumberOfCarts()
    }, [])


    return <>
      
          

                <main>
                    <section className="PaymentSection">
                        <div className="PaymentContainer">
                            <div className="PaymentBoxPriceBox">
                                {/* start the cart boxes ---------------------------------------- */}
                                <div className="PaymentBox">
                                    <h4>payment method</h4>
                                    <div className="paymentMethods">
                                        <div className="CashOnDilavery">
                                            <div className="logo">
                                                <img src={process.env.PUBLIC_URL + "photos/WebsitePhotos/cashondilavery.png.png"} alt="" />
                                                <h3>cash on dilavery</h3>
                                            </div>

                                            <div className="mark">
                                                {
                                                    caseOnDilavery ? <i class="uil uil-check" onClick={() => setCaseOnDilavery(false)}></i>
                                                        : <i class="uil uil-circle" onClick={() => setCaseOnDilavery(true)}></i>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div> {/* end of cart boxes---------------------------------- */}


                                {/* product price box ------------------------------------- */}
                                <div className="ProductPriceBox">
                                    <div className="priceDetail">
                                        <h3 className="title">price details</h3>
                                        <div className="totalPrice"><h5>total product price</h5> <strong><i className="uil uil-rupee-sign"></i>{TotalItemsAmmount}</strong></div>
                                    </div>
                                    <div className="orderTotal"><h5 className="title">order total</h5> <strong><i className="uil uil-rupee-sign"></i>{TotalItems}</strong></div>

                                    <div className="buttonBox">
                                        <button >
                                            <Link to='/placeorder' state={{caseOnDilavery:caseOnDilavery}} id="link">continue</Link></button></div>

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
               
                

    </>
}

export default PaymentLayout;