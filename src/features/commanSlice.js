import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isopen : false ,
  isupdatebtn : false,
  istokennotification : false,
}
const commanSlice = createSlice({
  name: 'comman',
  initialState,
  reducers: {
      openForm : (state , action) => {
           state.isopen = action.payload.isopen ;
           state.isupdatebtn = action.payload.update
      },
      tokenNotification : (state , action) =>{
           state.istokennotification = action.payload
      }
  },
})

export const {openForm , tokenNotification} = commanSlice.actions
export default commanSlice.reducer

