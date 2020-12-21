import {
    SEND_PASSWORD_RESET_CODE_FAIL,
    SEND_PASSWORD_RESET_CODE_REQUEST,
    SEND_PASSWORD_RESET_CODE_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS
  } from "../actiontypes/index";

  const initialstate={

      codeSent:{status:false,msg:null},
      passwordresetsuccess:{status:false,msg:null},
      
      codesentLoading:false,
      passwordResetloading:false,

      codeSentError:null,
      passwordResetError:null

   }

 export function passwordReset(state = initialstate, action) {
    switch (action.type) {
      case SEND_PASSWORD_RESET_CODE_REQUEST:
        return { ...state,codesentLoading: true };

      case SEND_PASSWORD_RESET_CODE_SUCCESS:
        return {...state, codesentLoading: false, codeSent:{status:true,msg:action.payload},codeSentError:null };
     
        case SEND_PASSWORD_RESET_CODE_FAIL:
        return {...state, codesentLoading: false, codeSentError:action.payload};
       
        case PASSWORD_RESET_REQUEST:
        return {...state, passwordResetloading: true, };

        case PASSWORD_RESET_SUCCESS:
        return {...state, passwordResetloading: false,passwordResetError:null,codeSent:{},passwordresetsuccess:{status:true,msg:action.payload}};
        case PASSWORD_RESET_FAIL:
        return {...state, passwordResetloading: false, passwordResetError: action.payload ,};
      default: return state;
    }
  }