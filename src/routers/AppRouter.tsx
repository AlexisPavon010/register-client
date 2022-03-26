import { Suspense, useEffect } from "react"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
// import ResetPasswordScreen from "../screens/ResetPasswordScreen"
// import ConfirmPassword from "../screens/ConfirmPasswordScreen"
// import LoginScreen from "../screens/LoginScreen"
// import SignupScreen from "../screens/SignupScreen"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"
import { DashboardRouter } from "./DashboardRouter"
// import { startLoadWorkspaces } from "../actions/workspaces"
// import { isEmpty } from "lodash"
import Layout from "../components/Layout"

export const AppRouter = () => {

  // useEffect(() => {
  //   if ( !user._id ) return;

  //   axios.defaults.headers.common.authorization = `Bearer ${user.token}`
  //   localStorage.setItem('user', JSON.stringify(user));
  //   dispatch(startLoadWorkspaces())
  // }, [ user, dispatch ])


  // useEffect(() => {
  //   if ( isEmpty(workspace) ) return;

  //   localStorage.setItem('workspace', JSON.stringify(workspace));
  // }, [ workspace, dispatch ])

  return (
    <Suspense fallback="...is loading">
      <BrowserRouter>
        <Routes>
          {/* <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginScreen />
              </PublicRoute>
            }
          />

          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPasswordScreen />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupScreen />
              </PublicRoute>
            }
          />

          <Route
            path="/confirm-password"
            element={
              <PublicRoute>
                <ConfirmPassword />
              </PublicRoute>
            }
          />
          
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPasswordScreen />
              </PublicRoute>
            }
          /> */}

          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardRouter />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}
