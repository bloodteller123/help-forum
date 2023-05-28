import { configureStore } from '@reduxjs/toolkit'
import authR from './reducers/authReducer'
import profileR from './reducers/profileReducer'
import postR from './reducers/postReducer'
import followReducer from './reducers/followReducer'
export default configureStore({
    reducer:{
        auth: authR,
        profile: profileR,
        // useSelector(state => state.<?>.states), <?> would be whatever name used here.
        // so in this case it'd be state.posts.... not state.post....
        posts: postR,
        follow: followReducer
    }
})