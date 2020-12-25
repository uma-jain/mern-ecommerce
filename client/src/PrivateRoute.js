import React from 'react'
import { Route,Redirect } from "react-router-dom";

function ProtectedRoute({ component: Comp, loggedIn, shipping,path,location, ...rest}){

    return (
      <Route
        path={path}
        {...rest}
        render={props => {
          {console.log(props)}
          return localStorage.getItem("token") ?<Redirect to="/" /> : <Comp {...props} />;
        }}                                                              
      />
    );
  };

export default ProtectedRoute

/*
import React from 'react'
import { Route,Redirect } from "react-router-dom";

function ProtectedRoute({ component: Comp, loggedIn, shipping,path,location, ...rest}){

 //if shipping = true pass give a props to signin to redirect to shipping after login
console.log("shipping is ",shipping)
    return (
      <Route
        path={path}
        {...rest}
        render={props => {
          {console.log(props)}
          return localStorage.getItem("token") ?( shipping ? <Redirect to="/shipping" />:<Redirect to="/" />  ): <Comp {...props} />;
        }}                                                              
      />
    );
  };

export default ProtectedRoute

*/