import { types } from "../types/types";
import API from '../api/user'
import { finishLoading, startLoading, setError, setInfo } from "./ui";
import axios from "axios";
import { notification } from "antd";
import { fbProvider, firebase, googleProvider } from "../firebase/firebase-config";

export const startPreSignup = (values) => {
  return async (dispatch) => {
    try {
      dispatch( startLoading() );
      const payload = {
        ...values,
        appVersion: '1.0',
        deviceType: 'WEB'
      }
      const { data: user } = await API.signup(payload)
      dispatch(preSignup(user));
    } catch (error) {
      console.log(error)
      dispatch(setError(error.response.data.message))
    } finally {
      dispatch( finishLoading() );
    }
  };
};

export const startSocialSignup = (values) => {
  return async (dispatch) => {
    try {
      dispatch( startLoading() );
      const { body: user } = await API.updateUser(values)
      dispatch(preSignup(user));
    } catch (error) {
      console.log(error)
      dispatch(setError(error.response.data.message))
    } finally {
      dispatch( finishLoading() );
    }
  };
};

export const startLoginEmailPassword = (email, password) => {
  return async (dispatch) => {
    try {

      dispatch( startLoading() );
      const { data: user } = await API.login({ email, password })
      dispatch(login(user));
    } catch (error) {
      console.log(error)
      dispatch(setError(error.response.data.message))
    } finally {
      dispatch( finishLoading() );
    }
  };
};

export const startValidateEmail = (email) => {
  return async (dispatch) => {
    try {
      dispatch( startLoading() );
      const { data: exist } = await API.validateEmail({ email })
      dispatch(validateEmail(exist));
    } catch (error) {
      console.log(error)
      dispatch(validateEmail(false));
    } finally {
      dispatch( finishLoading() );
    }
  };
};

export const startSocialLogin = (provider) => {
  return async (dispatch) => {
    dispatch(startLoading())
    firebase.auth()
      .signInWithPopup( provider === 'facebook' ? fbProvider : googleProvider )
      .then( async ({ additionalUserInfo: { profile }, credential }) => {
        const payload = {
          name: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          role: 'business',
          deviceType: 'WEB',
          socialType: provider.charAt(0).toUpperCase() + provider.slice(1),
          socialID: profile.id,
          accessToken: credential.accessToken,
          image: {
            thumbnail: profile.picture,
            original: profile.picture
          }
        }
        const { data: user } = await API.verifySocialLogin(payload)
        dispatch(login(user))
      })
      .catch((e) => {
        dispatch(setError(e.message))
      })
      .finally(() => dispatch(finishLoading()));
  }
}

export const startForgotPassword = (email) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { message } = await API.forgotPassword({ email })
      dispatch(setInfo(message));
    } catch (error) {
      console.log(error)
      dispatch(setError(error.response.data.message));
    } finally {
      dispatch(finishLoading());
    }
  };
};

export const startResetPassword = (newPassword, passwordResetToken) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data: message } = await API.resetPassword({ newPassword, passwordResetToken })
      notification.success({
        message,
        duration: 2.5,
        onClose: () => {
          // eslint-disable-next-line no-restricted-globals
          location.replace('/login')
        }
      })
    } catch (error) {
      console.log(error)
      dispatch(setError(error.response.data.message));
    } finally {
      dispatch(finishLoading());
    }
  };
};

export const preSignup = (user) => ({
  type: types.preSignup,
  payload: { userRegistered: user, mustAnswerQuestion: true }
})

export const signup = () => ({
  type: types.signup
})

export const validateEmail = (exist) => ({
  type: types.validateEmail,
  payload: exist
})

export const login = (user) => ({
  type: types.login,
  payload: { ...user },
});

export const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('workspace')
  delete axios.defaults.headers.common['authorization']
  return {
    type: types.logout
  }
}