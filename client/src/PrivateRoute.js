import React from 'react'
import { Route,Redirect } from "react-router-dom";

function ProtectedRoute({ component: Comp, loggedIn, path, ...rest }){
    console.log();
    return (
      <Route
        path={path}
        {...rest}
        render={props => {
          return localStorage.getItem("token") ? <Redirect to="/" />  :<Comp {...props} />;
        }}
      />
    );
  };

export default ProtectedRoute
