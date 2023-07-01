import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getTask ,addTaskk } from "../../Services/services";
const initialState={
    task:[],
    loading:false,
    error:false
}
export const fetchTask = createAsyncThunk('user/fetchTask', async (data, { getState }) =>{
 const response = await getTask().then((res)=>{
    const { data } = res ; 
    return{
        data
    }
 }).catch((err)=>{
 toast.error('Something went wrong', { timeOut: 5000 });
 })
 return response
})
export const addTask = createAsyncThunk('user/addTask', async (data, { getState }) =>{
    console.log("data for add task" , data);
    const response = await addTaskk(data).then((res)=>{
        if(res){
            toast.success("Task Added sucessfully", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1200,
                pauseOnHover: false,
              });
        }
    }).catch((err)=>{
    toast.error('Something went wrong', { timeOut: 5000 });
    })
    return response
   })

const taskSlice = createSlice({
    name:"taskSlice",
    initialState,
    reducers:{
        setTask:(state , action )=>{
        },
        setTogglee:(state , action )=>{
            state.toggle = action.payload
        },
        setStatus:(state , action)=>{
            state.status = action.payload
        }
    },
    extraReducers:{
        [fetchTask.fulfilled]:(state, action)=>{
            state.task = action.payload.data;
            state.loading = false;
            state.error = false;
           
        },
        [fetchTask.rejected]: (state, _) => {
            state.task = [];
            state.loading = false;
            state.error = true;


          },
          [fetchTask.pending]: (state, _) => {
            state.task = [];
            state.loading = true;
            state.error = false;


          },
          [addTask.fulfilled]:(state, action)=>{
              
        },
        [addTask.rejected]: (state, _) => {
            state.task = [];
          },
          [addTask.pending]: (state, _) => {
            state.task = [];
          },

    }
})


export const {
    setTogglee,
    setStatus
} = taskSlice.actions

export default taskSlice.reducer;