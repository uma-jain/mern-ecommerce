import React, { useEffect, useState } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { connect} from 'react-redux';
import { signin } from '../../redux/actionCreator/UserActions';
import "./signin.css"

function SigninScreen(props) {
    const {loading,userInfo,error}=props
  const [data, setdata] = useState({
    name:"",
    password:""
  });    

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  //alert(redirect)
  useEffect(() => {
    if (userInfo && !loading) {   
      console.log(redirect);     
      props.history.push(redirect);
      
    }    
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    props.signin(data.email,data.password);       
    props.history.push(redirect);
  }
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Sign-In</h2>
        </li> 
        <li>
          {loading && <div>Loading...</div>}
          {error && !loading &&<div>{error}</div>}
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" required onChange={(e) => setdata({...data,[e.target.name]:e.target.value})}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required name="password" onChange={(e) => setdata({...data,[e.target.name]:e.target.value})}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary" onClick={()=>{props.signin(data.email,data.password)}}>Signin</button>
        </li>
        <li>
        <Link to="/resetPassword"> Forgot Password</Link>
        </li>
        <li>
          New to amazona?
        </li>
        <li>
          <Link to="/signup" className="button secondary text-center" >Create your amazona account</Link>
          
        </li>
      </ul>
    </form>
  </div>
}

const mapStateToProps=({user})=>{
    return {
        loading:user.loading,
        userInfo:user.userInfo,
        error:user.userError_signin
    }
}
export default connect(mapStateToProps,{signin})(SigninScreen); 