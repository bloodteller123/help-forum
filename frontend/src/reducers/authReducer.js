import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import api from '../api'
const authSlice = createSlice({
    name: 'auth',
    initialState:{
        token: "",
        isAuth: false,
        user: null
    },
    reducers:{
        logout_auth (state, action){
            state.user = null;
            state.isAuth = false;
            state.token = "";
        }
    },
    extraReducers: builder =>{
        builder
        .addCase(register.fulfilled, (state, action) =>{
            state.token = action.payload.token;
        })
        .addCase(register.rejected, (state, action)=>{
            state.isAuth = false;
            state.token = "";
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.isAuth = true;
            state.token = action.payload;
        })
        .addCase(login.rejected, (state, action)=>{
            state.isAuth = false;
            state.token = "";
        })
        .addCase(getUser.fulfilled, (state, action)=>{
            state.user = {...action.payload};
        })
        .addCase(getUser.rejected, (state, action)=>{
            state.isAuth = false;
            state.token = "";
            state.user = null;
        })
    }
})

export const register = createAsyncThunk('auth/register', async ({name, email, password}, thunkAPI) =>{
    try {
        let newUser = {name, email, password}
        const res = await api.post('/user', newUser);
        if(res.status !== 200) return thunkAPI.rejectWithValue();
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
})

export const login = createAsyncThunk('auth/login', async ({email, password},thunkAPI) =>{
    try {
        const res = await api.post('/auth', {email, password});
        if(res.status !== 200) return thunkAPI.rejectWithValue();
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
})

export const getUser = createAsyncThunk('auth/user', async (thunkAPI) =>{
    try {
        const res = await api.get('/auth');
        if(res.status !== 200) return thunkAPI.rejectWithValue();
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
})

export const {logout_auth} = authSlice.actions;

export default authSlice.reducer;