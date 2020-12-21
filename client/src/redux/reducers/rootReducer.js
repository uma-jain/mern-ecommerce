import { combineReducers } from 'redux';
import{ ProductListReducer,productDetailsReducer,productSaveReducer,productReviewSaveReducer,productDeleteReducer }from './ProductReducer'
import {cartReducer} from "./cartReducer"
import {userReducer,} from "./userReducer"
import {passwordReset} from "./passwordReset"
import {orderCreateReducer,orderDetailsReducer,
  orderPayReducer,myOrderListReducer,orderListReducer,orderDeleteReducer} from "./OrderReducer"

export default combineReducers({
    productList:ProductListReducer,
    productDetails:productDetailsReducer,
    cart: cartReducer,
    user:userReducer,    
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  createOrder:orderCreateReducer,
  orderdetails:orderDetailsReducer,
  orderPayment:orderPayReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  productReviewSaveReducer:productReviewSaveReducer,
  passwordReset:passwordReset

});