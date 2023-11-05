import ImageLogo from "./Imageediting.jsx";
import TshirtData from "../services/productdetails/TshirtDetails/TshirtData.js"
import TshirtBox from "./Products/Tshirts/TshirtCards.jsx";
import "../../css/style.css"
import "../../App.css"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader"
import axios from "axios";
import { changeTotalCartedProductPrice, changeTotalNumberOfCarts } from "../../states/TotalCartedProductPrice/CartedProductsPrice.js";
// set headers 
var myHeaders = new Headers({
    'Content-Type': 'application/json',
});

const Home = () => {
    // router methods
    const navigate = useNavigate()
    const [pageIsLoading,setPageIsLoading]=useState(true)
    // state modifying methods
    const dispatch = useDispatch()

    // create an hook
    const [UserisAuthenticate, setUserisAuthenticate] = useState(false);

    // Redux state access methods define
    const UserisLogin = useSelector((state) => state.LoginAuth.UserLogin);
    const TotalNumberOfCarts = useSelector((state) => state.CartedItemPrice.TotalNumberOfCarts);

    // Logout the user 
    const LogoutUser = () => {
        localStorage.removeItem("logedUserToken");
        window.location.href = "http://localhost:3000/";

    }
    // end of logout user function functionality





    // -----------------------------------
    const ImageLogoComponent = () => {
        navigate("/order")
    }

    useEffect(()=>{
        setTimeout(()=>{
            setPageIsLoading(false);
        },2000)
        
    },[])

    // get Total Number Of carts
    const getTotalNumberOfCarts = () => {
        let URL = "http://localhost:8000/addcart/totalcarts";
        let Token = localStorage.getItem("logedUserToken")
        axios.post(URL, { AuthToken: Token }, myHeaders).then((res) => {
            let Response = res.data;
            console.log("is authenticate" + Response.UserisAuthenticate);
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
    return <>
        <div className="HomeSectionBody" hidden={pageIsLoading} id="body">


            {/* end of navigation bar */}

            <div className="BackgroundSection">
                <div className="content">
                    <p className="text">best product best quality</p>
                    <h3 className="heading">buy products on<span>0% extra charge</span> </h3>
                    <button className="Purchessbutton">purchess</button>
                </div>

                <div className="imagesPart">
                    <div className="image">
                        <img src={process.env.PUBLIC_URL + "/photos/tshirts/tshirt1.png.png"} alt="image not found" />
                        <p>your logo</p>
                    </div>

                </div>
            </div>
            {/* end of background section */}

            <section className="fashionSection">
                <div className="Fashionheading">
                    <div className="left"></div>
                    <div className="middle">Top Categories to choose from</div>
                    <div className="right"></div>
                </div>
                <div className="Fashioncontainer">
                    <div className="Fashions">
                        <div className="womanFashion">
                            <div className="image">
                                <img src={process.env.PUBLIC_URL + "/photos/WebsitePhotos/womanwear.webp"} alt="fashion image" />
                            </div>
                        </div>
                        <div className="manFashion">
                            <div className="image">
                                <img src={process.env.PUBLIC_URL + "/photos/WebsitePhotos/manwear.webp"} alt="fashion image" />
                            </div>
                        </div>
                        <div className="kidsFashion">
                            <div className="image">
                                <img src={process.env.PUBLIC_URL + "/photos/WebsitePhotos/kids.wepb.webp"} alt="fashion image" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* content of webiste */}

            <div className="aboutSection">
                <div className="contentContainer">
                    <div className="content">
                        <div className="image">
                            <img src={process.env.PUBLIC_URL + "/photos/WebsitePhotos/logoshowingTshirt.AVIF"} alt="imagenotfound" />
                            <div className="message">your logo</div>
                        </div>
                        <div className="aboutContent">
                            <h2 className="title">Logo printing shoping webiste</h2>
                            <p className="text">
                                On this shopping side, you can order any T-shirt
                                you like by printing any logo, image on it.
                                Whatever the logo image will be, you yourself will import
                                which logo or image you want to print on the picture.
                            </p>
                        </div>
                    </div>
                </div>
                {/* end of container */}
            </div>

            {/* start the tshirt section */}
            <div className="TshirtSection">
                <div className="heading"><h3 className="title">Products for you</h3></div>

                <div className="Tshirts">

                    {
                        TshirtData.map((Dataobj) => {
                            return <TshirtBox Tshirt={Dataobj} />
                        })
                    }

                </div>
                {/* end of Tshirts section */}
            </div>
            {/* start the products listing part */}
        </div>
        {/* end of HomeLayout body */}
        <div className={pageIsLoading?"activeLoader":"notActive-loader"}>
            <HashLoader color="#0b9d8a" />
        </div>

    </>
}

export default Home;