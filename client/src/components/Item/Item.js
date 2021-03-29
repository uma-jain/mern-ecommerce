import React from 'react';
import Rating from '../Ratings/Rating';
import "./Item.css"
import { withRouter } from 'react-router-dom';


import { Link } from 'react-router-dom';
import { PRODUCT_DETAILS_FAIL } from '../../redux/actiontypes';

 function Product(props) {
  
  const { product } = props;
  return (
    <div key={product._id} class="card">
      <Link to={`/product/${product._id}`} >
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div class="card-body">
        <Link to={`/product/${product._id}`} color="inherit" variant="body1">
          <h2>{product.name}</h2>
        </Link>
        <div style={{lineHeight:"0px"}}>
        <h6>{product.category}</h6>
        <h5>{product.brand}</h5>
        <h6>{product.description}</h6>
        <h4>{product.countInStocky}</h4>       
        <div className="price">${product.price}</div>
        </div>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
      </div>
    </div>
  );
}

export default Product;