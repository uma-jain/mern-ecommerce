import React, { useState,useEffect } from 'react';
import { saveShippingAddress } from "../../redux/actionCreator/CartActions";
import CheckoutSteps from '../../components/CheckoutSteps';
import  "./ShippingScreen.css";
import { connect} from 'react-redux';

function ShippingAddressScreen(props) {
  
    const {loading,userInfo,error,shippingAddress}=props

    useEffect(() => {
        if (!userInfo && !loading) {        
         props.history.push("/signin/success?redirect=/shipping");
        }    
      }, [userInfo]);

      const [fullName, setFullName] = useState(shippingAddress.fullName);
      const [address, setAddress] = useState(shippingAddress.address);
      const [city, setCity] = useState(shippingAddress.city);
      const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
      const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
     props.saveShippingAddress({ fullName, address, city, postalCode, country })    
    props.history.push('/payment');
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form  onSubmit={submitHandler}>
      <div className="form">
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
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
export default connect(mapStateToProps,{saveShippingAddress})(ShippingAddressScreen); 