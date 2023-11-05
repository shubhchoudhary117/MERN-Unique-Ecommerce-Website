import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../../App.css"
import HashLoader from "react-spinners/HashLoader"
import MyItem from './MyItem';
import NoCartsAdded from '../MessagesComponents/Nocartsadded';
// set headers 
var myHeaders = new Headers({
    'Content-Type': 'application/json',
});
const MYOrdersComponent = () => {
   const [caseOrders,setMyCaseOrders]=useState();
   const [onlineOrders,setMyOnlineOrders]=useState();
    const [pageIsLoading,setPageIsLoading]=useState(true);
    useEffect(() => {
        setTimeout(() => {
            setPageIsLoading(false)
        }, 2000);
        const getMyOrders =async () => {
            const URL = "http://localhost:8000/product/buy";
            var token = null;
            token = localStorage.getItem("logedUserToken");
            if (token != null) {
                await axios.get(`${URL}/my-orders/${token}`,myHeaders)
                .then((response)=>{
                    console.log(response)
                   if(response.data){
                    setMyCaseOrders(response.data.Caseorders?.Products);
                    setMyOnlineOrders(response.data.OnlineOrders?.Products)
                   }
                })
                .catch((error)=>{
                    console.log(error)
                })
            }

        }
        getMyOrders()
    }, [])

    return <>
    {
        caseOrders?.length||onlineOrders?.length?
        <div className="myOrders-section" hidden={pageIsLoading}>
            <div className="heading">My Orders</div>
            <div className="myOrders-Container">
                <div className="orders">
                    {
                        caseOrders?.map((order)=>{
                          return <MyItem order={order}/>
                        })
                    }
                    {
                        onlineOrders?.map((order)=>{
                          return <MyItem order={order}/>
                        })
                    }
                </div>
            </div>
        </div>
        :
        <div hidden={pageIsLoading}><NoCartsAdded   /></div>
        

    }
        
        <div className={pageIsLoading?"activeLoader":"notActive-loader"}>
            <HashLoader color="#0b9d8a" />
        </div>

    </>
}

export default MYOrdersComponent