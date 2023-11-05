import React from 'react'
import "./MyOrderd.css"
const MyItem = ({ order }) => {
    console.log(order)
    return <>

        <div className="myOrder-cart">
            <div className="cartBody">
                <div className="ItemImage">
                    <img src={process.env.PUBLIC_URL + `/photos/tshirts/${order?.UserChoosesImage}`} alt="...." />
                    <div className="logoImage"><img src={`http://localhost:8000/public/uploads/${order?.UplodedImage}`} alt="" /></div>
                </div>
                <div className="ItemDetails">
                    <h3 className="ProductName">{order?.ProductName}</h3>
                    <p className="size">Size: {order?.Size}     Q: {order?.NetQuantity}</p>
                    <p className="price"><i className="uil uil-rupee-sign"></i>{order?.TotalPrice}</p>
                    
                   
                </div>
            </div>
            <div className="ProductSuplier">
                <p className="Supliername">salername :{order.Salername}<span></span></p>
                <h5 className='dilavery'>Free Dilavery</h5>
                <div className="diliverd-time">diliverd on 5th agust</div>
            </div>
        </div>

    </>
}

export default MyItem