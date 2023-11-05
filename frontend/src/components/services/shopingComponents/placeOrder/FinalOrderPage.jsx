
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../../../../css/PaymentPage/placeOrder.css"
import { changeTotalCartedProductPrice, changeTotalNumberOfCarts } from "../../../../states/TotalCartedProductPrice/CartedProductsPrice";
import CartedCart from "./cartedItems/cartedCart";
import SingleCart from "./singleItem/singelCart";
import FinalPayAmmount from "../TotalBuyProductsAmmount/FinalPayAmmount";
import { ReactDOM } from "react";
import HashLoader from "react-spinners/HashLoader"
import { useLocation } from 'react-router-dom';
import "../../../../App.css"
// set headers 
var myHeaders = new Headers({
    'Content-Type': 'application/json',
});
const PlaceOrder = () => {
    const [pageIsLoading,setPageIsLoading]=useState(false)
    const location = useLocation();
    // define redux state
    const TotalItemsAmmount = useSelector((state) => state.CartedItemPrice.TotalCartsPrice);
    // const Allcarteditemsbuy=localStorage.getItem("AllcarteditemsBuy")
    const [Order, setOrder] = useState(null);
    const TotalItems = useSelector((state) => state.CartedItemPrice.TotalNumberOfCarts);
    console.log(location)
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        GetData()
    }, [])
    // access all carted item from database
    const [CartedData, setcartedData] = useState([])
    // const [single,setSingle]=useState(false);
    // const [Allitemsbuy,setAllitemsbuy]=useState(false);
    const GetData = () => {
        //data get on this api
        const token = localStorage.getItem("logedUserToken")
        let URL = "http://localhost:8000/addcart/cart";
        axios.post(URL, { AuthToken: token }, myHeaders).then((res) => {
            setcartedData(res.data);
        })
    }
    // get user buying single item detail from Redux State
    //     const Allcarteditemsbuy=useSelector((state)=> state.AllcartedBuying. AllCarteditemsBuying);
    //     const SingleitemBuy=useSelector((state)=>state.SingleProductBuying.SingleItemBuying);
    //    const name="shubham choudhary";
    const Allcarteditemsbuy = Boolean(localStorage.getItem("AllcarteditemsBuy"));
    const SingleitemBuy = Boolean(localStorage.getItem("Singleitembuy"))

    const details = useSelector((state) => state.BuySingleproductdetails.Buyingitemdetail);

    // Payment Getway establish




    const ContinuePayment = async () => {
        setPageIsLoading(true)
        const URL = "http://localhost:8000/product";
        var user = null;
        user = localStorage.getItem("logedUserToken")
        if (user != null) {
            let userDetails = {
                token: user,
                ammount: TotalItemsAmmount
            }
            if (location.state.caseOnDilavery) {
                await axios.post(`${URL}/buy/caseon-dilavery`,userDetails,myHeaders)
                .then((response)=>{
                    console.log(response);

                    setTimeout(() => {
                        setPageIsLoading(false);
                        navigate("/product/buy/order-placed")
                    }, 2000);
                })
                .catch((response)=>{
                    console.log(response)
                })
            } else {
                // create an payment order
                await axios.post(`${URL}/create-order`, userDetails, myHeaders)
                    .then((response) => {
                        console.log(response)
                        if (response.data.order.status == 'created') {
                            setOrder(response.data.order);
                            paymentCheckOut(response.data.order);
                        } else {
                            alert("something went wrong")
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }

        } else {
            navigate("/login")
        }
    }

    const sendOnlineOrderDetails=async(order)=>{
        const URL = "http://localhost:8000/product";
        var user = null;
        user = localStorage.getItem("logedUserToken")
        if (user != null) {
            console.log(user)
            let userDetails = {
                token: user,
                ammount: TotalItemsAmmount
            }
                await axios.post(`${URL}/buy/online-dilavery`,userDetails,myHeaders)
                .then((response)=>{
                    setTimeout(() => {
                        setPageIsLoading(false);
                        navigate("/product/buy/order-placed")
                    }, 2000);
                   
                })
                .catch((response)=>{
                    console.log(response)
                })
        }
    }


    const paymentCheckOut = (order) => {
        var options = {
            key: "rzp_test_VfKCRNfVkjtHFd", // Enter the Key ID generated from the Dashboard
            amount: "40000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Shubham choudhary",
            description: "Thanks for visiting my site and buy product",
            image: "https://example.com/your_logo",
            order_id: Order?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response) {
                if (
                    response.razorpay_payment_id!="" &&
                    response.razorpay_order_id!="" &&
                    response.razorpay_signature!=""
                ) {
                        setPageIsLoading(true)
                        sendOnlineOrderDetails(order);
                        
                }
            },
            "prefill": {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#000"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response) {
            alert("feield")
        });
    }


    return <>



        <main>
            <section className="PlaceOrderSection">
                <div className="PlaceOrderContainer">
                    <div className="OrderBoxPriceBox">

                        {/* start the cart boxes ---------------------------------------- */}
                        <div className="OrderDetailPart">

                            <div className="productDetail">
                                <div className="heading">product detail</div>
                                <div className="productBox">
                                    <div className="header">
                                        <p><img src={process.env.PUBLIC_URL + "/photos/WebsitePhotos/truck.png"} alt="" />Estimated Delivery by Monday, 12th Sep</p>
                                    </div>
                                    {/* carted itmes-------------------------------------- */}

                                    {
                                        Allcarteditemsbuy ?
                                            CartedData.map((current) => {

                                                return (
                                                    <CartedCart iteminfo={current} />
                                                );
                                            })
                                            :
                                            <SingleCart iteminfo={details} />

                                    }


                                    {/* end of carted items ------------------------------ */}
                                </div>
                            </div>
                            <div className="dilaveryAddress">
                                <div className="heading">Dilavery Address</div>
                                <div className="Addresscart">
                                    <div className="header">
                                        <div className="left">Shubham Choudhary</div>
                                        <div className="right">Edite</div>
                                    </div>
                                    <div className="addressDetail">
                                        <p className="location">sant nagar vaishno library, khandwa naka, indore,</p>
                                        <p className="state">Madhya Pradesh - 452001</p>
                                        <p className="mobile">+91 7447006318</p>
                                    </div>
                                </div>
                            </div>
                            <div className="paymentMethod">
                                <div className="heading">payment mode</div>
                                <div className="PaymentBox">
                                    <div className="paymentMode">
                                        <div className="CashOnDilavery">
                                            {
                                                location.state.caseOnDilavery ?
                                                    <div className="logo">
                                                        <img src={process.env.PUBLIC_URL + "photos/WebsitePhotos/cashondilavery.png.png"} alt="" />
                                                        <h3>cash on dilavery</h3>
                                                    </div>
                                                    : "Online"
                                            }

                                        </div>
                                    </div>
                                </div> {/* end of cart boxes---------------------------------- */}
                            </div>
                        </div> {/* end of Order Detail part---------------------------------- */}


                        {/* product price box ------------------------------------- */}
                        <div className="ProductPriceBox">
                            <div className="priceDetail">
                                <h3 className="title">price details</h3>
                                <div className="totalPrice"><h5>total product price</h5> <strong><i className="uil uil-rupee-sign"></i>{TotalItemsAmmount}</strong></div>
                            </div>
                            <div className="orderTotal"><h5 className="title">order total</h5> <strong><i className="uil uil-rupee-sign"></i>{TotalItems}</strong></div>

                            <div className="buttonBox"><button onClick={ContinuePayment} >place order</button></div>

              x              <div className="saftyBox">
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

export default PlaceOrder;