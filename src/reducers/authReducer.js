import { types } from "../types/types";

const initialState = {
  emailExist: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.validateEmail:
      return {
        emailExist: action.payload
      };

    case types.preSignup:
      return {
        ...state,
        ...action.payload
      };

    case types.signup:
      const newState = { ...state, ...state.userRegistered }
      delete newState.userRegistered
      return {
        ...newState
      };

    case types.login:
      return {
        ...state,
        ...action.payload
      };

    case types.logout:
      return initialState;

    default:
      return state;
  }
};
