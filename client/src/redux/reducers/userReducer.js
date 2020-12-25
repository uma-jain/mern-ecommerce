import { USER_SIGNIN_REQUEST,USER_UPDATE_SUCCESS,USER_UPDATE_REQUEST,USER_UPDATE_FAIL,
  LOAD_USER,USER_LOGOUT,USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from "../actiontypes/index";
const initialState={
    loading:true,
    userInfo:{},
    userError_signin:null,
    userError_register:null
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {...state, loading: true };
    case USER_SIGNIN_SUCCESS:
      return { ...state,loading: false, userInfo: action.payload };
   case LOAD_USER:
        return { ...state,loading: false, userInfo: action.payload || null };
    case USER_SIGNIN_FAIL:
      return { ...state,loading: false, userError_signin: action.payload,userError_signin : null};
    case USER_REGISTER_REQUEST:
        return { ...state,loading: true };
      case USER_REGISTER_SUCCESS:
        return { ...state,loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
        return { ...state,loading: false, userError_register: action.payload };
        case USER_LOGOUT:
          return { ...state,loading: false, userInfo:{}};
          case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}


export {
  userReducer
} 