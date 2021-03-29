import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function ErrorBox({msg,type}) {
    return (
        <div>
      {type && <Alert severity="error">{msg}</Alert> }
      {!type && <Alert severity="success">{msg}</Alert> }
        </div>
    )
}

export default ErrorBox
