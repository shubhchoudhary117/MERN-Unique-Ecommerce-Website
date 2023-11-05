import { useState } from "react";


const SingleCart = (props) => {
    return <>
        {/* ----------------------------------start the detail cart ------------------------------- */}
        <div className="detailCart">
            <div className="cartBody">
                <div className="ItemImage">
                    <img src={process.env.PUBLIC_URL + `/photos/tshirts/${props.iteminfo.ItemImage}`} alt="...." />
                    <div className="logoImage"><img src={props.iteminfo.Logo} alt="" /></div>
                </div>
                <div className="ItemDetails">
                    <h3 className="ProductName">{props.iteminfo.Productname}</h3>
                    <p className="size">Size: {props.iteminfo.Size}</p>
                    <p className="price"><i className="uil uil-rupee-sign"></i>{props.iteminfo.Price}</p>
                </div>
            </div>
            <div className="ProductSuplier">
                <p className="Supliername">suplier :<span>Shubham Choudhary</span></p>
                <h5>Free Dilavery</h5>
            </div>
        </div>
        {/* ---------------------------------end of detail cart ---------------------------------------- */}
    </>
}

export default SingleCart;