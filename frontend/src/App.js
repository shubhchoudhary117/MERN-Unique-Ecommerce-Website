import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginLayout from "./components/Authentication/loginPage";
import SigneUpLayout from "./components/Authentication/signeupPage";

import MYOrdersComponent from "./components/MyOrders/MyOrdersComponent";
import OrderSuccessfullPage from "./components/OrderPlacedSuccessfull/OrderSuccessfullPage";
import AddTOCart from "./components/services/Addtocart";
import Home from "./components/services/HomeLayout";
import ProductPage from "./components/services/Product";
import ImageUpload from "./components/services/Products/uplodedImage";
import AddressBox from "./components/services/shopingComponents/addressComponent/AddressBox";
import PaymentLayout from "./components/services/shopingComponents/addressComponent/PaymentComponent/PaymentMethod";
import PlaceOrder from "./components/services/shopingComponents/placeOrder/FinalOrderPage";
import FinalPayAmmount from "./components/services/shopingComponents/TotalBuyProductsAmmount/FinalPayAmmount";
import AddressPageLayout from "./components/services/shopingComponents/userAddress";
import Total from "./components/services/test";
import Dashboard from "./Dashboard/Dashboard";


const App = () => {

  return <>

    <BrowserRouter>
      <Routes>
     
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginLayout />}></Route>
          <Route path="/signeup" element={<SigneUpLayout />}></Route>
          <Route path="/product/:imgData" element={<ProductPage />} />
          <Route path="/cart" element={<AddTOCart />} />
          <Route path="/address" element={<AddressPageLayout />} />
          {/* <Route path="/continueaddress" element={<AddressBox/>} /> */}
          <Route path="/payment" element={<PaymentLayout />} />
          <Route path="/total" element={<Total />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/product/payment" element={<FinalPayAmmount />} />
          <Route path="/shubhshop/my-orders" element={<MYOrdersComponent/>} />
          <Route path="/product/buy/order-placed" element={<OrderSuccessfullPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
}

export default App;