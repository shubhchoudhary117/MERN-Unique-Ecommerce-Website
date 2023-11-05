import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  TotalCartsPrice: 0,
  TotalNumberOfCarts:0
}

export const TotalCartedProductPriceSlice= createSlice({
  name: 'carted product price',
  initialState,
  reducers: {
    changeTotalCartedProductPrice: (state,action) => {
      state.TotalCartsPrice=action.payload
    },
    changeTotalNumberOfCarts:(state,action)=>{
        state.TotalNumberOfCarts=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {changeTotalCartedProductPrice,changeTotalNumberOfCarts} = TotalCartedProductPriceSlice.actions
export default TotalCartedProductPriceSlice.reducer