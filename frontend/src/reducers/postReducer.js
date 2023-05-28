import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import api from "../api";
const postReducer = createSlice({
    name: 'post',
    initialState:{
        posts: [],
        post: {},
        errors: {}
    },
    reducers:{},
    extraReducers: builder=>{
        builder
        .addCase(getPostsByBatches.fulfilled, (state, action) =>{
            if(action.payload.batch==='0') state.posts = [...action.payload.posts]
            else state.posts = [...state.posts, ...action.payload.posts]
        })
        .addCase(postComment.fulfilled, (state, action) =>{
            state.post = {...action.payload}
            state.posts = state.posts.map(post => {
                if(post._id === action.payload._id) return action.payload;
                else return post;
            })
        })
        .addCase(upvoteComment.fulfilled, (state, action) =>{
            state.post = {...action.payload}
            state.posts = state.posts.map(post => {
                if(post._id === action.payload._id) return action.payload;
                else return post;
            })
        })
        .addCase(downvotePost.fulfilled, (state, action) =>{
            state.post = {...action.payload}
            state.posts = state.posts.map(post => {
                if(post._id === action.payload._id) return action.payload;
                else return post;
            })
        })
        .addCase(addPost.fulfilled, (state,action) =>{
            state.posts = [action.payload.post, ...state.posts]
        })
        .addMatcher(
            // https://redux-toolkit.js.org/api/createReducer#builderaddmatcher
            // matcher can be defined inline as a type predicate function
            (action) => action.type.endsWith('/rejected'),
            (state, action) => {
                console.log(action)
                state.errors = {...action.error}
            }
        )
    }
})

// export const getAllPosts = createAsyncThunk('posts/postList', async(thunkAPI) =>{
//     try {
//         let posts = await api.get('/post');
//         console.log(posts);
//         if(posts.status!==200) return thunkAPI.rejectWithValue(posts.data);
//         return posts.data;
//     } catch (error) {
//         console.log(error);
//         return thunkAPI.rejectWithValue(error.response.data);
//     }
// })

export const getPostsByBatches = createAsyncThunk('posts/postList', async(batch,thunkAPI) =>{
    try {
        let res = await api.get('/post',  {
            params: {
              batch
            }
          });
        console.log(res);
        if(res.status!==200) return thunkAPI.rejectWithValue(res.data.posts);
        return res.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const postComment = createAsyncThunk('posts/comment', async ({id, data}, thunkAPI) => {
    try {
        console.log(data)
        let post = await api.post(`/post/comment/${id}`, data);
        console.log(post);
        if(post.status!==200) return thunkAPI.rejectWithValue(post.data);
        return post.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const upvoteComment = createAsyncThunk('posts/upvote', async (id, thunkAPI) => {
    try {
        let post = await api.put(`/post/upvote/${id}`);
        console.log(post);
        if(post.status!==200) return thunkAPI.rejectWithValue(post.data);
        return post.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const downvotePost = createAsyncThunk('posts/downvote', async (id, thunkAPI) => {
    try {
        let post = await api.put(`/post/downvote/${id}`);
        console.log(post);
        if(post.status!==200) return thunkAPI.rejectWithValue(post.data);
        return post.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const addPost = createAsyncThunk('posts/add', async (data, thunkAPI) =>{
    try {
        let post = await api.post('/post', data);
        console.log(post);
        if(post.status!==200) return thunkAPI.rejectWithValue(post.data);
        return post.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export default postReducer.reducer;