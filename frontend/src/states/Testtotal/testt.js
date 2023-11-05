import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Total: 0
}

export const TotalSlice= createSlice({
  name: 'carted product price',
  initialState,
  reducers: {
    changeTotal: (state,action) => {
      state.Total +=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {changeTotal} = TotalSlice.actions

export default TotalSlice.reducer