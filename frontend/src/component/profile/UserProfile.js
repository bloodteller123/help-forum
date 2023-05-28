import {React, useEffect, useState} from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { getProfileById } from '../../reducers/profileReducer';
import { useParams } from 'react-router-dom';
import UserProfileCard from './UserProfileCard';
import UserPosts from './UserPosts';

import '../../css/General.css'
const UserProfile = () =>{
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile);
    const allPosts = useSelector(state => state.posts.posts);
    const [posts, setPosts] = useState([])
    const {id} = useParams()

    useEffect(()=>{
        (async () =>{
            try {
                let profile = await dispatch(getProfileById(id)).unwrap()
                console.log(profile)

                let p = allPosts.filter(po => po.user._id === id);
                setPosts([...p])
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])


    return (
        <div className='body-class'>
            <UserPosts posts={posts} id={id}/>
        </div>
    )
}

export default UserProfile;