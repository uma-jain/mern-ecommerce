    import React ,{useState}from 'react'
    import { connect } from "react-redux";
    import Snackbar from '@material-ui/core/Snackbar';
    import MuiAlert from '@material-ui/lab/Alert';
    
import { Link,Redirect } from 'react-router-dom';
    import {sendVerificationCode,resetPassword  } from "../../redux/actionCreator/PasswordReset.js";
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
    
    function ForgotReset(props) {
        
        const [open, setOpen] = React.useState(true);

        const handleClick = () => {
          setOpen(true);
        };
      
        const handleClose = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
      
          setOpen(false);
        };

        const [data, setdata
        ] = useState({
            email:null,
            token:null,
            password:null,
          });  


        return (
            <div className="form">
                  <ul className="form-container">
        <li>
          <h2>Reset screen</h2>
        </li>       
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" required onChange={(e) => setdata({...data,[e.target.name]:e.target.value})}>
          </input>
        </li>
       {!props.passwordReset.codeSent.status && !props.passwordReset.passwordresetsuccess.status &&
        <li>
          <button type="submit" className="button primary" onClick={()=>{props.sendVerificationCode(data.email)}}>Send Reset Code</button>
        </li>
        
        }
        <li>
        {props.passwordReset.codesentLoading && <div>Sending Code</div>}
        {props.passwordReset.codeSent.status && !props.passwordReset.codesentLoading &&<div>
        
        <Snackbar open={open}  onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
        {props.passwordReset.codeSent.msg}
        </Alert>
      </Snackbar>
      </div>       
        }
        {props.passwordReset.codeSentError && !props.passwordReset.codesentLoading &&<div>
       
        <Snackbar open={open}  onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
        {props.passwordReset.codeSentError}
        </Alert>
      </Snackbar>

        </div>}
       
       </li>
       
        <li>
          <label >Token</label>
          <input  id="token" required name="token" onChange={(e) => setdata({...data,[e.target.name]:e.target.value})}>
          </input>
        </li>
        <li>
          <label htmlFor="password"> New Password</label>
          <input type="password" id="password" required name="password" onChange={(e) => setdata({...data,[e.target.name]:e.target.value})}>
          </input>
        </li>
      {!props.passwordReset.passwordresetsuccess.status &&
       <li>
          <button type="submit" className="button primary" onClick={()=>{props.resetPassword(data.password,data.token)}}>Reset Password</button>
        </li>
        }
        {props.passwordReset.passwordResetloading && <div>Verifying Token</div>}
        {props.passwordReset.passwordresetsuccess.status  && !props.passwordReset.codesentLoading 
        &&data.email&&
        <div>
        <li>
       
        <Snackbar open={open}  onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
        {props.passwordReset.passwordresetsuccess.msg}
        </Alert>
      </Snackbar>
        </li>
        <li>
        <Link to="/signin" className="button secondary text-center" >Log In To Your Account</Link>
        </li> 
        </div>
         }
        {props.passwordReset.passwordResetError && !props.passwordReset.passwordResetloading &&
        <div>
        <Snackbar open={open}  onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
        {props.passwordReset.passwordResetError}
        </Alert>
      </Snackbar>
       
        
        </div>}
       
       
      </ul>
            </div>
        )
    }

    const MapStateToProps=({passwordReset})=>{
        return {
            passwordReset:passwordReset
         }
        
      }
    
    export default connect(MapStateToProps,{sendVerificationCode,resetPassword})(ForgotReset)
    