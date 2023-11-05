import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  TextColor: "black",
}

export const TextlogoColorSlice = createSlice({
  name: 'logocolor',
  initialState,
  reducers: {
    changeTextlogoColor: (state,action) => {
      state.TextColor=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {changeTextlogoColor} = TextlogoColorSlice.actions

export default TextlogoColorSlice.reducer