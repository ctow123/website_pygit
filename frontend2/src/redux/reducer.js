// actions are plain javascript objects, must have a type that is a string const
// describing the action being performed

const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

// action to send login request and dispatch our actions
// action sets login states and then simulates API call
// to initiate a dispatch pass it an action creator
export function login(email, password) {
  console.log("hi");
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
console.log("in the tick ");
    callLoginApi(email, password, error => {
      dispatch(setLoginPending(false));
      if (!error) {
        dispatch(setLoginSuccess(true));
      } else {
        dispatch(setLoginError(error));
      }
    });
  }
}
// bound action creators automatically dispatch
// ex. const boundAddTodo = text => dispatch(addTodo(text))

// action creators -> fcn that create actions ... they return an action
function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

export function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}
export function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}


function callLoginApi(email, password, callback) {
  setTimeout(() => {
    if (email === 'admin@example.com' && password === 'admin') {
      return callback(null);
    } else {
      return callback(new Error('Invalid email and password'));
    }
  }, 1000);
}

// the reducer, fcn that makes the change to redux store
// reducers specify how app state changes in response to actions sent to store
// reducers take previous state and action as params and returns next state

// object.assign copies state param modifies it and returns new state
export default function reducer(state = {
  // isLoginSuccess: false,
  // isLoginPending: false,
  // loginError: null
}, action) {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
      });

    default:
      return state;
  }
}
