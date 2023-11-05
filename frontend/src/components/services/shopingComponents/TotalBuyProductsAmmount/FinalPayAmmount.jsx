
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./FinalPayAmmount.css"
const FinalPayAmmount = (props) => {
  const TotalItemsAmmount = useSelector((state) => state.CartedItemPrice.TotalCartsPrice);
  const TotalItems = useSelector((state) => state.CartedItemPrice.TotalNumberOfCarts);
  useEffect(()=>{
    console.log(props)
  },[])
  return <>

    <div className="final-ProductPriceBox">
      <div className="priceDetail">
        <h3 className="title">Order details</h3>
        <div className="totalPrice"><h5>total product price</h5> <strong><i className="uil uil-rupee-sign"></i>{TotalItemsAmmount}</strong></div>
      </div>
      <div className="orderTotal"><h5 className="title">order total</h5> <strong><i className="uil uil-rupee-sign"></i>{TotalItems}</strong></div>
      <div className="dilavery"><h5 className="dilavery-title">Dilavery </h5> <strong className='dilavery-type'>free dilavery</strong></div>
      {/* <div className="dilavery"><h5 className="dilavery-title">payment mode </h5> <strong className='dilavery-type'>{caseOnDilavery?"case on dilavery":"online"}</strong></div> */}
    <div className="buttonBox"><button><Link to="/product/payment" id="link" >place order</Link></button></div>

      <div className="saftyBox">
        <div className="saftycontent">
          <h3>your safty our priority</h3>
          <p className="text">we make sure that your package is safe at every point of contact</p>
        </div>
        <div className="saftyimage"><img src={process.env.PUBLIC_URL + "/photos/WebsitePhotos/cartsecurity.svg.svg"} alt="" /></div>
      </div>
    </div>
  </>
}

export default FinalPayAmmount;