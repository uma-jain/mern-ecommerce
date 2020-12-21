import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveOrder, listOrders, deleteOrder } from '../../../redux/actionCreator/OrderActions';
import "./OrderScreen.css"



function OrdersScreen(props) {
 
  
  const { loading, orders, error } = props.orderList;

  
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = props.orderDelete;

 

  useEffect(() => {
    props.listOrders();
    return () => {
      //
    };
  }, [successDelete]);
  
  useEffect(() => {
    if(!props.user.userInfo){
      props.history.push("/")
    }
  }, [props.user.userInfo]);

  

  const deleteHandler = (order) => {
    props.deleteOrder(order._id);
  }
  return loading ? <div>Loading...</div> : props.user.userInfo && !props.user.userInfo.isAdmin ? <div> you are not allowed to access this page</div>: 
    <div className="content content-margined">

      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            { orders && orders.map(order => (<tr key={order._id}>
              <td>{order._id}</td>
              <td>{(order.createdAt).substring(0,10)}</td>
              <td>{order.totalPrice}</td>
              <td>{order.user.name}</td>
              <td>{order.isPaid.toString()}</td>
              <td>{order.paidAt}</td>
              <td>{order.isDelivered.toString()}</td>
              <td>{order.deliveredAt}</td>
              <td>
                <Link to={"/order/" + order._id} className="button secondary" >Details</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Delete</button>
              </td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
}
const mapStateToProps=({user,orderList,orderDelete})=>{
    return {
        user:user,
        orderList:orderList,
        orderDelete:orderDelete

    }
  }
export default connect(mapStateToProps,{deleteOrder,listOrders})(OrdersScreen); 