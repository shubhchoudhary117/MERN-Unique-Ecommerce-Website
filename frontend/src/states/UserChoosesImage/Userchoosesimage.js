import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ProductImageUrl: false,
}

export const UserChoosesImageurlSlice = createSlice({
  name: 'userchoosesimageurl',
  initialState,
  reducers: {
    changeUserChoosesImageUrl: (state,action) => {
      state.ProductImageUrl=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {changeUserChoosesImageUrl} = UserChoosesImageurlSlice.actions

export default UserChoosesImageurlSlice.reducer