import { configureStore } from '@reduxjs/toolkit'
import taskSlice from '../features/taskSlice'
import commanSlice from '../features/commanSlice'
import RegisterSlice from '../features/RegisterSlice'
import AuthUserSlice from '../features/LoginSlice'
import UserSlice from '../features/UserSlice'
export const store = configureStore({
  reducer: {
    tasks : taskSlice,
     comman : commanSlice,
     register : RegisterSlice,
     User : UserSlice,
     auth : AuthUserSlice
  },
})