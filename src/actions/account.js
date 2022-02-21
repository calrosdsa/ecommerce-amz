import axios from "axios"
import { SET_HISTORY, SET_HISTORY_RELATED } from "./types"

const URL_DEPLOY = 'https://amazon-cln.herokuapp.com/'

export const set_history = () =>async(dispatch) =>{
    const res = await axios.get(`${URL_DEPLOY}profile`)
    dispatch({
        type:SET_HISTORY,
        payload : res.data
    })
}
export const set_history_related = () => async(dispatch)=>{
    const res = await axios.get(`${URL_DEPLOY}profile/historyrelated`)
    dispatch({
        type:SET_HISTORY_RELATED,
        payload:res.data
    })
}