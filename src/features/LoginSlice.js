import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { taskApi } from '../apis'

export const UserLogin = createAsyncThunk('UserLogin', async (data, rejectWithValue) => {
    try{
        const response = await taskApi.post('/user_login' ,data, {headers : {'Content-Type' : 'application/json'}})
        console.log(response)
        return response.data  
    }
    catch(error){
        return rejectWithValue(error.data.response)
    }
  }
)
const initialState = {
    token : '',
   status : {
    login : '',
    update : '',
    delete :  '',
   },
   error : {
    login : '',
    update : '',
    delete :  '',
   }
}
const AuthUserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder.addCase(UserLogin.pending, (state, action) => {
      state.status.login = 'loading'
    })
    builder.addCase(UserLogin.fulfilled, (state, action) => {
      state.status.login = 'success'
      
      state.token = action.payload.token
    })
    builder.addCase(UserLogin.rejected , (state, action) => {
      state.status.login = 'reject'
      state.error.login = action.payload
      console.log(action.payload , "reject")
    })
  },
})

export const {} = AuthUserSlice.actions
export default AuthUserSlice.reducer

