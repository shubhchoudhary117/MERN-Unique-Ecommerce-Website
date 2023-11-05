import { configureStore } from '@reduxjs/toolkit'
import LogoReducer from "./TextLogoState/LogoTextSlice"
import LogocolorReducer from "./TextLogoColorState/TextLogoColorSlice"
import UplodedImageLogoReducer from "./ImageLogoState/ImageLogoSlice"
import BackendFrontendReducer from "./ImageType/backendfrontend.js"
import UserChoosesImageReducer from "./UserChoosesImage/Userchoosesimage.js"
import UplodedImageFilePathReducere from "./ImageLogoState/uplodedimagefielPath.js"
import TotalCartedProductPriceReducer from "./TotalCartedProductPrice/CartedProductsPrice.js"
import UserLoginReducer from "./Authentication/LoginAuth.js"
import TotalReducer from "./Testtotal/testt.js"
import TotalcartsReducer from "./TotalCartedProductPrice/CartedProductsPrice.js"
import AllcarteditembuyingReducer from "./ProductBuy/Allcarteditemsbuy.js"
import SingleItemBuyingdetailsReducer from "./singleProduct/singleProductBuying.js"
import SingleProductBuyingReducer from "./singleProduct/singleProductBuying.js"

export const store = configureStore({
  reducer: {
    logotext:LogoReducer,
    logocolor:LogocolorReducer,
    imageurl:UplodedImageLogoReducer,
    imgbackendfrontend:BackendFrontendReducer,
    userchoosesitem:UserChoosesImageReducer,
    uplodedImageFilePath:UplodedImageFilePathReducere,
    CartedItemPrice:TotalCartedProductPriceReducer,
    LoginAuth:UserLoginReducer,
    total:TotalReducer,
    TotalCarts:TotalcartsReducer,
    AllcartedBuying:AllcarteditembuyingReducer,
    SingleProductBuying:SingleProductBuyingReducer,
    BuySingleproductdetails:SingleItemBuyingdetailsReducer

   
  },
})

