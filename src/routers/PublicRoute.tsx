import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

interface PublicRouteProps {
  children: ReactElement;
}

export const PublicRoute = ({ children } : PublicRouteProps) => {
  const user = useSelector( (state: any) => state.auth );
  const { pathname } = useLocation()
    
  // if (user._id && user.mobile) {
  //   return <Navigate to="/" />
  // } else if (pathname === '/login' && user._id && !user.mobile) {
  //   return <Navigate to="/signup" />
  // }
  return children
}
