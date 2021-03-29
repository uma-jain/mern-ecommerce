import Axios from "axios";
import setToken from "./utils/setAuthToken"
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,LOAD_USER, USER_SIGNIN_FAIL, USER_LOGOUT,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
USER_UPDATE_FAIL,USER_UPDATE_REQUEST,USER_UPDATE_SUCCESS
} from "../actiontypes/index";

import jwt from "jwt-decode";



export const loadUser=()=>(dispatch)=>{

  if(localStorage.getItem("token")){   

      //checkif expired or not
      const token = localStorage.getItem("token");
      var decodedToken=jwt(token);
      var dateNow = new Date();
   
      console.log(decodedToken.exp, dateNow.getTime()/1000);
            
      if(decodedToken.exp < dateNow.getTime()/1000)
         { 
            console.log("expired");           
           dispatch(logout())
        }
     else{
   
      setToken(localStorage.getItem("token"));
      dispatch({ type: LOAD_USER, payload:JSON.parse(localStorage.getItem("userInfo"))});
     }     
    

  }else{    
  dispatch({ type: LOAD_USER, payload:null });
  }
}


export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });     
    localStorage.setItem("userInfo",JSON.stringify(data));

    localStorage.setItem("token",(data.token));    
    setToken(data.token); 
  } catch (error) {
    console.log(error.response);
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.msg });
  }
}

export const  register = (name, email, password,history) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("/api/users/register", { name, email, password });
  
    dispatch({ type: USER_REGISTER_SUCCESS, });    
    history.push("/verifyEmail")
   


  } catch (error) {
    console.log(error.response);
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.errors});
    history.push("/signup")
      
  }

}

export const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { user: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await Axios.put("/api/users/" + userId,
      { name, email, password }, {
      headers: {
        "x-auth-token": localStorage.getItem("token")
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    localStorage.setItem('userInfo',JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }

}


export const logout = () => (dispatch) => {
 // alert("log")
 // Cookie.remove("userInfo");  
  localStorage.removeItem('userInfo');
  localStorage.removeItem('token');  
  localStorage.removeItem('shippingAddress');  
//  localStorage.removeItem('cartItems');

  setToken(null); 
  dispatch({ type: USER_LOGOUT });
  window.location.href="/"

}
