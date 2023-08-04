import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isopen : false ,
  isupdatebtn : false,
}
const commanSlice = createSlice({
  name: 'comman',
  initialState,
  reducers: {
      openForm : (state , action) => {
           state.isopen = action.payload.isopen ;
           state.isupdatebtn = action.payload.update
      }
  },
})

export const {openForm} = commanSlice.actions
export default commanSlice.reducer

