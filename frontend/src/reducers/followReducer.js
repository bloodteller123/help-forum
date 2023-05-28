import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import api from '../api'

const followReducer = createSlice({
    name: 'auth',
    initialState:{
        followings:[],
        followers:[],
        error: {}
    },
    reducers:{},
    extraReducers: builder =>{
        builder
        .addCase(follow.fulfilled, (state, action) =>{
            state.followings = [...state.followings, action.payload.master]
        })
        .addCase(unfollow.fulfilled, (state,action) =>{
            state.followings = state.followings.filter(f => f.master._id !== action.payload.master._id);
        })
        .addCase(getFollowings.fulfilled, (state,action) =>{

        })
        .addMatcher(
            // https://redux-toolkit.js.org/api/createReducer#builderaddmatcher
            // matcher can be defined inline as a type predicate function
            (action) => action.type.endsWith('/rejected'),
            (state, action) => {
                console.log(action)
                state.error = {...action.error}
            }
        )
    }
})

export const follow = createAsyncThunk('follow/add', async (id, thunkAPI) =>{
    try {
        let following = await api.post('/follow',{id});
        console.log(following);
        if(following.status!==200) return thunkAPI.rejectWithValue(following.data);
        return following.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const unfollow = createAsyncThunk('follow/del', async (master_id, thunkAPI) =>{
    try {
        let following = await api.delete(`/unfollow/${master_id}`);
        console.log(following);
        if(following.status!==200) return thunkAPI.rejectWithValue(following.data);
        return following.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const getFollowings = createAsyncThunk('follow/followings', async (thunkAPI) =>{
    try {
        let following = await api.get('/follow/followings');
        console.log(following);
        if(following.status!==200) return thunkAPI.rejectWithValue(following.data);
        return following.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const getFollowers = createAsyncThunk('follow/followers', async (thunkAPI) =>{
    try {
        let following = await api.get('/follow/followers');
        console.log(following);
        if(following.status!==200) return thunkAPI.rejectWithValue(following.data);
        return following.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export default followReducer.reducer;