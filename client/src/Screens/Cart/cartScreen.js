import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../../redux/actionCreator/CartActions';
import {connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "./Cartscreen.css"

function CartScreen(props) {
  const {cartItems}=props

  const productId = props.match.params.id;
  const qty= props.match.params.qty;
  
  const removeFromCartHandler = (productId) => {
   props.removeFromCart(productId);
  }
  useEffect(() => {
    if (productId) {
     props.addToCart(productId, qty);
    }
  }, []);

  const checkoutHandler = () => {    
    props.history.push("/signin?redirect=shipping");
  }

  return <div className="cart">
    <div className="cart-list">
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
                    Qty:
                  <select value={item.qty} onChange={(e) => props.addToCart(item.product, e.target.value)}>
                      {[...Array(item.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>
                    <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)} >
                      Delete
                    </button>
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
    <div className="cart-action">
      <h3>
        Subtotal ( {cartItems.reduce((a, c) => a + parseInt(c.qty), 0)} items )
        :
         $ {cartItems.reduce((a, c) => a + parseInt(c.price * c.qty), 0)}
      </h3>
      <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>

    </div>

  </div>
}

const mapStateToPorps=({cart})=>{
  return{
   cartItems:cart.cartItems
  }
}

export default connect(mapStateToPorps,{addToCart,removeFromCart})(CartScreen); 