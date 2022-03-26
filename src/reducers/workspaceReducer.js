import { types } from "../types/types";

export const workspaceReducer = (state = {}, action) => {
  switch (action.type) {
    case types.workspaceStartLoading:
      return {
        ...state,
        loading: true,
      };

    case types.workspaceFinishLoading:
      return {
        ...state,
        loading: false,
      };

    case types.workspaceLoad:
      return {
        ...state,
        workspaces: [...action.payload],
      };
    
    case types.workspaceSetActive:
      return {
        ...state,
        active: action.payload
      }

    default:
      return state;
  }
};
