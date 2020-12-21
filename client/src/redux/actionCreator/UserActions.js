import Axios from "axios";
import Cookie from 'js-cookie';
import setToken from "./utils/setAuthToken"
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,LOAD_USER, USER_SIGNIN_FAIL, USER_LOGOUT,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
USER_UPDATE_FAIL,USER_UPDATE_REQUEST,USER_UPDATE_SUCCESS
} from "../actiontypes/index";



export const loadUser=()=>(dispatch)=>{
  if(localStorage.getItem("token")){   
  setToken((localStorage.getItem("token")));
 // console.log(localStorage.getItem("userInfo"));
  dispatch({ type: LOAD_USER, payload:JSON.parse(localStorage.getItem("userInfo"))});
  }else{    
  dispatch({ type: LOAD_USER, payload: localStorage.getItem("userInfo") });
  }

}


export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });     
    localStorage.setItem("userInfo",JSON.stringify(data));    
  console.log( localStorage.getItem("userInfo"));
    localStorage.setItem("token",data.token);    
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
   

  //  Cookie.set('userInfo', JSON.stringify(data));
  //  localStorage.setItem("userInfo",data);
  //  setToken(data.token); 
  //  localStorage.setItem("token",data.token);

  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message});
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
    localStorage.setItem('userInfo', data);
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }

}


export const logout = () => (dispatch,history) => {
//  alert("log")
 // Cookie.remove("userInfo");  
  localStorage.removeItem('userInfo');
  localStorage.removeItem('token');  
  localStorage.removeItem('shippingAddress');  
//  localStorage.removeItem('cartItems');

  setToken(null); 
  dispatch({ type: USER_LOGOUT });
 //history.push("/")

}
