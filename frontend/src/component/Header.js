import {Fragment, React} from 'react'

import "../css/Header.css"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from "react-router-dom";
import { logout_auth } from '../reducers/authReducer'
import { logout_profile } from '../reducers/profileReducer'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const Header = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.auth.isAuth)
    const user = useSelector(state => state.auth.user)


    return (
        <nav className='header'>
            <Link to='/' className='name'>Help</Link>
            <ul>
                {
                    isAuth && user?._id ?
                    <Fragment>
                        <li><Link to='/main'>Main</Link></li>
                        <li><Link to='/profiles'>Users</Link></li>
                        <li><Link to='/posts'>Posts</Link></li>
                        <li onClick={()=>{
                        dispatch(logout_profile())
                        dispatch(logout_auth())
                        localStorage.clear()
                        navigate('/')
                        }} >
                        <FontAwesomeIcon icon={faRightFromBracket} >
                            
                        </FontAwesomeIcon>
                        Log out
                        </li>
                    </Fragment>
                    :
                    <Fragment>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/profiles'>Users</Link></li>
                        <li><Link to='/login'>Log in</Link></li>
                        <li><Link to='/signup'>Sign up</Link></li>
                    </Fragment>
                }

            </ul>
        </nav>
    )
}

export default Header