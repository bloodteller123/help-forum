import {Fragment, React, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getProfile } from '../reducers/profileReducer'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';
import api from '../api'
import EducationTable from './tables/EducationTable'
import ExperienceTable from './tables/ExperienceTable';

import '../css/General.css'

const Main = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const profile = useSelector(state => state.profile.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    (async() =>{
      try {
        if(!profile?.skills) await dispatch(getProfile()).unwrap();
      } catch (error) {
        console.log(error)
      }
    })();
  }, [])

  const redirect = () =>{
    navigate('/profile');
  }

  // https://stackoverflow.com/questions/51116747/react-router-link-vs-redirect-vs-history
  return (
    <div className='body-class'>
      <div>Profile</div>
      {profile.skills!=null? 
        <div>
          <Button variant="outlined" onClick={() => navigate('/profile/edit')}>Edit Personal Profile</Button>
          {/* <Button variant="outlined" onClick={() => navigate('/profile/addInfo')}>Add Additional Info</Button> */}
          <EducationTable educations={profile.education}/>
          <ExperienceTable experiences={profile.experiences}/>
        </div>
      :
      <div>
        <h3>You don't have anything to show, go create your personal profile to join the discussion!</h3>
        <Button variant="outlined" onClick={redirect}>Create Personal Profile</Button>
      </div>
      }
    </div>
  )
}

export default Main