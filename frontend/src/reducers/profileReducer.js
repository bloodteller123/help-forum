import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../api'

const profileReducer = createSlice({
    name: 'profile',
    initialState:{
        profile: {},
        profiles: [],
        githubrepos:[],
        errors: {},
        user: null
    },
    reducers:{
        logout_profile (state, action){
            state.profile = {}
            state.profiles = [];
            state.githubrepos = [];
            state.errors = {};
        }
    },
    extraReducers(builder){
        builder
        .addCase(getProfile.fulfilled, (state, action) =>{
            state.profile = {...action.payload};
        })
        .addCase(getProfiles.fulfilled, (state, action) =>{
            state.profiles = [...action.payload];
        })
        .addCase(getProfileById.fulfilled, (state, action) =>{
            state.profile = {...action.payload};
        })
        .addCase(getGithubRepos.fulfilled, (state, action) =>{
            state.githubrepos = [...action.payload];
        })
        .addCase(updateProfile.fulfilled, (state, action) =>{
            state.profile = {...action.payload};
        })
        .addCase(deleteExp.fulfilled, (state, action) =>{
            state.profile = {...action.payload};
        })
        .addCase(deleteEdu.fulfilled, (state, action) =>{
            state.profile = {...action.payload};
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

export const getProfile = createAsyncThunk('profile/me', async (thunkAPI) =>{
    try {
        let profile = await api.get('/profile/me');
        console.log(profile)
        if(profile.status!==200) return thunkAPI.rejectWithValue(profile.data);
        return profile.data;
    } catch (error) {
        console.log(error.response)
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getProfileById = createAsyncThunk('profile/user', async (id, thunkAPI) =>{
    try {
        let profile = await api.get(`/profile/${id}`);
        console.log(profile)
        if(profile.status!==200) return thunkAPI.rejectWithValue(profile.data);
        return profile.data;
    } catch (error) {
        console.log(error.response)
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getProfiles = createAsyncThunk('profile/profilesList', async (thunkAPI) =>{
    try {
        let profile = await api.get('/profile/profilesList');
        console.log(profile)
        if(profile.status!==200) return thunkAPI.rejectWithValue(profile.data);
        return profile.data;
    } catch (error) {
        console.log(error.response)
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getGithubRepos = createAsyncThunk('profile/github', async (githubname, thunkAPI) =>{
    try {
        let repos = await api.get(`/profile/github/${githubname}`);
        console.log(repos)
        if(repos.status!==200) return thunkAPI.rejectWithValue(repos.data);
        return repos.data;
    } catch (error) {
        console.log(error.response)
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateProfile = createAsyncThunk('profile/', async (data, thunkAPI) =>{
    try {
        let profile = await api.post('/profile', data);
        if(profile.status!==200) return thunkAPI.rejectWithValue(profile.data);
        return profile.data;
    } catch (error) {
        console.log(error.response)
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const deleteEdu = createAsyncThunk('profile/edu', async (id, thunkAPI) =>{
    try {
        let profile = await api.delete(`/profile/deleteEdu/${id}`);
        console.log(profile)
        if(profile.status!==200) return thunkAPI.rejectWithValue(profile.data);
        return profile.data;
    } catch (error) {
        console.log(error.response)
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const deleteExp = createAsyncThunk('profile/exp', async (id, thunkAPI) =>{
    try {
        let profile = await api.delete(`/profile/deleteExp/${id}`);
        if(profile.status!==200) return thunkAPI.rejectWithValue(profile.data);
        return profile.data;
    } catch (error) {
        console.log(error.response)
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const {logout_profile} = profileReducer.actions;

export default profileReducer.reducer;