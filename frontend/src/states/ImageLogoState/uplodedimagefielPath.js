import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filePath:"none",
}

export const UplodedImageFilePathSlice = createSlice({
  name: 'uploadedimagepath',
  initialState,
  reducers: {
    ChangeUplodedImageFilePath: (state,action) => {
      state.filePath=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {ChangeUplodedImageFilePath} = UplodedImageFilePathSlice.actions

export default UplodedImageFilePathSlice.reducer