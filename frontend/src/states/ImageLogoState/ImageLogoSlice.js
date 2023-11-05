import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  urlValue: false,
}

export const UplodedImagelogourlSlice = createSlice({
  name: 'uploadedimageurl',
  initialState,
  reducers: {
    ChangeUplodedImageUrl: (state,action) => {
      state.urlValue=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {ChangeUplodedImageUrl} = UplodedImagelogourlSlice.actions

export default UplodedImagelogourlSlice.reducer