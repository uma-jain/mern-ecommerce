import React, { useState } from 'react';
import { connect } from 'react-redux';
import { savePaymentMethod } from '../../redux/actionCreator/CartActions';
import CheckoutSteps from '../../components/CheckoutSteps';
 function PaymentMethodScreen(props) {


  const  {shippingAddress}  = props;
  if (!shippingAddress) {
    props.history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    props.savePaymentMethod(paymentMethod)
    props.history.push('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
const mapStateToProps=({user,cart})=>{
  return {
      loading:user.loading,
      userInfo:user.userInfo,
      error:user.userError_signin,
      shippingAddress:cart.shippingAddress
  }
}

export default connect(mapStateToProps,{savePaymentMethod})(PaymentMethodScreen)