import axios from "axios";
import { ORDER, SAVE_FOR_LATER, SET_HISTORY } from "./types";

import setAuthToken from '../utils/setAuthToken'


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
const URL_DEPLOY = 'https://amazon-cln.herokuapp.com/'
export const set_orders = (order) =>async(dispatch) =>{
   
   axios.post(`${URL_DEPLOY}order/`,order)
   localStorage.removeItem('cartItems')
   
   dispatch({
       type: ORDER,
   })
   
}

export const set_histories = () =>async(dispatch)=>{
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }   
    const res = await axios.get(`${URL_DEPLOY}profile/`)
    dispatch({
        type:SET_HISTORY,
        payload:res.data
    })
}
export const save_for_later = (item) =>async(dispatch,getState)=>{
    dispatch({
        type:SAVE_FOR_LATER,
        payload : item  
    })
    localStorage.setItem('save_for_later', JSON.stringify(getState().order.items_for_later))
}