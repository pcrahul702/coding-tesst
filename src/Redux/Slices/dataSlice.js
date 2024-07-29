import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const dataSlice = createSlice({
  name: 'adddata',
  initialState,
  reducers: {
    setDatainRedux: (state, action) => {
      // console.log(action.payload)
        state.value = action.payload;
      }
    },
    
  
})

export const { setDatainRedux } = dataSlice.actions

export default dataSlice.reducer