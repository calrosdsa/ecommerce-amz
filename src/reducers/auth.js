import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  GET_LOCATION,
} from '../actions/types';

const user = JSON.parse(localStorage.getItem('user'))
const userLocation = JSON.parse(localStorage.getItem('userLocation'))


const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: user? user: {},
  userLocation: userLocation? userLocation:{}
};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LOCATION:
      return{
        ...state,
        userLocation: payload,
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.key);
      return {
        ...state, 
        token: payload.key,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
      };
    case ACCOUNT_DELETED:
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
