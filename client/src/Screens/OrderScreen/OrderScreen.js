import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {  detailsOrder, payOrder } from '../../redux/actionCreator/OrderActions';
import PaypalButton from '../../components/PaypalButton';
import "./OrderScreen.css"

function OrderScreen(props) {

  const { loading, order, error } = props.orderDetails;
  console.log(order);
  const { loading: loadingPay, success: successPay, error: errorPay } = props.orderPayment;

 
  useEffect(() => { 
    console.log("in use effect")  
     if (successPay) {
       props.history.push("/profile");
     } else {
       //alert("in else")
       if(props.match.params.id){
         props.detailsOrder(props.match.params.id);
      }
     }
   }, [successPay]);

  console.log(props.match.params.id);


  if(!props.match.params.id){
    alert("empty");
    return(
        <div>
            no order
        </div>
    )
    
  }
  const handleSuccessPayment = (paymentResult) => {
    console.log("CALLED");
    props.payOrder(order, paymentResult);
  }

  return loading ? <div>Loading ...</div> : error ? <div>{error}</div> :
    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Shipping
          </h3>
            <div>
              {order && order.shippingAddress && order.shippingAddress.address}, {order && order.shippingAddress &&order.shippingAddress.city},
          {order && order.shippingAddress &&order.shippingAddress.postalCode}, {order && order.shippingAddress &&order.shippingAddress.country},
          </div>
            <div>
              {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {order.paymentMethod}
            </div>
            <div>
              {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>
                  Shopping Cart
          </h3>
                <div>
                  Price
          </div>
              </li>
              {
                order.orderItems.length === 0 ?
                  <div>
                    Cart is empty
          </div>
                  :
                  order.orderItems.map(item =>
                    <li>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>

                        </div>
                        <div>
                          Qty: {item.qty}
                        </div>
                      </div>
                      <div className="cart-price">
                        ${item.price}
                      </div>
                    </li>
                  )
              }
            </ul>
          </div>


        </div>      
        <div className="placeorder-action">
          <ul>
            <li>
              <li className="placeorder-actions-payment" style={{width:"350px"}} >
              {props.loading && <div>Finishing Payment...</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              }
            </li>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${order.shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${order.taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${order.totalPrice}</div>
            </li>
          </ul>



        </div>

      </div>
    </div>

}
const mapStateToProps=({orderdetails,orderPayment})=>{
    return {
        orderDetails:orderdetails,
        orderPayment:orderPayment
    }
}

export default connect(mapStateToProps,{detailsOrder,payOrder})(OrderScreen); 