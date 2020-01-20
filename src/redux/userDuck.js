import { logWithGoogle } from "../firebase";

// constants
let initialData = {
  loggedIn: false,
  fetching: false
};
let LOGIN = "LOGIN";
let LOGIN_SUCCESS = "LOGIN_SUCCESS";
let LOGIN_ERROR = "LOGIN_ERROR";

// reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, fetching: true };
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, ...action.payload, loggedIn: true };
    case LOGIN_ERROR:
      return { ...state, fetching: false, ...action.payload };
    default:
      return state;
  }
}

//aux function
function saveStorage(storage) {
  localStorage.storage = JSON.stringify(storage);
}

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
    })
    .catch(e => {
      console.log(e);
      dispatch({
        type: LOGIN_ERROR,
        payload: e.message
      });
    });
};
