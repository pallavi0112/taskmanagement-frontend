import { configureStore } from '@reduxjs/toolkit'
import taskSlice from '../features/taskSlice'
import commanSlice from '../features/commanSlice'
export const store = configureStore({
  reducer: {
    tasks : taskSlice,
     comman : commanSlice
  },
})