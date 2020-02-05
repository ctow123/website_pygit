/*
 * src/store.js
 * With initialState
 // thunk is middleware for redux and react
*/
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer';

import { parseJwt } from "../pages/fcns.js"

let theuser;
if (typeof localStorage.token !== 'undefined') {
  let temp = parseJwt(localStorage.token);
  theuser = ({ ...temp, authenticated: true });

} else {
  theuser = { authenticated: false };
}

// Without combineReducers() or similar manual code, preloadedState (aka state in createStore) always
// wins over state = ... in the reducer because the state
 // passed to the reducer is preloadedState and is not undefined
const store = createStore(reducer, {isLoginSuccess: false, user: theuser}, applyMiddleware(thunk) );
// ^add logger in applyMiddleware to see state print outs in console for debugging
export default store;


// store with initial state
// export default function configureStore(initialState={}) {
//  return createStore(
//    rootReducer,
//    initialState,
//    applyMiddleware(thunk)
//  );
// }
