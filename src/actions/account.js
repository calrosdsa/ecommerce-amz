import axios from "axios"
import { SET_HISTORY, SET_HISTORY_RELATED } from "./types"


export const set_history = () =>async(dispatch) =>{
    const res = await axios.get('http://localhost:8000/profile/')
    dispatch({
        type:SET_HISTORY,
        payload : res.data
    })
}
export const set_history_related = () => async(dispatch)=>{
    const res = await axios.get('http://localhost:8000/profile/historyrelated')
    dispatch({
        type:SET_HISTORY_RELATED,
        payload:res.data
    })
}