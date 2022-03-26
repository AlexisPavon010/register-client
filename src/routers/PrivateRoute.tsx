import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactElement;
}

export const PrivateRoute = ({ children } : PrivateRouteProps) => {
  // const { auth: user, workspace: { workspaces }} = useSelector( (state: any) => state );
  const { pathname } = useLocation()

  // if(!user._id) {
  //   return <Navigate to="/login" />
  // } else if (!user.mobile) {
  //   // The mobile is necessary for the picker backend to work.
  //   return <Navigate to="/signup" />
  // } else if (!workspaces) {
  //   // Waiting for workspaces loading
  //   return <div>...is loading</div>
  // } else if (workspaces.length === 0 && pathname !== '/create-workspace'){
  //   return <Navigate to="/create-workspace" />
  // }
  return children
}
