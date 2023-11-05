import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  UserLogin:false,
}

export const UserLoginSlice= createSlice({
  name: 'userLoginAuthentication',
  initialState,
  reducers: {
    changeUserLogin: (state,action) => {
      state.UserLogin=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {changeUserLogin} = UserLoginSlice.actions

export default UserLoginSlice.reducer