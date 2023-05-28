import {React, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { register } from '../../reducers/authReducer'
import { useNavigate } from 'react-router-dom'
import '../../css/Form.css'
import '../../css/General.css'

import api from '../../api'
import setAuthToken from '../../utils/setAuthToken'


const Signup = () =>{
    const [userContent, setUserContent] = useState({
        name: "",
        email: "",
        password: "",
        passwordval:""
    })
    const dispatch = useDispatch()
    const nav = useNavigate()

    const submit = async (e) =>{
        e.preventDefault();
        if(Object.values(userContent).some((v) => v.length===0)) return
        if(userContent.password!==userContent.passwordval) return;
        console.log(userContent)
        try {
            let r = await dispatch(register({...userContent})).unwrap()
            console.log(r)
            setUserContent({
                name: "",
                email: "",
                password: "",
                passwordval:""
            })   
            // setAuthToken(r)
            localStorage.setItem('token', r.token);
            nav('/login')
        } catch (error) {
            console.log(error)
        }
 
    }

    const handleInput = (e) =>{
        setUserContent(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
        // console.log(userContent)
    }

    return (
    <section className='section' id='contact'>
        <div className='container body-class'>
            <div className='form'>
                <form onSubmit={submit}>
                    <div className='formelement'>
                        {/* <label>Last Name</label> */}
                        <input className='input'
                            required
                            type='text'
                            name='name'
                            placeholder='name'
                            value={userContent.lastName}
                            onChange={handleInput}
                        />
                    </div>
                    <div className='formelement'>
                        {/* <label>Email</label> */}
                        <input className='input'
                            required
                            type='text'
                            name='email'
                            placeholder='Email'
                            value={userContent.email}
                            onChange={handleInput}
                        />
                    </div>
                    <div className='formelement'>
                        {/* <label>Message</label> */}
                        <input className='input'
                            required    
                            name='password'
                            placeholder='password'
                            value={userContent.password}
                            onChange={handleInput}
                        />
                    </div>
                    <div className='formelement'>
                        {/* <label>Message</label> */}
                        <input className='input'
                            required    
                            name='passwordval'
                            placeholder='Confirm password'
                            value={userContent.passwordval}
                            onChange={handleInput}
                        />
                    </div>
                    <input type='submit' value="Sign up" className="submit"/>
                </form>
            </div>
        </div>
    </section>
    )
}

export default Signup