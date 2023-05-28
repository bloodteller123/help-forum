import {React, useEffect, useState} from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile, getProfiles } from '../../reducers/profileReducer';
import { unfollow, follow} from '../../reducers/followReducer';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import '../../css/General.css'
import '../../css/Profile.css'
const UserProfileCard = ({profile, auth}) =>{
    console.log(profile)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const followings = useSelector(state => state.follow.followings)
    const [isFollowed, toggleFollow] = useState(false);

    const stringAvatar = (name) => {
        return {
          children: name.split(' ').length > 1?`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`.toUpperCase() : name.slice(0,1).toUpperCase(),
        };
    }

    const handleFollow = async () =>{
        try {
            if(isFollowed){
                if(window.confirm("Do you want to unfollw this user?")){
                    let f = await dispatch(unfollow(profile.user._id)).unwrap();
                    console.log(f)
                    toggleFollow(false)
                }
            }else{
                await dispatch(follow(profile.user._id)).unwrap();
                toggleFollow(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(followings.some(e => e?._id.toString() === profile.user?._id.toString())){
            toggleFollow(true);
        }
    }, [])

    return (
        <div className='container card-container'>
            <div className="card">
                <Avatar {...stringAvatar(profile.user.name)} />
                <h3>{profile.user.name}</h3>
                <h4>{profile.user.email}</h4>
                {profile.position && profile.company? <h6>{profile.position} at {profile.company}</h6> : <></>}
                <h6>{profile.location}</h6>
                <div className="buttons">
                    <Button variant="outlined" onClick={()=>navigate(`/profile/user/${profile.user._id}`)}>
                        Enter Profile
                    </Button>
                    {auth? <Button style={{backgroundColor:'#03BFCB'}} variant="outlined" onClick={handleFollow}>
                            {isFollowed? "Unfollow" : "Follow"}
                        </Button>
                        :
                        <></>
                    }
                </div>
                <div className="skills">
                    <h6>Skills</h6>
                    <ul>
                       {profile.skills.map((skill, ind) =>(
                            <li key={ind}>{skill}</li>
                       ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserProfileCard;