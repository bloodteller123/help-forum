import React from 'react'
import { Navigate, Outlet, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

const PrivateRoutes= () => {
    const location = useLocation();
    const isAuth = useSelector(state => state.auth.isAuth)

    if (isAuth === undefined) {
      return null; // or loading indicator/spinner/etc
    }
  
    return isAuth 
      ? <Outlet />
      : <Navigate to="/login" replace state={{ from: location }} />;
}

export default PrivateRoutes