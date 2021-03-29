import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../../redux/actionCreator/UserActions';
import { listMyOrders } from '../../redux/actionCreator/OrderActions';
import { connect} from 'react-redux';
import "./ProfielScreen.css"

function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const { userInfo } = props.user;

  const handleLogout = () => {
    
    alert("call logoout from profile")
    props.logout();
    props.history.push("/signin");
  }
  const submitHandler = (e) => {
    e.preventDefault();
   props.update({ userId: userInfo._id, email, name, password })
  }

  const { loading, success, error } = props.user;  
  const { loading: loadingOrders, orders, error: errorOrders } =props.myOrderList;

  useEffect(() => {

    if (userInfo && !userInfo.loading) {
      console.log(userInfo.name)
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }  
 props.listMyOrders();
 if(!localStorage.getItem("token")){
   props.history.push("/")
 }
   
  }, [])

  

  return (<div className="profile">
    <div className="profile-info">
      <div className="form">
        <form  >
          <ul className="form-container">
            <li>
              <h2>User Profile</h2>
            </li>
            <li>
              {loading && <div>Updating...</div>}
              {error && <div>{error}</div>}
              {success && <div>Profile Saved Successfully.</div>}
            </li>
            <li>
              <label htmlFor="name">
                Name
          </label>
              <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="email">
                Email
          </label>
              <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
              </input>
            </li>
            <li>
              <button type="submit" className="button primary" onClick={(e)=>submitHandler(e)}>Update</button>
            </li>
            <li>

              <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
            </li>

          </ul>
        </form>
      </div>
    </div>
    <div className="profile-orders content-margined">
      {
        loadingOrders ? <div>Loading...</div> :
          errorOrders ? <div>{errorOrders} </div> :
          orders&& orders[0] && <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid}</td>
                  <td>
                    <Link to={"/order/" + order._id}>DETAILS</Link>
                  </td>
                </tr>)}
              </tbody>
            </table>
      }
    </div>
  </div>)

}

const mapStateToProps=({user,createOrder,userUpdate,myOrderList})=>{
    return {
        user:user,
        createOrderdata:createOrder,
        userUpdate:userUpdate,
        myOrderList:myOrderList 
    }
} 
export default connect(mapStateToProps,{listMyOrders,logout,update})(ProfileScreen);