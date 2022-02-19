import { ORDER, SAVE_FOR_LATER, SET_HISTORY } from "../actions/types";
 


const initialState = {
    order : [],
    history : [],
    items_for_later :[]
}

export default function foo (state = initialState,action){
    const {payload,type } = action

    switch(type){
        case ORDER:
            return{
                ...state,
                order:[payload]
            }
        case SET_HISTORY:
                return {
                    ...state,
                    history:payload
            }
        case SAVE_FOR_LATER:
            const existItem = state.items_for_later.find(x=>x.title === payload.title)
            if (existItem){
                return{
                    ...state,
                    items_for_later: state.items_for_later.map((x)=>x.title === existItem.title? payload : x)
                }
            }else{
                return{
                    ...state,
                    items_for_later:[...state.items_for_later ,payload]
                }
            }

     
   
       default:
           return state
    }
}
