import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Buyingitemdetail:{},
  SingleItemBuying:localStorage.getItem("Singleitembuy")
}

export const BuyingitemdetailSlice= createSlice({
  name: 'BuyingItemDetails',
  initialState,
  reducers: {
    changeBuyingitemdetals: (state,action) => {
      state.Buyingitemdetail=action.payload
    }
    , changeSingleitemBuying: (state,action) => {
      state.SingleItemBuying=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeBuyingitemdetals,changeSingleitemBuying} = BuyingitemdetailSlice.actions

export default BuyingitemdetailSlice.reducer