import {GET_ALL_PRODUCTS,GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_SUCCESS,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,PRODUCT_DELETE_FAIL,PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS,
  PRODUCT_SAVE_FAIL,PRODUCT_SAVE_REQUEST,PRODUCT_SAVE_SUCCESS,
  PRODUCT_REVIEW_SAVE_FAIL,PRODUCT_REVIEW_SAVE_REQUEST,PRODUCT_REVIEW_SAVE_RESET,PRODUCT_REVIEW_SAVE_SUCCESS

} from "../actiontypes"
import axios from "axios"



export const getAllProducts=(category = '', searchKeyword = '', sortOrder = '')=>async (dispatch)=>{
  //request starts loading

  dispatch({
      type:GET_ALL_PRODUCTS
  })
  //
  try { 
    const response= await axios.get("/api/products?category=" + category +
      "&searchKeyword=" + searchKeyword + "&sortOrder=" + sortOrder);
      console.log(response);
      dispatch({
        type:GET_ALL_PRODUCTS_SUCCESS,
        payload:response.data
    })
  } catch (error) {
    dispatch({
        type:GET_ALL_PRODUCTS_FAIL,
        payload:error.message
    })
  }

}
export const getProductDetails = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const response = await axios.get(`/api/products/${productId}`);
    console.log(response);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: response.data });
    
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//review
export const saveProductReview = (productId, review) => async (dispatch, getState) => {
  try {

    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(
      `/api/products/${productId}/reviews`,
      review,
      {
        headers:  {  "x-auth-token": localStorage.getItem("token") }
      }
    );
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
  }
}

//ADMIN PRIVILEDGES
//UPDATE PRODUCT
export const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    if (!product._id) {
      const { data } = await axios.post('/api/products', product);
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put('/api/products/' + product._id, product);
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }

  } catch (error) {

    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
}

//DELETE PRODUCT
export const deleteProdcut = (productId) => async (dispatch, getState) => {
  try {
   
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete("/api/products/" + productId);
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
}

