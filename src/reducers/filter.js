import { FILTER_PROPERTIES, GET_PRODUCT_FILTER } from "../actions/types"


const initialState = {
    products : [],
    category_parent : [],
    brand: [],
}
export default function foo (state= initialState, action ){
    const {type , payload } = action
    switch(type){
        case GET_PRODUCT_FILTER:
            return{
                ...state,
                products:payload
            }
        case FILTER_PROPERTIES:
            return{
                ...state,
                ...payload
            }
        default:
        return state;
    }
}