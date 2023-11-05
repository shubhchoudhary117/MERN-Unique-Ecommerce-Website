import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userText: "your text",
}

export const LogoTextSlice = createSlice({
  name: 'userTakentext',
  initialState,
  reducers: {
    changeStateText: (state,action) => {
      state.userText=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {changeStateText} = LogoTextSlice.actions

export default LogoTextSlice.reducer