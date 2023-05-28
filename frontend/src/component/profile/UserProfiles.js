import {React, useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { getProfile, getProfiles } from '../../reducers/profileReducer';
import UserProfileCard from './UserProfileCard';

import '../../css/General.css'
const UserProfiles = () =>{
    const dispatch = useDispatch();
    const profiles = useSelector(state => state.profile.profiles)
    const isAuth = useSelector(state => state.auth.isAuth)
    useEffect(()=>{
        (async ()=>{
            try {
                await dispatch(getProfiles()).unwrap();
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    return (
        <div>
            {profiles.length < 1? <p>Congratulation! You are the first user.</p>
            :
                <div className='body-class'>
                    {profiles.map(profile =>{
                        return <UserProfileCard key={profile._id} auth={isAuth} profile={profile}/>
                    })}
                </div>
            }
        </div>
    )
}

export default UserProfiles;