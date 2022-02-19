import { SET_HISTORY, SET_HISTORY_RELATED } from "../actions/types"


const initialState = {
    history : [],
    history_related:[]
}

export default function foo (state = initialState,action){
    
    const {type ,payload }  = action;
    switch(type){
        case SET_HISTORY:
            return{
                ...state, 
                history: payload
            }
        case SET_HISTORY_RELATED:
            return{
                ...state,
                history_related:payload
            }
        default:
        return {
            ...state
        }
    }

}