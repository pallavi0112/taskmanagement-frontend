import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { taskApi } from '../apis'


export const GetAllTask = createAsyncThunk('GetAllTask', async (token, rejectWithValue) => {
    try{
        const response = await taskApi.get('/task/' , {headers : {Authorization :`token ${token}` }})
        console.log(response)
        return response.data
    }
    catch(error){
        return rejectWithValue(error.data.response)
    }
  }
)

export const CreateTask = createAsyncThunk('CreateTask', async ( payload , rejectWithValue) => {
    try{
        const response = await taskApi.post('/task/create' , payload.values , {headers : {"content-type" : "application/json" , Authorization :`token ${payload.token}`}})
        return response.data
    }
    catch(error){
        return rejectWithValue(error.data.response)
    }
  }
)
export const UpdateTask = createAsyncThunk('UpdateTask', async ( payload , rejectWithValue) => {
    try{
        const response = await taskApi.put(`/task/update/${payload.id}` , payload.data, {headers : {"content-type" : "application/json" , Authorization :`token ${payload.token}`}})
        console.log(response)
        return response.data
    }
    catch(error){
        return rejectWithValue(error.data.response)
    }
  }
)
export const DeleteTask = createAsyncThunk('DeleteTask', async (payload , rejectWithValue) => {
    try{
        const response = await taskApi.delete(`/task/delete/${payload.id}`, {headers : {"content-type" : "application/json" , Authorization :`token ${payload.token}`}})
        console.log(response)
        return response.data
    }
    catch(error){
        return rejectWithValue(error.data.response)
    }
  }
)
const initialState = {
   data:[],
   updatingdata : null,
   loading: 'idle',
   status : {
    create : '',
    update : '',
    delete :  '',
   },
   error : {
    create : '',
    update : '',
    delete :  '',
   }
}
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
     GetUpdatingData : (state , action) =>{
       state.updatingdata = action.payload
       console.log(state.updatingdata)
     }
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllTask.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(GetAllTask.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(GetAllTask.rejected, (state, action) => {
      
    })
    builder.addCase(CreateTask.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(CreateTask.fulfilled, (state, action) => {
      state.status.create = action.payload.message
      state.status.update = ''
      state.status.delete = ''
      state.data = action.payload
    })
    builder.addCase(CreateTask.rejected, (state, action) => {
      state.error.create = action.payload.message
      state.error.delete = ''
      state.error.update = ''
      console.log(action.payload)
    })
    builder.addCase(UpdateTask.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(UpdateTask.fulfilled, (state, action) => {
      state.status.update = action.payload.message
      state.status.create = ''
      state.status.delete = ''
      state.data = action.payload
    })
    builder.addCase(UpdateTask.rejected, (state, action) => {
      state.error.update = action.payload.message
      state.error.delete = ''
      state.error.create = ''
      console.log(action.payload)
    })
    builder.addCase(DeleteTask.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(DeleteTask.fulfilled, (state, action) => {
      state.status.delete = action.payload.message
      state.status.create = ''
      state.status.update = ''
      state.data = action.payload
    })
    builder.addCase(DeleteTask.rejected, (state, action) => {
      state.error.delete = action.payload
      state.error.create = ''
      state.error.update = ''
      console.log(action.payload)
    })
  },
})

export const {GetUpdatingData} = tasksSlice.actions
export default tasksSlice.reducer

