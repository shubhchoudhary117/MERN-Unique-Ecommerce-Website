import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
const OrderSuccessfullPage = () => {
  return <>
   <div className="success-box">
    <div className="heading">Order placed Succssfully</div>
    <button><Link className="link" to="/">continue shoping</Link></button>
   </div>
  </>
}

export default OrderSuccessfullPage