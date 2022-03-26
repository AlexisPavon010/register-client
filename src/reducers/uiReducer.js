import { types } from "../types/types";

const initialState = {
  loading: false,
  msgError: null,
  msgInfo: null,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        msgError: action.payload,
      };

    case types.uiRemoveError:
      return {
        ...state,
        msgError: null,
      };
      
    case types.uiSetInfo:
      return {
        ...state,
        msgInfo: action.payload,
      };

    case types.uiRemoveInfo:
      return {
        ...state,
        msgInfo: null,
      };

    case types.uiStartLoading:
      return {
        ...state,
        msgError: null,
        msgInfo: null,
        loading: true,
      };

    case types.uiFinishLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
