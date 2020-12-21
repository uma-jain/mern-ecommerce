import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../redux/actionCreator/UserActions';
import "./signup.css"

function RegisterScreen(props) {
    const {userInfo,loading,error}=props

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userInfo && !loading) {
      props.history.push("/");
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = () => {
  //  e.preventDefault();
    console.log(props.history);
   props.register(name, email, password, props.history);
   props.history.push("/verifyEmail")
   // now display a msg for user to verify email by clicking link
   //alert("check mail")
   //rediect to new page which will have info about furthur procedings
  
  }
  return <div className="form">
    <form  >
      <ul className="form-container">
        <li>
          <h2>Create Account</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="name">
            Name
          </label>
          <input type="name" name="name" id="name" required onChange={(e) => setName(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
       
        <li>
          <button type="submit" className="button-primary" onClick={()=>{submitHandler()}}>Register</button>
        </li>
        <li>
        <Link to="/signin">   Already have an account?</Link>
        <Link to="/resetPassword"> Forgot Password</Link>
        </li>

      </ul>
    </form>
  </div>
}
const mapStateToProps=({user})=>{
    return{
      loading:user.loading,
      userInfo:user.userInfo,
      error:user.userError_register
    }
}

export default connect(mapStateToProps,{register})(RegisterScreen); 