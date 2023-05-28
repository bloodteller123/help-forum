import {React, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import '../../css/Form.css'
import '../../css/General.css'
import { login, getUser } from '../../reducers/authReducer'
import api from '../../api'
import setAuthToken from '../../utils/setAuthToken'


const Login = () =>{
    const [userContent, setUserContent] = useState({
        email: "",
        password: ""
    })
    const [show, setShow] = useState(false)
    const [res, setRes] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.auth.isAuth)
    const user = useSelector(state => state.auth.user)
    const submit = async (e) =>{
        e.preventDefault();
        if(Object.values(userContent).some((v) => v.length===0)) return
        console.log(userContent)
        try {
            const token = await dispatch(login({
                ...userContent
            })).unwrap()
            console.log(token);
            // setAuthToken(token)
            localStorage.setItem('token', token.token);
            // there might be some delay for redux broadcasting isAuth value..
            // if(isAuth){
            await dispatch(getUser()).unwrap();
            setUserContent({
                email: "",
                password: "",
                }) 
            // }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() =>{
        if(isAuth && user?._id){
            navigate('/main');
        }
    }, [isAuth, user])

    useEffect(()=>{
        console.log(res)
        if(Object.keys(res).length !== 0){
            setShow(true)
        }
    }, [res])

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
                    <input type='submit' value="Login" className="submit"/>
                </form>
            </div>
        </div>
    </section>
    )
}

export default Login