import { Fragment } from 'react';
import './App.css';
import Header from './component/Header';
import {Home} from './component/Home'
import Login from './component/auth/Login'
import Signup from './component/auth/Signup'
import Main from './component/Main';
import PrivateRoutes from './component/PrivateRoutes';
import Profile from './component/profile/Profile';
import UserProfiles from './component/profile/UserProfiles';
import UserProfile from './component/profile/UserProfile';
import Posts from './component/post/Posts';

import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'

function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Header/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/profiles' element={<UserProfiles/>}/>
          <Route path="/" element={<PrivateRoutes />} >
            <Route path='/main' element={<Main/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/profile/edit' element={<Profile/>}/>
            <Route path = '/posts' element={<Posts/>}/>
            <Route path='/profile/user/:id' element={<UserProfile/>}/>
          </Route>
          
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
