import {GET_ALL_PRODUCTS_FAIL,GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS ,
    PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,PRODUCT_SAVE_SUCCESS,PRODUCT_SAVE_REQUEST,PRODUCT_SAVE_FAIL,PRODUCT_DELETE_SUCCESS
    ,PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_FAIL,
    PRODUCT_REVIEW_SAVE_SUCCESS,PRODUCT_REVIEW_SAVE_RESET,PRODUCT_REVIEW_SAVE_REQUEST,PRODUCT_REVIEW_SAVE_FAIL
} from "../actiontypes/index";

const initialstate={
    Allproducts:[],
    loading:true,
    error_fetching_products:null
}

export const  ProductListReducer=(state=initialstate,action)=>{
switch(action.type){
 case GET_ALL_PRODUCTS:
     return{
        ...state,
        loading:true ,   
        Allproducts:[]
     }
     
 case GET_ALL_PRODUCTS_SUCCESS:
    return{
        ...state,
        loading:false,
        Allproducts:action.payload
     }
 
 case GET_ALL_PRODUCTS_FAIL:
     return{
        ...state,
        loading:false,
        error_fetching_products:action.payload
     } 
 default :
 return state;  
}
}
export const productDetailsReducer = (state = { product: {}, loading: true,error:null },  action
  ) => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return { loading: true };
      case PRODUCT_DETAILS_SUCCESS:
        return { loading: false, product: action.payload };
      case PRODUCT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
 export const productSaveReducer=(state = { product: {},loading:false,error:null,success:null }, action)=>{

    switch (action.type) {
      case PRODUCT_SAVE_REQUEST:
        return { ...state,loading: true };
      case PRODUCT_SAVE_SUCCESS:
        return { ...state,loading: false, success: true, product: action.payload };
      case PRODUCT_SAVE_FAIL:
        return { ...state,loading: false, error: action.payload ,success:false}
      default:
        return state;
    }
  }
  
  export const  productDeleteReducer=(state = { product: {},loading:false,error:null,success:null}, action)=>{
    switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
        return { ...state,loading: true };
      case PRODUCT_DELETE_SUCCESS:
        return {...state, loading: false, product: action.payload, success: true,error:null };
      case PRODUCT_DELETE_FAIL:
        return { ...state,loading: false, error: action.payload ,success: false }
      default:
        return state;
    }
  }
  
  export function productReviewSaveReducer(state = {loading:false,review:{},success:false,error:null}, action) {
    switch (action.type) {
      case PRODUCT_REVIEW_SAVE_REQUEST:
        return { ...state,loading: true,error:null };
      case PRODUCT_REVIEW_SAVE_SUCCESS:
        return { ...state,loading: false, review: action.payload, success: true ,error:null};
      case PRODUCT_REVIEW_SAVE_FAIL:
        return {...state, loading: false, error: action.payload };
      case PRODUCT_REVIEW_SAVE_RESET:
        return {};
      default:
        return state;
    }
  }