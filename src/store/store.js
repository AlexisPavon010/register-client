import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { workspaceReducer } from '../reducers/workspaceReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const userData = JSON.parse( localStorage.getItem('user') ) || { emailExist: null }
// const workspaceData = JSON.parse( localStorage.getItem('workspace') ) || { }
// const initialData = {
//   auth: {
//     ...userData
//   },
//   workspace: {
//     ...workspaceData
//   }
// };

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  workspace: workspaceReducer
});

export const store = createStore(
  reducers,
  // initialData,
  composeEnhancers(
    applyMiddleware( thunk )
  )
);