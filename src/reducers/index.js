// Root Reducer
import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import product from './product'
import cart from './cart'
import order from './order'
import filter from './filter'
import account from './account'



//import comment from './comment'
export default combineReducers({
  alert,
  account,
  auth,
  product,
  cart,   
  order,
  filter,
});

