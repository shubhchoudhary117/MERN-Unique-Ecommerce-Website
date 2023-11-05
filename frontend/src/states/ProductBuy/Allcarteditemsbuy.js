import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  AllCarteditemsBuying:localStorage.getItem("AllcarteditemsBuy")
}

export const AllcarteditemBuyingSlice= createSlice({
  name: 'all carted items conditions',
  initialState,
  reducers: {
    changeAllcartedItemBuying: (state,action) => {
      state.AllCarteditemsBuying =action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {changeAllcartedItemBuying} = AllcarteditemBuyingSlice.actions

export default AllcarteditemBuyingSlice.reducer