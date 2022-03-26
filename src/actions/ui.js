import { types } from '../types/types';

export const setError = ( err ) => ({
  type: types.uiSetError,
  payload: err
});

export const removeError = () => ({
  type: types.uiRemoveError
});

export const setInfo = ( info ) => ({
  type: types.uiSetInfo,
  payload: info
});

export const removeInfo = () => ({
  type: types.uiRemoveInfo
});

export const startLoading = () => ({
  type: types.uiStartLoading
})

export const finishLoading = () => ({
  type: types.uiFinishLoading
})
