import { Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/BuyingProductPage.css";
import TextLogo from "../ProductComponent/Textlogo";
import ImageLogo from "../ProductComponent/imagelogo";
import { useDispatch, useSelector } from "react-redux";
import { ChangeImageType } from "../../states/ImageType/backendfrontend";
import { current } from "@reduxjs/toolkit";
import axios from "axios";
import { changeUserChoosesImageUrl } from "../../states/UserChoosesImage/Userchoosesimage";
import { changeBuyingitemdetals, changeSingleitemBuying } from "../../states/singleProduct/singleProductBuying";
import { changeAllcartedItemBuying } from "../../states/ProductBuy/Allcarteditemsbuy";

// set headers 
var myHeaders = new Headers({
    'Content-Type': 'application/json',

});
var setImageHeader = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
})


const ProductPage = () => {
    // using paramHooks for access url parameter 
    const param = useParams()
    var Tshirt = JSON.parse(param.imgData)
    const uplodedimageFilePath = useSelector((state) => state.uplodedImageFilePath.filePath)
    const statelogoText = useSelector((state) => state.logotext.userText)
    const UplodedImageurl = useSelector((state) => state.imageurl.urlValue)
    const imgmode = useSelector((state) => state.imgbackendfrontend.ImageType)
    const dispatch = useDispatch()
    const stateTextLogoColor = useSelector((state) => state.logocolor.TextColor)
    const UserchoosesImageUrl = useSelector((state) => state.userchoosesitem.ProductImageUrl)


    const [LogoNotUplod, setLogoNotUplod] = useState(false)
    const [productsize, setproductSize] = useState("");
    const [active, setActive] = useState(true)
    const [Mainborder, setmainBorder] = useState(true)
    const [LogoTshirt, setLogoTshirt] = useState("")
    const [UserChoosesFrontendImage, setuserchoosesfrontendImage] = useState(Tshirt.frontimage)
    const [UserChoosesFrontendImageofBackendImage, setUserChoosesFrontendImageofBackendImage] = useState(Tshirt.backendImageUrl)
    const [SizeNotSelected, setSizeNotSelected] = useState(true)
    const [LogoPrice, setLogoPrice] = useState(200);

    // routing methods
    const navigate = useNavigate();

    // dom manipulation access htnl tag 
    const backbox = document.getElementById("backbox")
    const frontbox = document.getElementById("frontbox")


    // get user selected size -------------------------
    const getselectedSize = (e) => {
        setproductSize(e.target.id)
        setSizeNotSelected(false)
    }
    // end of user selected size ----------------------
    // set the user chooses image url in redux state 

    dispatch(changeUserChoosesImageUrl(Tshirt.frontimage))
    // Post Data on in database ----------------------------------------------------------------------
    const PostData = (e) => {
        e.preventDefault();
        if (SizeNotSelected) {
            // error message size is not selected 
            document.getElementById("productsizebox").style.backgroundColor = "rgb(255, 218, 214)";

        }
        else {
            // error message romeove after size is selected 
            document.getElementById("productsizebox").style.backgroundColor = "#ffffff";
            var Useridentity=null;
            if (!UplodedImageurl) {
                setLogoNotUplod(true)
                window.location = "#uplodlogoimageBox"
            }
            else {
                setLogoNotUplod(false)
                // get user identity for authorization getting from local storage
                 Useridentity = localStorage.getItem("logedUserToken");
                console.log("token"
                +Useridentity);
                //   create data object 
                var formData = new FormData();
                formData.append('id', Tshirt.id);
                formData.append('productname', Tshirt.name);
                formData.append('size', productsize);
                formData.append('netquantity', Tshirt.netquantity);
                formData.append('itemprice', Tshirt.itemPrice);
                formData.append('logoprice', Tshirt.logoPrice);
                formData.append('itemimage', UserchoosesImageUrl);
                formData.append('dilavery', "free dilavery");
                formData.append('fabric', "corton");
                formData.append('imagemode', imgmode);
                formData.append('photo', uplodedimageFilePath);
                formData.append('AuthToken', Useridentity)
                formData.append('Salername',Tshirt.Salername)

                // end of fomr data object creatation 
                const config = {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                    },
                };

                // post data on this api
                let URL = "http://localhost:8000/addcart/";

                if (Useridentity!=null || Useridentity!=undefined) {
                     // data post in node js backend server using axios
                     axios.post(URL, formData, config).then((res) => {
                        console.log(res)
                        let Response = res.data;
                        if (Response.UserIsNotAuthenticate) {
                            navigate("/login")
                        }
                        else {
                            navigate("/cart")
                        }


                    })
                
                   
                } else {
                    navigate("/login")
                }



            }
            //end of logo not uploded checking  else condition




        }
    }



    // end of Data Posting Part -----------------------------------------------------------------------
    // image type selection animation scripting code -------------------------------------------
    const frontendImageEvent = () => {
        dispatch(ChangeImageType("frontend"))
        setuserchoosesfrontendImage(Tshirt.frontimage)
        setmainBorder(true)
    }

    const backendImageEvent = () => {
        dispatch(ChangeImageType("backend"))
        setuserchoosesfrontendImage(Tshirt.backendImageUrl);
        setmainBorder(false)

    }

    // image type selection scripting code end ----------------------------------------------------------



    // size list styling after select size------------------------------------------------------------------

    const changSlabelStyle = () => {
        document.getElementById("sizeS").style.border = "2px solid #0b9d8a";
        document.getElementById("sizeM").style.border = "1px solid black"
        document.getElementById("sizeL").style.border = "1px solid black";
        document.getElementById("sizeXL").style.border = "1px solid black"

    }
    const changMlabelStyle = () => {
        document.getElementById("sizeS").style.border = "1px solid black";
        document.getElementById("sizeM").style.border = "2px solid #0b9d8a"
        document.getElementById("sizeL").style.border = "1px solid black";
        document.getElementById("sizeXL").style.border = "1px solid black"
    }
    const changLlabelStyle = () => {
        document.getElementById("sizeS").style.border = "1px solid black";
        document.getElementById("sizeM").style.border = "1px solid black"
        document.getElementById("sizeL").style.border = "2px solid #0b9d8a";
        document.getElementById("sizeXL").style.border = "1px solid black"
    }
    const changXLlabelStyle = () => {
        document.getElementById("sizeS").style.border = "1px solid black";
        document.getElementById("sizeM").style.border = "1px solid black"
        document.getElementById("sizeL").style.border = "1px solid black";
        document.getElementById("sizeXL").style.border = "2px solid #0b9d8a"
    }
    // end of size list animation ----------------------------------------
    // when singel item is buying by  user
    // const PostSingleItemdata = () => {
    //     let detailObj = {
    //         Productname: Tshirt.name,
    //         Size: productsize,
    //         Price: Tshirt.itemPrice,
    //         ItemImage: Tshirt.frontimage,
    //         Logo: UplodedImageurl,
    //         Quantity: 1

    //     }
    //     localStorage.setItem("AllcarteditemsBuy", false);
    //     localStorage.setItem("Singleitembuy", true)
    //     // localStorage.setItem("SingleitemBuyingdetails",JSON.stringify(detailObj))
    //     dispatch(changeBuyingitemdetals(detailObj));
    //     // dispatch(changeAllcartedItemBuying(localStorage.getItem('AllcarteditemBuy')))
    //     // dispatch(changeSingleitemBuying(localStorage.getItem("Singleitembuy")))
    // }







    // boolean value set afete uploading image or text

    const ImageLogoChoosed = () => {
        setActive(true)
    }

    const TextLogoChoosed = () => {
        setActive(false)
    }



    // styling object 

    const imageBtnStyle = {
        opacity: active ? 0.7 : 1
    }
    const textBtnStyle = {
        opacity: active ? 1 : 0.7
    }


    return <>

        <div className="ProductPageBody">
            <header className="ProductPageHeader">
                <nav className="ProductpageNavigation ">
                    <div className="ProductPagelogo">shubh<span>Shop</span></div>
                    <div className="AddProductIcon"><Link to="/cart" id="aadtocartLink"><i className="uil uil-shopping-cart"></i></Link></div>
                </nav>
                <div className="ProductPageLinks">
                    <ul>
                        <li><Link to="/" id="Productlink" >T-shirts</Link></li>
                        <li><Link to="#" id="Productlink">Caps</Link></li>
                        <li><Link to="#" id="Productlink">Cofee-cups</Link></li>
                        <li><Link to="#" id="Productlink">Full Sleev T-shirts</Link></li>
                    </ul>
                </div>
            </header>

            {/* end of header Navigation Part */}

            <main className="ProductPagemain" id="uplodlogoimageBox">
                <div className="ProductContainer">
                    <div className="choosedProduct">
                        <div className="productImage">
                            <img src={process.env.PUBLIC_URL + `/photos/tshirts/${Tshirt.frontimage}`} alt="" />
                        </div>
                    </div>

                    <div className="logoPrintingPart">
                        <div className="LogoPrintingOptiondBox">
                            <h3 className="title">Select your logo which you want to print on Tashir</h3>
                            <div className="option">
                                <button style={imageBtnStyle} id="active" onClick={ImageLogoChoosed}><i className="uil uil-image"></i></button>
                                {/* <button style={textBtnStyle} id="unactive" onClick={TextLogoChoosed}><i className="uil uil-text-size"></i></button> */}
                            </div>
                            <div className="Logouploadbox">
                                {/* style={{backgroundColor:LogoNotUplod?"rgb(255, 218, 214)":"#ffffff"}} */}

                                {active ? <ImageLogo LogoNotSelected={LogoNotUplod} /> : <TextLogo />}

                            </div>
                            {LogoNotUplod ? <p id="LogonotuplodError"><i class="uil uil-exclamation-octagon"></i>plase select logo</p> : " "}
                        </div>
                    </div>

                    {/* end of logo printing section */}

                </div> {/* end of Container part */}
            </main>

            <div className="imagetypeselectSection">
                <div className="backendfrontendContainer">
                    <div className="content">
                        <h3>select the side of tshirt</h3>
                        <small>Select the side of the t-shirt whether you want to put the logo on the back side of
                            the t-shirt or the front site of the t-shirt</small>
                    </div>
                    <div className="ImageBackendBody">
                        <div className="ImageBackendBox" onClick={frontendImageEvent} id="frontbox" style={{ border: Mainborder ? "1px solid #0b9d8a" : "none" }}>
                            <img src={process.env.PUBLIC_URL + `/photos/tshirts/${Tshirt.frontimage}`} alt="" />
                            <strong>frontend</strong>
                        </div>
                        <div className="ImageBackendBox" onClick={backendImageEvent} id="backbox" style={{ border: Mainborder ? "0px" : "1px solid #0b9d8a" }}>
                            <img src={process.env.PUBLIC_URL + `/photos/tshirts/${Tshirt.backendImageUrl}`} alt="" />
                            <strong>backend</strong>
                        </div>
                    </div>
                </div>
            </div>


            <div className="CreatedImagesection">
                <div className="content">
                    <h3>your product</h3>
                </div>

                <div className="FinalImageContainer">
                    <div className="LogoApplayImageContainer">
                        <div className="LogoApplayImageOuterBody">
                            <div className="LogoApplayImage">
                                <div className="LOGOBOX"><img src={UplodedImageurl} alt="" style={{ display: UplodedImageurl ? "block" : "none" }} /></div>
                                <img src={process.env.PUBLIC_URL + `/photos/tshirts/${UserChoosesFrontendImage}`} alt="item image" />
                            </div>
                        </div>
                        <div className="BuynowAddCartButtons">
                            <button className="addcard" onClick={PostData}><Link to="#" id="link"><i className="uil uil-shopping-cart-alt"></i> add to card</Link></button>
                            {/* <button className="buynow" onClick={PostSingleItemdata}><Link to="/address" id="link"><i className="uil uil-shopping-bag"></i>Buy Now</Link></button> */}
                        </div>

                    </div>

                    <div className="productDetailsSection">

                        <div className="ProductPriceBox">
                            <h3 className="title">{Tshirt.name}with image logo</h3>
                            <span className="price"><i className="uil uil-rupee-sign"></i>{Tshirt.itemPrice + 200}</span><br></br>
                            <span className="rating">{Tshirt.rating} <i className="uil uil-star"></i></span><br></br>
                            <p className="dilavery">free dilavery</p>
                        </div>

                        <div className="ProductSizeBox" id="productsizebox">
                            <h2 className="title">select size</h2>
                            <ul className="sizeList">
                                <li><label htmlFor="S" onClick={changSlabelStyle} id="sizeS">S</label><input onChange={getselectedSize} id="S" type="radio" name="size" /></li>
                                <li><label htmlFor="M" onClick={changMlabelStyle} id="sizeM">m</label><input onChange={getselectedSize} id="M" type="radio" name="size" /></li>
                                <li><label htmlFor="L" onClick={changLlabelStyle} id="sizeL">l</label><input onChange={getselectedSize} id="L" type="radio" name="size" /></li>
                                <li><label htmlFor="XL" onClick={changXLlabelStyle} id="sizeXL">xl</label><input onChange={getselectedSize} id="XL" type="radio" name="size" /></li>
                            </ul>
                        </div>

                        <div className="ProductDetailBox">
                            <h4 className="title">product details</h4>
                            <p className="productName">Name:{Tshirt.name}</p>
                            <p className="productQuantity">NetQuantity:{Tshirt.netquantity}</p>
                            <p className="ProductSize">size:{productsize}</p>
                            <p className="fabric">Fabric : {Tshirt.fabric}</p>
                            <p className="logoType">logo: image.*</p>
                            <p className="TshirtPrice">Tshirt Price:{Tshirt.itemPrice}</p>
                            <p className="logoprice">logoPrice:200</p>
                            <p className="saler-name">Saler name: {Tshirt.Salername}</p>
                        </div>

                        <div className="facilityBox">
                            <div className="Facility">
                                <i className="uil uil-tag-alt"></i>
                                <p>lowest price</p>
                            </div>

                            <div className="Facility">
                                <i className="uil uil-truck"></i>
                                <p>cash on dilavery</p>
                            </div>

                            <div className="Facility">
                                <i className="uil uil-shopping-bag"></i>
                                <p>7-day return policy</p>
                            </div>
                        </div>



                    </div>



                </div>
                {/* end of final product section container */}
            </div>








        </div>

    </>
}

export default ProductPage;