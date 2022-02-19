import axios from "axios";
import { ORDER, SAVE_FOR_LATER, SET_HISTORY } from "./types";

import setAuthToken from '../utils/setAuthToken'


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const set_orders = (order) =>async(dispatch) =>{
   
   axios.post('http://localhost:8000/order/',order)
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
    const res = await axios.get('http://localhost:8000/profile/')
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