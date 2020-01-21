import axios from "axios";
import { updateDB, getFavorites } from "../firebase";
// Constants
let initialData = {
  fetching: false,
  array: [],
  current: {},
  favorites: []
};
let URL = "https://rickandmortyapi.com/api/character";
let GET_CHARACTERS = "GET_CHARACTERS";
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";

let REMOVE_CHARACTER = "REMOVE_CHARACTER";
let ADD_TO_FAVORITE = "ADD_TO_FAVORITE";

let GET_FAVORITES = "GET_FAVORITES";
let GET_FAVORITES_SUCCESS = "GET_FAVORITES_SUCCESS";
let GET_FAVORITES_ERROR = "GET_FAVORITES_ERROR";

// Reducers
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case REMOVE_CHARACTER:
      return { ...state, array: action.payload };

    case GET_CHARACTERS:
      return { ...state, fetching: true };
    case GET_CHARACTERS_ERROR:
      return { ...state, error: action.payload, fetching: false };
    case GET_CHARACTERS_SUCCESS:
      return { ...state, array: action.payload, fetching: false };
    case ADD_TO_FAVORITE:
      return {
        ...state,
        array: action.payload.array,
        favorites: action.payload.favorites,
        fetching: false
      };
    case GET_FAVORITES:
      return { ...state, fetching: true };
    case GET_FAVORITES_SUCCESS:
      return { ...state, favorites: action.payload, fetching: false };
    case GET_FAVORITES_ERROR:
      return { ...state, error: action.payload, fetching: false };
    default:
      return state;
  }
}

// Action (o thunk)
export const addToFavoritesAction = () => (dispatch, getState) => {
  let { array, favorites } = getState().characters;
  let { uid } = getState().users;
  let character = array.shift();
  favorites.push(character);
  updateDB(favorites, uid);
  dispatch({
    type: ADD_TO_FAVORITE,
    payload: { array: [...array], favorites: [...favorites] }
  });
};

// Action (o thunk)
export const removeCharactersAction = () => (dispatch, getState) => {
  let { array } = getState().characters;
  array.shift();
  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...array]
  });
};

// Action (o thunk)
export const retrieveFavorites = () => (dispatch, getState) => {
  dispatch({
    type: GET_FAVORITES
  });
  let { uid } = getState().users;
  return getFavorites(uid)
    .then(array => {
      dispatch({
        type: GET_FAVORITES_SUCCESS,
        payload: [...array]
      });
    })
    .catch(e => {
      console.log(e);
      dispatch({
        type: GET_FAVORITES_ERROR,
        payload: e.message
      });
    });
};

// Action (o thunk)
export const getCharactersAction = () => (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTERS
  });
  return axios
    .get(URL) // la info viene en res.data.results
    .then(res => {
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: res.data.results
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_CHARACTERS_ERROR,
        payload: err.response.message
      });
    });
};
