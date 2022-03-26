import * as WorkspaceAPI from '../api/workspaces'
import { types } from "../types/types";

export const startLoadWorkspaces = () => {
  return async (dispatch, getState) => {
    try {
      const { workspace } = getState()
      if(!workspace.active) {
        dispatch(startLoading());
      }
      const { body: workspaces } = await WorkspaceAPI.getWorkspaces()

      dispatch(setWorkspaces(workspaces));
      if (!workspace.active) {
        dispatch(setActiveWorkspace(workspaces[0]));
        dispatch(finishLoading());
      }
    } catch (error) {
      console.log(error)
    }
  };
};

export const setWorkspaces = (workspaces) => ({
  type: types.workspaceLoad,
  payload: [...workspaces]
})

export const setActiveWorkspace = (workspace) => ({
  type: types.workspaceSetActive,
  payload: workspace
})

export const startLoading = () => ({
  type: types.workspaceStartLoading
})

export const finishLoading = () => ({
  type: types.workspaceFinishLoading
})
