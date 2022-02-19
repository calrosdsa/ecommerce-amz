import {
    GET_CATEGORIES,
    GET_CATEGORY,
    GET_CATEGORY_TREND,
    GET_CATEGORY_TREND2,
    GET_CATEGORY_TREND3,
    GET_CATEGORY_TREND4,
    GET_CATEGORY_TREND5,
    GET_CATEGORY_TREND6,
    GET_CATEGORY_TREND7,
    GET_PRODUCT,
    GET_PRODUCTS,
    GET_REVIEWS,
    REVIEW
} from '../actions/types'

const initialState = {
    products :[],
    product : {},
    categories:[],
    category : [],
    category_trend : [],
    category_trend2 : [],
    category_trend3 : [],
    category_trend4 : [],
    category_trend5 : [],
    category_trend6 : [],
    category_trend7 : [],
    reviews:[],
    reviewFilter:[],
    review:'',


}

export default  function foo(state = initialState,action){
    const {type,payload } = action;

    switch(type){
        case GET_REVIEWS:
            return{
                ...state,
                reviews:payload
            }
            case REVIEW:
                return{
                    ...state,
                    review: payload.map(item=>item.review).join('+'),
                    reviewFilter:payload,
                }

        case GET_CATEGORY_TREND:
            return{
                ...state,
                category_trend:payload
            }
            case GET_CATEGORY_TREND2:
                return{
                    ...state,
                    category_trend2:payload
                }
                case GET_CATEGORY_TREND3:
                    return{
                        ...state,
                        category_trend3:payload
                    }
                    case GET_CATEGORY_TREND4:
                        return{
                            ...state,
                            category_trend4:payload
                        }
                        case GET_CATEGORY_TREND5:
                            return{
                                ...state,
                                category_trend5:payload
                            }
                            case GET_CATEGORY_TREND6:
                                return{
                                    ...state,
                                    category_trend6:payload
                                }
                                case GET_CATEGORY_TREND7:
                                    return{
                                        ...state,
                                        category_trend7:payload
                                    }
        case GET_CATEGORY:
            return{
                ...state,
                category:payload
            }
        case GET_PRODUCT:
            return{
                ...state,
                product: payload
            }
            case GET_CATEGORIES:
                return{
                ...state,
                categories: payload
            }
        case GET_PRODUCTS:
            return{
                ...state,
                products : payload
            }
    default:
    return state;
    }  
}
