import {
    SEND_PASSWORD_RESET_CODE_FAIL,
    SEND_PASSWORD_RESET_CODE_REQUEST,
    SEND_PASSWORD_RESET_CODE_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS
  } from "../actiontypes/index";
  import Axios from "axios"

export const sendVerificationCode = (email) => async (dispatch) => {
    try {
      dispatch({ type: SEND_PASSWORD_RESET_CODE_REQUEST,  });
    
      const { data} = await Axios.get(`/api/users/resetpassword/${email}`);
      dispatch({ type: SEND_PASSWORD_RESET_CODE_SUCCESS, payload: data });
  
    } catch (error) {
      console.log(error.response);
      dispatch({ type: SEND_PASSWORD_RESET_CODE_FAIL, payload: error.response.data });
    }
  }

  
export const resetPassword= (password,token) => async (dispatch) => {
    try {
      dispatch({ type: PASSWORD_RESET_REQUEST });
      const { data} = await Axios.post(`/api/users/resetpassword`, {password,token});
      console.log(data);
      dispatch({ type: PASSWORD_RESET_SUCCESS, payload: data });
  
    } catch (error) {
      console.log(error);
      dispatch({ type: PASSWORD_RESET_FAIL, payload: error.response.data.msg });
    }

  }