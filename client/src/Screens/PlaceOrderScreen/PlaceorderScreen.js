import React, { useEffect } from 'react';
import { createOrder } from '../../redux/actionCreator/OrderActions';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../../components/CheckoutSteps';
import "./PlaceOrderScreen.css"

function PlaceOrderScreen(props) {
  console.log(props.createOrderdata);

  const {loading:creatingOrder,order,success,error }=props.createOrderdata
  const { cartItems, shippingAddress, paymentMethod } = props.cart;

  if (!shippingAddress.address) {
    props.history.push("/shipping");
  } else if (!paymentMethod) {
   props.history.push("/payment");
  }

  const itemsPrice = cartItems.reduce((a, c) => a +parseInt(c.price)*parseInt(c.qty), 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = () => {
    // create an order
   props.createOrder({
      orderItems: cartItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    });
    props.history.push("/order/" + order._id);
    
  }

  useEffect(() => {
    //alert(success)
    if (success) {
    //  alert(success)
     // props.history.push("/order/" + order._id);
    }
  }, [success]);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Shipping
          </h3>
          <div>
            {shippingAddress.address}, {shippingAddress.city},
          {shippingAddress.postalCode}, {shippingAddress.country},
          </div>
        </div>
        <div>
          <h3>Payment</h3>
          <div>
            Payment Method: {paymentMethod}
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
              cartItems.length === 0 ?
                <div>
                  Cart is empty
          </div>
                :
                cartItems.map(item =>
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
      <div class="placeorder-action">
        <ul>
          <li>
            <button className="button primary full-width" onClick={placeOrderHandler} >Place Order</button>
          </li>
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>${itemsPrice}</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>${shippingPrice}</div>
          </li>
          <li>
            <div>Tax</div>
            <div>${taxPrice}</div>
          </li>
          <li>
            <div>Order Total</div>
            <div>${totalPrice}</div>
          </li>
        </ul>



      </div>

    </div>
  </div>

}

const mapStateToProps=({createOrder,cart})=>{
    return {
        cart:cart,
        createOrderdata:createOrder
    }
}
export default connect(mapStateToProps,{createOrder})(PlaceOrderScreen); 