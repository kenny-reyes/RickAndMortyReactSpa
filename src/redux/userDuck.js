import { logWithGoogle, signOutGoogle } from "../firebase";
import { retrieveFavorites } from "./charsDuck";
// constants
let initialData = {
  loggedIn: false,
  fetching: false
};
let LOGIN = "LOGIN";
let LOGIN_SUCCESS = "LOGIN_SUCCESS";
let LOGIN_ERROR = "LOGIN_ERROR";

let LOG_OUT = "LOG_OUT";

// reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, fetching: true };
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, ...action.payload, loggedIn: true };
    case LOG_OUT:
      return { ...initialData };
    case LOGIN_ERROR:
      return { ...state, fetching: false, ...action.payload };
    default:
      return state;
  }
}

export let doLogOutAction = () => (dispatch, getState) => {
  signOutGoogle();
  dispatch({
    type: LOG_OUT
  });
  localStorage.removeItem("storage");
};

//aux function
function saveStorage(storage) {
  localStorage.storage = JSON.stringify(storage);
}

export let restoreSessionAction = () => dispatch => {
  let storage = localStorage.getItem("storage");
  storage = JSON.parse(storage);
  if (storage && storage.users) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: storage.users
    });
  }
};

// actions or actions creator
export let doGoogleLogAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN
  });
  return logWithGoogle()
    .then(user => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }
      });
      saveStorage(getState());
      retrieveFavorites()(dispatch, getState);
    })
    .catch(e => {
      console.log(e);
      dispatch({
        type: LOGIN_ERROR,
        payload: e.message
      });
    });
};
