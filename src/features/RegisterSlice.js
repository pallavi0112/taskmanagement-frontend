import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { taskApi } from '../apis'


export const UserRegister = createAsyncThunk('UserRegister', async (data, rejectWithValue) => {
    try {
        const response = await taskApi.post('/user/register', data, { headers: { 'Content-Type': 'multipart/form-data' } })
        console.log(response)
        return response.data
    }
    catch (error) {
        return rejectWithValue(error.data.response)
    }
}
)

const initialState = {
    status: '',
    error: '',
}
const RegisterSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder.addCase(UserRegister.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(UserRegister.fulfilled, (state, action) => {
            state.status = 'success'
            state.data = action.payload
        })
        builder.addCase(UserRegister.rejected, (state, action) => {
            state.status = 'reject'
            state.error = action.payload.message
            console.log('rejected' , action.payload)
        })
    },
})

export const {  } = RegisterSlice.actions
export default RegisterSlice.reducer

