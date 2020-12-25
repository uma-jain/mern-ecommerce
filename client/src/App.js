import React,{useEffect} from 'react';
import "./App.css"

import Cookie from 'js-cookie';
import {connect  } from "react-redux";
import { BrowserRouter, Route,Link,withRouter,useHistory,Switch} from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar"

import HomeScreen from './Screens/HomeScreen/HomeScreen';
import ProductScreen from './Screens/ProductScreen/ProductScreen';
import CartScreen from './Screens/Cart/cartScreen';
import RegisterScreen from "./Screens/Signup/signup"
import SignInScreen from "./Screens/Signin/signin"
import  ProtectedRoute from "./PrivateRoute";
import ShippingAddressScreen from './Screens/Shipping/ShippingScreen';
import PaymentMethodScreen from './Screens/Payment/Payment';
import PlaceOrderScreen from './Screens/PlaceOrderScreen/PlaceorderScreen';
import OrderScreen from "./Screens/OrderScreen/OrderScreen";
import ProfileScreen  from "./Screens/ProfileScreen/ProfileScreen";
import VerifyEmailScreen from "./Screens/VerifyEmailScreen/VerifyEmailScreen"
import ResetPasswordScreen from "./Screens/ForgotPasswordScreen/ForgotReset"

//admin
import OrdersScreen from "./Screens/AdminScreens/OrdersScreen/OrdersScreen";
import ProductsScreen from "./Screens/AdminScreens/ProductsScreen/ProductsScreen";
//material ui


import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
//icons
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { loadUser,logout} from "./redux/actionCreator/UserActions";

const  NotFound=()=>{
  return(
    <div>
      Page Not Found
    </div>
  )
}
const drawerWidth = 240;
//cookies
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
function App(props) {
  let history = useHistory();
  const userInfo=props.userInfo;

  useEffect(() => {
 //props.logout();
    props.loadUser();
  }, [])

  const classes = useStyles();
  const theme = useTheme();

  //sidebar
   const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
      <Navbar
       handleDrawerOpen={handleDrawerOpen} 
       handleDrawerClose={handleDrawerClose}
       history={history}
       open={open}
       classes={classes}
       ></Navbar>       

        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
       <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
          <CloseIcon></CloseIcon>
          </IconButton>
        </div>
        <Divider />
        <ul className="categories">
            <li>
              <Link to="/category/Pants">Pants</Link>
            </li>

            <li>
              
              <Link to="/category/Shirts">Shirts</Link>
            </li>
            <li>
              
              <Link to="/category/mobile">Mobile</Link>
            </li>

          </ul>
      </Drawer>
        <main  className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
           <Switch>
          <Route path="/cart/:id/:qty" component={withRouter(CartScreen)}></Route>          
          <Route exact path="/cart" component={withRouter(CartScreen)}></Route>
          <Route path="/product/:id" component={withRouter(ProductScreen)}></Route>
          <Route path="/category/:id" component={HomeScreen} />
          <Route exact path="/" component={withRouter(HomeScreen)} ></Route>
          <ProtectedRoute  path="/signup" component={withRouter(RegisterScreen)} ></ProtectedRoute>
          <ProtectedRoute path="/signin" component={withRouter(SignInScreen)}  />
          <Route path="/shipping" shipping={true} component={withRouter(ShippingAddressScreen)}></Route>
          <Route exact path="/payment" component={withRouter(PaymentMethodScreen)} ></Route>
          <Route exact path="/placeorder" component={withRouter(PlaceOrderScreen)} ></Route>          
          <Route exact path="/order/:id" component={withRouter(OrderScreen)} ></Route>               
          <Route exact path="/profile" component={withRouter(ProfileScreen)} ></Route>
          <Route exact path="/admin/orders" component={withRouter(OrdersScreen)} ></Route>          
          <Route exact path="/verifyEmail" component={withRouter(VerifyEmailScreen)} ></Route>
          <Route exact path="/admin/products" component={withRouter(ProductsScreen)} ></Route>          
          <Route exact path="/resetPassword" component={withRouter(ResetPasswordScreen)} ></Route>
          <Route  path='*' component={withRouter(NotFound)} ></Route>
          </Switch>
                </main>

        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}
const mapStateToProps=({user})=>{
  return {
      loading:user.loading,
      userInfo:user.userInfo,
      error:user.userError_signin
  }
}

export default connect(mapStateToProps,{loadUser,logout})(App);