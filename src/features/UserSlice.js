import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { taskApi } from '../apis'

export const GetUser = createAsyncThunk('GetUser', async (token, rejectWithValue) => {
    try {
        const response = await taskApi.get('/user', {headers : {Authorization : `token ${token}`}})
        console.log(response)
        return response.data
    }
    catch (error) {
        return rejectWithValue(error.data.response)
    }
}
)

const initialState = {
    user:{},
    updatingdata: null,
    status: {
        getProfile : '',
        userUpdate: '',
        delete: '',
    },
    error: {
        getProfile : '',
        userUpdate: '',
        delete: '',
    }
}
const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder.addCase(GetUser.pending, (state, action) => {
            state.status.getProfile = 'loading'
        })
        builder.addCase(GetUser.fulfilled, (state, action) => {
            state.status.getProfile = 'success'
            state.user = action.payload.user
        })
        builder.addCase(GetUser.rejected, (state, action) => {
            state.status.getProfile = 'reject'
        })
    },
})

export const {  } = UserSlice.actions
export default UserSlice.reducer

