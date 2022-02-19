        import {
     ADD_TO_CART, ITEM_LENGTH, ORDER, REMOVE_ALL_ITEMS, REMOVE_FROM_CART, SELECT_TOTAL, UPDATE_QUANTITY
 } from "../actions/types";

 
const cartItems = JSON.parse(localStorage.getItem('cartItems'))

 const initialState = {
     cart : cartItems? cartItems.cart : [],
     total : cartItems? cartItems.total: 0,
     items:cartItems? cartItems.items: 0,
     category:cartItems? cartItems.category: 0,

 }

 export default function foo (state = initialState,action){
     const {payload,type } = action
     
     switch(type){
         case UPDATE_QUANTITY:
            const exist = state.cart.find(x => x.id === payload.id)
             return{
                 ...state,
                 cart: state.cart.map(x=>x.id === exist.id  ?{...x, quantity:x.quantity + payload.qnt }: x),
                 items: state.items + payload.qnt
                }
                case ADD_TO_CART:
                    const existItem = state.cart.find(x => x.id === payload.id)
                    if (existItem){
                return{
                    ...state,
                    cart: state.cart.map((x) =>
                        x.id === existItem.id ?{...x, quantity: payload.quantity +  x.quantity}: x),
                    category: payload.category
                    
                }
            }else{
                return{
                    ...state,
                    cart: [...state.cart, payload],
                    category: payload.category
                }
            }
        case ITEM_LENGTH:
            return{
                ...state,
                items: state.items + payload
            }
        case SELECT_TOTAL:
            return {
                ...state,
                total: state.total + payload
            }
        case REMOVE_FROM_CART:
            return{
                ...state,
                cart: state.cart.filter(x=> x.id !== payload.id),
                total: state.total - payload.price,
                items: state.items - payload.quantity
            }
        case ORDER:
            return{
                ...state,
                cart:[],
                total:0,
                items:0
            }
        case REMOVE_ALL_ITEMS:
            return{
                ...state,
                cart : [],
                items:0,
                total:0,
            }
    
        default:
            return state
     }
 }
