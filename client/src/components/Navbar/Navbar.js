import React from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { BrowserRouter, Route,Link,withRouter,useHistory} from 'react-router-dom';
import "./Navbar.css"

import Button from '@material-ui/core/Button';
import {connect  } from "react-redux";

import Drawer from '@material-ui/core/Drawer';
//icons

import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { loadUser,logout} from "../../redux/actionCreator/UserActions";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    
     hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      border:"none",
      outline:"none"
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      justifyContent: 'flex-end',
    },
    
    content: {
      flexGrow: 1,
      padding: theme.spacing(0),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
  
  }));
function Navbar(props) {
    const classes = useStyles();
    const theme = useTheme();
    const userInfo=props.userInfo;
    return (
        <div>
            
        <header className="row"
          className=
          {clsx(classes.appBar, {
          [classes.appBarShift]: props.open,
        })}>   
         
          <div>
        <IconButton
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            style={{color:"white",border:"none",outline:"none"}}
          >
            <MenuIcon style={{fontSize:"20px"}}/>
          </IconButton>
            <Link className="brand" to="/">
              Amazon
            </Link>
            </div>  

            <div className="header-links">
           <div>
            <Link to="/cart">
                    <Badge badgeContent={props.cartItems.length || 0} color="primary">
                <ShoppingCartIcon style={{fontSize:30}}/>
            </Badge>
            </Link>
            </div>
            <div>
            {
              userInfo ? <Link to="/profile">{userInfo.name}</Link> :
                <Link to="/signin">Sign In</Link>
            }             
            </div>
            <div>
            {props.userInfo&&<Button style={{margin:"0 20px 0 0  "}} variant="contained" onClick={()=>{
               props.logout();
               window.location.reload(false);
               props.history.push("/")
              
              }}>Logout</Button>}  
             </div>      
         
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#"  >Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/admin/orders">Orders</Link>
                    <Link to="/admin/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}     
              </div>         
           
         
        
        </header>
        </div>
        
    )
}

const mapStateToProps=({user,cart})=>{
    return {
        loading:user.loading,
        userInfo:user.userInfo,
        error:user.userError_signin,
        cartItems:cart.cartItems
    }
  }
  
  export default connect(mapStateToProps,{loadUser,logout})(Navbar);

