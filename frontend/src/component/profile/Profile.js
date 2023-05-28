import {Fragment, React, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getProfile, updateProfile } from '../../reducers/profileReducer'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

import '../../css/General.css'
import '../../css/Form.css'
import Educations from '../additionalComponentEdits/Educations';
import Experiences from '../additionalComponentEdits/Experiences';

 const Profile = () =>{
    const [form, setForm] = useState({
        company: '',
        website: '',
        location: '',
        position: 'Student',
        skills: '',
        bio: '',
        github:'',
        social: {
            youtube:"",
            twitter:"",
            linkedin:""
        },
        experience:[],
        education:[]
    });

    const [showSocials, setSocials] = useState(false)
    const [showExp, setExp] = useState(false)
    const [showEdu, setEdu] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadedProfile = useSelector(state => state.profile.profile) 

    const handleInput = key =>(e) =>{
        console.log(key);
        // console.log(e)
        if(!key){
            setForm(prev => ({
                ...prev,
                [e.target.name]: e.target.value,
            }))
        }else{
            setForm(prev => ({
                ...prev,
                [key]:{
                    ...prev[key],
                    [e.target.name]: e.target.value
                }
            }))
        }
        // console.log(userContent)
    }
    const addEducation = (edu) =>{
        setForm(prev =>({
            ...prev,
            education: prev.education===undefined? [edu]:[...prev.education, edu]
        }))
    }
    const updateEducation = (id, e) =>{
        console.log(e,id)
        setForm(prev =>({
            ...prev,
            education: prev.education.map(edu => {
                console.log(edu)
                return (edu?.index === id ? 
                    {
                        ...edu,
                        [e.target.name]:e.target.value
                    } 
                    : 
                    edu)})
        }))
    }

    const addExperience = (exp) =>{
        setForm(prev =>({
            ...prev,
            experience: prev.experience===undefined? [exp]:[...prev.experience, exp]
        }))
    }
    const updateExperience = (id, e) =>{
        console.log(e,id)
        setForm(prev =>({
            ...prev,
            experience: prev.experience.map(exp => {
                console.log(exp)
                return (exp?.index === id ? 
                    {
                        ...exp,
                        [e.target.name]:e.target.value
                    } 
                    : 
                    exp)})
        }))
    }

    const submit = async (e) =>{
        e.preventDefault();
        console.log(form)
        try {
            let profile = await dispatch(updateProfile(form)).unwrap()
            console.log(profile)
            navigate('/main')
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        console.log(loadedProfile)
        setForm({...loadedProfile})
    }, [loadedProfile])

    useEffect(()=>{
        setForm(prev => 
            ({...prev, position: 'Student'}))
    }, [])

  return (
    <div className='body-class container'>
        <div>Profile</div>
        <div className='container body-class'>
            <div className='form'>
                <form onSubmit={submit}>
                    <div className='formelement'>
                        {/* <label>Email</label> */}
                        <input className='input'
                            required
                            type='text'
                            name='company'
                            placeholder='Company'
                            value={form.company}
                            onChange={handleInput()}
                        />
                    </div>
                    <div className='formelement'>
                        {/* <label>Message</label> */}
                        <input className='input'
                            required    
                            name='location'
                            placeholder='Location'
                            value={form.location}
                            onChange={handleInput()}
                        />
                    </div>
                    <select className='formelement' name = 'position' value={form.position} onChange={handleInput()}>
                        <option value="Student">Student</option>
                        <option value="Junior Software Developer">Junior Software Developer</option>
                        <option value="Senior Software Developer">Senior Software Developer</option>
                    </select>
                    <div className='formelement'>
                        {/* <label>Message</label> */}
                        <input className='input'
                            required    
                            name='website'
                            placeholder='Website'
                            value={form.website}
                            onChange={handleInput()}
                        />
                    </div>
                    <div className='formelement'>
                        {/* <label>Message</label> */}
                        <input className='input'    
                            name='github'
                            placeholder='Github Link'
                            value={form.github}
                            onChange={handleInput}
                        />
                    </div>
                    <div className='formelement'>
                        {/* <label>Message</label> */}
                        <input className='input'
                            required    
                            name='skills'
                            placeholder='Skills comma separated'
                            value={form.skills}
                            onChange={handleInput()}
                        />
                    </div>
                    <div className='formelement'>
                        {/* <label>Message</label> */}
                        <input className='input'
                            required    
                            name='bio'
                            placeholder='Bio'
                            value={form.bio}
                            onChange={handleInput()}
                        />
                    </div>
                    <div style={{display:'flex'}}>
                    <Button style={{marginLeft:'auto'}} variant="outlined" onClick={() => {
                            setSocials(prev => !prev)
                            // setExp(false)
                            // setEdu(false)
                            }}>
                            {showSocials? "Hide Socials" : "Show Socials"}
                    </Button>
                    </div>
                    {showSocials? 
                        <>
                            <div className='formelement'>
                            {/* <label>Message</label> */}
                            <input className='input'
                                    
                                name='youtube'
                                placeholder='Youtube'
                                value={form.social?.youtube}
                                onChange={handleInput('social')}
                            />
                            </div>
                            <div className='formelement'>
                                {/* <label>Message</label> */}
                                <input className='input'
                                    
                                    name='twitter'
                                    placeholder='Twitter'
                                    value={form.social?.twitter}
                                    onChange={handleInput('social')}
                                />
                            </div>
                            <div className='formelement'>
                                {/* <label>Message</label> */}
                                <input className='input'
                                    
                                    name='linkedin'
                                    placeholder='Linkedin'
                                    value={form.social?.linkedin}
                                    onChange={handleInput('social')}
                                />
                            </div>
                        </>
                    :
                    <Fragment></Fragment>}
                    <div style={{display:'flex'}}>
                        <Button style={{marginLeft:'auto'}} variant="outlined" onClick={() => {
                                setEdu(prev => !prev)
                                // setSocials(false)
                                // setExp(false)
                                }}>
                                {showEdu? "Hide Educations" : "Show Educations"}
                        </Button>
                    </div>
                    {showEdu?<Educations educations={form.education} addEducation={addEducation} updateEducation={updateEducation}/>:<Fragment></Fragment>}
                    <div style={{display:'flex'}}>
                    <Button style={{marginLeft:'auto'}} variant="outlined" onClick={() => {
                            setExp(prev => !prev)
                            // setSocials(false)
                            // setEdu(false)
                            }}>
                            {showExp? "Hide Experiences" : "Show Experiences"}
                    </Button>
                    </div>
                    {showExp?<Experiences experiences={form.experience} addExperience={addExperience} updateExperience={updateExperience}/>:<></>}

                    <input type='submit' value="Save Profile" className="submit"/>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Profile
  