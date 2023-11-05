import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ImageType: "frontend",
}

export const ImageTypeBackendFrontendSlice = createSlice({
  name: 'imageTypeBackendorFrontend',
  initialState,
  reducers: {
    ChangeImageType: (state,action) => {
      state.ImageType=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {ChangeImageType} = ImageTypeBackendFrontendSlice.actions

export default ImageTypeBackendFrontendSlice.reducer