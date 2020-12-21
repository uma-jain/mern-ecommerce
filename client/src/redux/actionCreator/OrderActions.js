import Axios from "axios";

import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,ORDER_PAY_SUCCESS,ORDER_PAY_FAIL,
  MY_ORDER_LIST_FAIL,MY_ORDER_LIST_REQUEST,MY_ORDER_LIST_SUCCESS,
  ORDER_DELETE_SUCCESS,ORDER_DELETE_REQUEST,ORDER_DELETE_FAIL,
  ORDER_LIST_SUCCESS,ORDER_LIST_REQUEST,ORDER_LIST_FAIL
} from "../actiontypes/index";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const { user: { userInfo } } = getState();
    const { data: { data: newOrder } } = await Axios.post("/api/order/createOrder", order);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });

  } catch (error) {
    console.log(error);
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
}

const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const { user: { userInfo } } = getState();
    const { data } = await Axios.get("/api/order/all/myorders",{
      headers:
       {  "x-auth-token": localStorage.getItem("token") }
    });
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
}


const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { user: { userInfo } } = getState();
    const { data } = await Axios.get("/api/order/" + orderId, {
      headers:
        {  "x-auth-token": localStorage.getItem("token") }
    });

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    console.log(error);
    dispatch({ type: ORDER_DETAILS_FAIL, payload:"Order Not found" });
  }
}

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
      headers:
      {  "x-auth-token": localStorage.getItem("token") }
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }
}

//--------------admin----------------------------------------
const listOrders = () => async (dispatch, getState) => {

  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { user: { userInfo } } = getState();
    const { data } = await Axios.get("/api/order", {
      headers:
      {  "x-auth-token": localStorage.getItem("token") }
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }

}
const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const { user: { userInfo } } = getState();
    const { data } = await Axios.delete("/api/order/" + orderId, {
      headers:
      {  "x-auth-token": localStorage.getItem("token") }
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }
}

export { createOrder, detailsOrder,payOrder,listMyOrders ,listOrders,deleteOrder}; 