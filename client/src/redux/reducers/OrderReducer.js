import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
    ORDER_PAY_FAIL,ORDER_PAY_SUCCESS,ORDER_PAY_REQUEST,
    MY_ORDER_LIST_SUCCESS,MY_ORDER_LIST_REQUEST,MY_ORDER_LIST_FAIL,
    ORDER_LIST_FAIL,ORDER_LIST_REQUEST,ORDER_LIST_SUCCESS,
    ORDER_DELETE_FAIL,ORDER_DELETE_REQUEST,ORDER_DELETE_SUCCESS
  } from "../actiontypes/index";
  
  //create order  
  function orderCreateReducer(state = {loading:false,order:{},success:false,error:null}, action) {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        return { ...state,loading: true };
      case ORDER_CREATE_SUCCESS:
        return {...state, loading: false, order: action.payload, success: true };
      case ORDER_CREATE_FAIL:
        return {...state, loading: false, error: action.payload ,success:false};
      default: return state;
    }
  }
  
//payment scree shows order details
  function orderDetailsReducer(state = {
    loading:false,
    order: {       
      orderItems: [],
      shipping: {},
      payment: {},
      
    },
    error:null
  }, action) {
    switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return { loading: true };
      case ORDER_DETAILS_SUCCESS:
        return {...state, loading: false, order: action.payload};
      case ORDER_DETAILS_FAIL:
        return { ...state,loading: false, error: action.payload };
      default: return state;
    }
  }

  //payment starts
  function orderPayReducer(state = {
    loading:false,
    success:false,
    order: {
      orderItems: [],
      shipping: {},
      payment: {}
    },
    error:null
  }, action) {
    switch (action.type) {
      case ORDER_PAY_REQUEST:
        return { loading: true };
      case ORDER_PAY_SUCCESS:
        return { loading: false, success: true };
      case ORDER_PAY_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
//in profile screen orders with uid
  function myOrderListReducer(state = {
    orders: []
  }, action) {
    switch (action.type) {
      case MY_ORDER_LIST_REQUEST:
        return { loading: true };
      case MY_ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case MY_ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
  //------------------------admin

  //admin all existing orders
  function orderListReducer(state = {
    orders: []
  }, action) {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { loading: true };
      case ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
  
  function orderDeleteReducer(state = {
    order: {
      orderItems: [],
      shipping: {},
      payment: {}
    }
  }, action) {
    switch (action.type) {
      case ORDER_DELETE_REQUEST:
        return { loading: true };
      case ORDER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case ORDER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  
  export { orderCreateReducer, orderDetailsReducer ,orderPayReducer,myOrderListReducer,orderListReducer,orderDeleteReducer} 