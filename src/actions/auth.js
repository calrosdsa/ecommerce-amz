import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  GET_LOCATION,
  
} from './types';
import { setAlert } from './alert';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
const URL_DEPLOY = 'https://amazon-cln.herokuapp.com/'

// Register User
export const get_location = (latitude,longitude) => async (dispatch,getState)=>{

  const res = await axios.post(`${URL_DEPLOY}store/address/`,{latitude,longitude})
  console.log(res.data)
  dispatch({
    type: GET_LOCATION,
    payload:res.data,
  })
  localStorage.setItem('userLocation' , JSON.stringify(getState().auth.userLocation))
}

export const loadUser = () => async (dispatch,getState) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); // for global axios request header
  } // if there is a token in the local storage then set it setAuthToken function to set in every request

    const res = await axios.get(`${URL_DEPLOY}auth/user/`);
    // authenticate users in the backend. If there is a token available, the backend sends user infor as a response
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  localStorage.setItem('user', JSON.stringify(getState().auth.user))
};


export const register =
  ({ username, email, password1, password2 }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ username, email, password1, password2 });

    try {
      const res = await axios.post(
        `${URL_DEPLOY}auth/register/`,{ username, email, password1, password2 }
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      setTimeout(() => {
        dispatch(loadUser());
      }, 500);
  //    setTimeout(() => {
    //    dispatch(loadUser());
      //}, 500);
      dispatch(
        setAlert('Account successfully registered. Welcome!', 'success')
      );
    } catch (err) {
      const errors = err.response.data.errors;
      dispatch(
        setAlert(
          'Oops! Something went terribly wrong. Please try reloading the page.',
          'danger'
        )
      );
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login User


export const login = (email, password) => async (dispatch,history) => {
  
  const body = JSON.stringify();
  //We use axios to send a post request to /api/users to register.
  //The register action takes in the response from the '/api/users' backend using the post method and store it in the res variable
  try {
    const res = await axios.post(`${URL_DEPLOY}auth/login/`, { email, password });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    setTimeout(() => {
      dispatch(loadUser());
    }, 500);
    history.push('/')
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(
      setAlert(
        "Oops! The username or password doesn't seem to match. Please try again.",
        'danger'
      )
    );
    if (errors) {
      errors.forEach((error) =>
        dispatch(
          setAlert(
            "Oops! The username or password doesn't seem to match. Please try again.",
            'danger'
          )
        )
      );
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
  
};